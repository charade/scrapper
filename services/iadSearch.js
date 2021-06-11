const { SettingsApplicationsOutlined } = require('@material-ui/icons');
const puppeteer = require('puppeteer');
/**
 * 1--redirecting to search page
 * 2--#map-section > div.panel > div.panel__head > div:nth-child(2) > input //to type in search by city field
 * 3--#counsellor-list > div > div > div.counsellor.clearfix div.avatar-wrapper.small-img-box > a // all profiles url
 */
exports.search = async(field)=>{
    let contacts = [];
    try{
        const browser =  await puppeteer.launch({headless: true, slowMo :10});
        const page =  await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto('https://www.iadfrance.fr/');
        //we need to wait the redirect button to search page is available
        await page.waitForSelector('#menu > ul > li:nth-child(4) > a');
        await page.click('#menu > ul > li:nth-child(4) > a');
        //once on search page we wait for the map and the text field to type in are available
        await Promise.all([
            await page.waitForSelector('#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > div'),
            await page.waitForSelector('#map-section > div.panel > div.panel__head > div:nth-child(2) > input'),
        ])
        await page.type('#map-section > div.panel > div.panel__head > div:nth-child(2) > input', field);
        await page.waitForTimeout(3000);
        //we use type to make appear auto complete block or we cannot have the city we want
        
        //before clicking on autoCompletion li proposal we need to wait it's container is displayed
        await page.waitForFunction("document.querySelector('#ui-id-1') && document.querySelector('#ui-id-1').style.display !== 'none'")
       
        const cityIndexFound = await page.evaluate(async ({field})=>{
            let citiesAutoComplete_ul_Block = document.querySelector('#ui-id-1');
            /**
             * we need to save each child block of auto complete block in order to request for the right city by clicking
             * then fetch the rights datas in #counsellor-list > div > div > div.counsellor.clearfix div.avatar-wrapper.small-img-box > a
             */
            let city = null;
            let autoComplete_li_Blocks = Array.from(citiesAutoComplete_ul_Block.children);
            /*
             * we check if there is a li aria-label matching "tous les codes postaux"
             * if true we take this one first to get all city requested datas
             * else if there is no match we check if there is a name close city if not there is no result at all
             */
           console.log(autoComplete_li_Blocks);
            
            for(let el of autoComplete_li_Blocks){
                if((/tous les codes postaux/).test(el.ariaLabel)){
                    city = el;
                    break;
                }
                else{
                    if(autoComplete_li_Blocks.length > 1){
                        city = autoComplete_li_Blocks[1];
                    }
                    else{
                        city = null;
                    }
                }
            }

            if(city){
                //loading right datas by clicking
                return autoComplete_li_Blocks.indexOf(city);
            }
            return false;

        },{field})

        if(cityIndexFound){
            //then we wait for the block we want with aria-label === tous les codes postaux
            await page.waitForSelector("#ui-id-"+cityIndexFound);
            //wait need to wait profiles block are loaded with requested content before clicking
            // await page.waitForTimeout(5000);
             
            await page.evaluate((cityIndexFound )=>{

                window.addEventListener('click',(e)=>{
                    console.log('clicked ', e.target)
                })
                /**
                 * we need to click twice
                 * first on li block parent element --> containing matching town
                 * then on it's child element to make it work
                 */
                //click on element with textContent "tous les codes postaux"
                document.querySelector(`#ui-id-1 > li:nth-child(${cityIndexFound + 1}) > div.ui-menu-item-wrapper`).click();
                document.querySelector(`#ui-id-1 > li:nth-child(${cityIndexFound + 1})`).click();
            
            },cityIndexFound )

            //on click open matching profiles panel
            await page.click(`#map-section > div.panel > a`)
            
            await Promise.all([
                //we add 5s to all urls loading time to make sure we have right urls later
                // await page.waitForTimeout(5000),
                //once match are found we wait for map reload to have profiles reloaded before taking profiles urls
                await page.waitForSelector('#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > div')
            ])
            // return
        }
        else{
            browser.close();
        }
        // return
        /**
         * after requesting we wait all availbale profiles urls are fully loaded
         * await page.waitForSelector(rightCityReadyToLoad);
         * await page.click(rightCityReadyToLoad);
         * after clicking the Dom reload (profile inforation card) ====> #counsellor-list > div > div > div.counsellor.clearfix.HélèneMONTENACH
         * then we need to wait this event before getting urls
         * and we wait till urls are full loaded
         */
        // await page.waitForNavigation();
        await Promise.all([
            await page.waitForSelector('#counsellor-list > div > div > div.counsellor.clearfix'),
            await page.waitForSelector('#counsellor-list > div > div > div.counsellor.clearfix div.avatar-wrapper.small-img-box > a')
        ])

        let profilesUrls = await page.evaluate(async()=>{
            let urlsSaver = Array.from(document.querySelectorAll('#counsellor-list > div > div > div.counsellor.clearfix div.avatar-wrapper.small-img-box > a'));
            return urlsSaver.map(el => el.href)
        })
        /**
         * loop through over urls array to get all profiles information :
         * name : body > div.modal-header.clearfix > div > div.col-8 > div > h4
         * email : body > div.modal-header.clearfix > div > div.col-8 > div > div > div:nth-child(2) > p:nth-child(1)
         * phone : body > div.modal-header.clearfix > div > div.col-8 > div > div > div:nth-child(2) > p:nth-child(2)
         * then we need to split emai && phone by ":" and get the second index
         * on each page we need to wait (name, email, phone) Elements are fully loaded
         */
        
        for(let url of profilesUrls){
            page.goto(url);
            await Promise.all([
                await page.waitForSelector('body > div.modal-header.clearfix > div > div.col-8 > div > h4'),
                await page.waitForSelector('body > div.modal-header.clearfix > div > div.col-8 > div > div > div:nth-child(2) > p:nth-child(1)'),
                await page.waitForSelector('body > div.modal-header.clearfix > div > div.col-8 > div > div > div:nth-child(2) > p:nth-child(2)')
            ]);

            const contact = await page.evaluate(()=>{
                const name = document.querySelector('body  > div.modal-header.clearfix > div > div.col-8 > div > h4').textContent;
                const email = document.querySelector('body > div.modal-header.clearfix > div > div.col-8 > div > div > div:nth-child(2) > p:nth-child(1)').textContent;
                const phone = document.querySelector('body > div.modal-header.clearfix > div > div.col-8 > div > div > div:nth-child(2) > p:nth-child(2)').textContent;
                return {
                    name : name,
                    email : email.split(':')[1].trim(),
                    phone : phone.split(':')[1].trim()
                }
            })
            contacts.push(contact);
        }
        contacts = contacts.filter(el => (/^(06|07)/).test(el.phone))
        // browser.close();
        return contacts;
    }
    catch(err){
        return contacts
    }
}
