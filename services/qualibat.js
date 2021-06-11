const puppeteer = require('puppeteer');
/**
 *  | #lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.selectdiv.green > span > span.selection > span ==> bar to click on to see jobs
 *  | #lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.list_detail_metier > div.groupe_detail_metier -->
 *  | #select2-wqq_metiers_select-results (ul) --> main container with all jobs (li)
 */
exports.search = async({field, key})=>{

     //to save every urls on each page
     let allProfilesRequestedURls = [];
     let contacts = []
    try{
        const browser = await puppeteer.launch({headless : true});
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800});
        await page.goto("https://www.qualibat.com/particulier/",{waitUntil : 'networkidle0'});
        await page.waitForSelector("#tarteaucitronAlertBig");
        await page.waitForSelector("#tarteaucitronAllDenied2");
        await page.click("#tarteaucitronAllDenied2");
        
        await page.evaluate(() => document.querySelector("#tarteaucitronAllDenied2").click());
        //JOBS navigation 
        await page.waitForSelector("#lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.selectdiv.green > span > span.selection > span");
        //make jobs options appear
        await page.click("#lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.selectdiv.green > span > span.selection > span");
        // await page.waitForFunction(`document.querySelector${JOBS_MAIN_WRAPPER} && document.querySelector${JOBS_MAIN_WRAPPER}.display !=='none'`);
        await page.waitForSelector('body > span > span > span.select2-search.select2-search--dropdown > input', {visible : true});
        //field text to get autoComplete
        await page.type('body > span > span > span.select2-search.select2-search--dropdown > input', field);

        //sleep for 3s before selecting job
        await page.waitForTimeout(300);
        await page.keyboard.down('Enter');
        /**
         * we need  formatting field entry in ordrer to create dynamic class to wait for the right subCategories jobs
         */
        let fields = field.split('/').join('');
        const strJob = fields.toLowerCase().replace(/[êéè]/gi, 'e').replace(/àâ/gi, 'a').replace(/\s/g, '-').replace(/ç/g, 'c').replace(/'/g,'').replace(/[A_Z]g/, );
        
        await page.waitForSelector(`#lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.list_detail_metier > div.groupe_detail_metier.${strJob} > div > div.icheckbox_line.icheck-item`, {visible: true});
        // selecting all subcateogoty jobs
        await page.evaluate(strJob =>{
            //all sub categories
            const items = Array.from(document.querySelectorAll(`#lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.list_detail_metier > div.groupe_detail_metier.${strJob} > div > div.icheckbox_line.icheck-item`));

            for(let item of items){
                item.click()
            }
       }, strJob)
       //typing requested location into location field
       await page.type('#lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.column > div.dep > span > span.selection > span > ul > li > input', key)
       //validate requested location
       await page.keyboard.down('Enter');
       //request button
       await page.click('#lim-back-research > div.blockcontainer.z5.clearfix > div > div:nth-child(1) > form > div.insideblock.deploy-block > div.btn-more-container > input');
       await page.waitForTimeout(1000);
       //then redirecting to matching profiles page happen
       await Promise.all([
            //for urls...
            await page.waitForSelector('#result-entreprise > tbody > tr:nth-child(1) > td:nth-child(2) > a'),
            //for next button
            await page.waitForSelector('#result-entreprise_next'),
            //for pages number
            await page.waitForSelector('#result-entreprise_paginate > span.paginate_of')
       ])
       /**
        * then we  loop through all pages 
        * starting counting at 1
        */
        const stringPagesNumber = await page.evaluate(()=>{

           const page =  document.querySelector('#result-entreprise_paginate > span.paginate_of');
           if(page.parentElement.style.display !== 'none'){
               return page.textContent;
           }
           return '1';
        });
        const pages = parseInt(stringPagesNumber.replace(/\s*sur\s*/, ''));

        let currentPage = 1;
       
        while(currentPage <= pages){
            //each page we need to wait urls selector and next button are fully loaded
            await Promise.all([
                page.waitForSelector('#result-entreprise > tbody > tr:nth-child(1) > td:nth-child(2) > a', {visible : true})
            ])
            const currentPageUrls = await page.evaluate(()=>{
                //to catch every single url in current page
                const result = [];
                const urls = Array.from(document.querySelectorAll('#result-entreprise > tbody > tr > td:nth-child(2) > a'));
                
                //we loop through all urls in current page to get all of them
                for(let url of urls){
                    result.push(url.href)
                }
                return result;
            })
            
            allProfilesRequestedURls = allProfilesRequestedURls.concat(currentPageUrls);

            await page.evaluate(()=>{
                //we only can click on next page if it's visible on the dom
                //it's parent can have display to none
                const nextPageBtn = document.querySelector('#result-entreprise_next');
                if(nextPageBtn.parentElement.style.display !== 'none'){
                    nextPageBtn.click();
                }
            })

            currentPage++ ;
        }
        //parsing urls to get profile information
        for(let url of allProfilesRequestedURls ){
            await page.goto(url);
            await Promise.all([
                //name
                await page.waitForSelector('#lim-back-research > div.blockcontainer.clearfix.particulier-formblock > div > div.formblock.right-particulier-formblock.deploy-container.deployed.right-part-entreprise > div.insideblock.deploy-block > div > div.account-single > div.left-col > div:nth-child(1) > p'),
                //phone
                await page.waitForSelector('#lim-back-research > div.blockcontainer.clearfix.particulier-formblock > div > div.formblock.right-particulier-formblock.deploy-container.deployed.right-part-entreprise > div.insideblock.deploy-block > div > div.account-single > div.left-col > div:nth-child(6) > p:nth-child(3)'),
                //email
                await page.waitForSelector('#lim-back-research > div.blockcontainer.clearfix.particulier-formblock > div > div.formblock.right-particulier-formblock.deploy-container.deployed.right-part-entreprise > div.insideblock.deploy-block > div > div.account-single > div.left-col > div:nth-child(6) > p:nth-child(4)')
            ])
            const contact = await page.evaluate(()=>{
                const result = [];
                const name = document.querySelector('#lim-back-research > div.blockcontainer.clearfix.particulier-formblock > div > div.formblock.right-particulier-formblock.deploy-container.deployed.right-part-entreprise > div.insideblock.deploy-block > div > div.account-single > div.left-col > div:nth-child(1) > p');
                const phone = document.querySelector('#lim-back-research > div.blockcontainer.clearfix.particulier-formblock > div > div.formblock.right-particulier-formblock.deploy-container.deployed.right-part-entreprise > div.insideblock.deploy-block > div > div.account-single > div.left-col > div:nth-child(6) > p:nth-child(3)');
                const email = document.querySelector('#lim-back-research > div.blockcontainer.clearfix.particulier-formblock > div > div.formblock.right-particulier-formblock.deploy-container.deployed.right-part-entreprise > div.insideblock.deploy-block > div > div.account-single > div.left-col > div:nth-child(6) > p:nth-child(4)');
                result.push({
                    name : name.textContent,
                    phone : phone.textContent.split(':')[1].trim(),
                    email: email.textContent.split(':')[1].trim()
                })
                return result;
            })
            console.log(contacts)
            contacts = contacts.concat(contact);
        }
        return contacts;
    }
    catch(err){
        return contacts;
    }
   
}

