const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('electron',{
    notificationApi : {
        send(message, data){
            ipcRenderer.send(message, data)
        },
        on(message, callback){
            ipcRenderer.on(message, callback);
        },
        removeListener(message,callback){
            ipcRenderer.removeListener(message, callback)
        }
    },
})
