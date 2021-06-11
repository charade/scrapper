const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const isDev = require('electron-is-dev');
const google = require('../services/googleSearch');
const iad = require('../services/iadSearch')
const qualibat  = require('../services/qualibat')
function createWindow () {
  const win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration : false,
      worldSafeExecuteJavaScript : true,
      contextIsolation : true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setBackgroundColor('#2C2E3A');
  win.loadURL(
    isDev ? 'http://localhost:3000': path.join('file://', __dirname,'../build/index.html')
  )
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//if user fetch a url
ipcMain.on('search', async(e, args)=>{
  //when search resquested we notify Result component in order to erase last posts
  e.sender.send('search-requested')
  try{
    let contacts = [];
    switch(args[0]){
      case 'google' : 
        contacts = await google.search(args[1], 1);
        break;
      case 'iad' : 
        contacts = await iad.search(args[1]);
        break;
      case 'qualibat' : 
        contacts =  await qualibat.search(args[1]);
        break;
      default : return 0
    }
    e.sender.send('search-response',contacts)
  }
  catch(err){
    e.sender.send('loading-error',err);
  }
})
//window to post results
// ipcMain.on('create-window',(e,args)=>{
//   const win = new BrowserWindow({
//     width  : args[0],
//     height : args[1],
//     webPreferences : {
//       nodeIntegration : false,
//       worldSafeExecuteJavaScript : true,
//       contextIsolation : true
//     }
//   })
//   win.loadFile(path.join(__dirname, 'index.html'))
//   win.show();
// })

// ipcMain.on('select-class', (e,args)=>{
//   console.log('arg '+ args)
// })
