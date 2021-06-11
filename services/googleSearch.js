const puppeteer = require('puppeteer');

exports.search = (url,pages)=>{

  return new Promise(async(resolve, reject)=>{
    try{
      const browser = await puppeteer.launch({headless : false});
      const page = await browser.newPage();
      await page.goto(url); 
      //we start at page 1
      let currentPage = 1; 
      //array to concat each page result
      let scrapped = [];
      while(currentPage <= pages){
        const newScrapp = await page.evaluate(async ()=>{
          let result = [];
          window.addEventListener('click',(e)=>{
            e.preventDefault();
            window.getSelection().focusNode.innerText= "coucou c'est moi";
          })
          //block providing names (h3 on google search page)
          let HtmlElementsNames = Array.from(document.querySelectorAll('#rso div > div > div.yuRUbf h3'));
          //main info block on google search page providing number and email adress
          let HtmlBlockContacts = Array.from(document.querySelectorAll('#rso div > div > div.IsZvec > span > span'));
          const redirect = document.querySelector('#pnnext').href;
          
          for(let i = 0; i< HtmlElementsNames.length; i++){
            result.push({
              name  : HtmlElementsNames[i].innerText.split('-')[0],
              phone : HtmlBlockContacts[i] ? HtmlBlockContacts[i].innerText.match(/\(?(\+33)\)?\s?\(?0?\)?\s?\d?\s?(\d{2,3}\s?){3,4}/): '',
              email : HtmlBlockContacts[i] ? HtmlBlockContacts[i].innerText.match(/([a-z0-9]+\.?)+@\w+\.(\w)+/) : '',
              page  : `${redirect}`
            })
          }
          return result;
        })
        scrapped = scrapped.concat(newScrapp);
        //send download level
        if (currentPage < pages) {
          //we need to wait selectors we using are fully loaded
          await Promise.all([
            //once we done scrapping a page we go to the next page
              await page.goto(`${scrapped[scrapped.length - 1].page}`),
            //wait for block h3 header is ready 
              await page.waitForSelector('#rso div > div > div.yuRUbf > a > h3'),
            //wait for text block is ready in order to fetch for number and email again  
              await page.waitForSelector('#rso div > div > div.IsZvec > span > span'),
          ])
          currentPage++ ;
        }  
        else{
          // await browser.close();
          //delete the page attribute used to redirect, fomat the phone number && email
          scrapped = scrapped.map(el => {
            delete el.page;
            el.phone = el.phone !== null ? el.phone[0].trim() : '';
            el.email = el.email !== null ? el.email[0].trim() : '';
            return el
          })
          scrapped = scrapped.filter(el => el.phone || el.email);
          return resolve(scrapped); 
        }
      }
    }
    catch(error){
      return reject(error)
    } 
  })
}