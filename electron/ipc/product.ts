import address from "address";
import { exec } from "child_process";
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { networkInterfaces } from "os";
import { getModelNoInstaceSetting } from "../json/modelNo";
import { getVersionSetting } from "../json/version";
import { ProductCH } from "./cmdChannels";

export function productIpcInit(mainWindow:BrowserWindow){

    ipcMain.on(ProductCH.shutDownRM,(event:IpcMainEvent)=>{
        exec("echo rasp | sudo -S shutdown -h now",(error, stdout, stderr) => {
            console.log("shutdown -h now")})
    })
    // ipcMain.handle(ProductCH.getProductInfoTW,()=>{

    //     const nets = networkInterfaces();
    //     const results : string[] = [] // Or just '{}', an empty object
        
    //     for (const name of Object.keys(nets)) {
    //         if(name == 'lo')
    //             continue    
    //         results.push(address.ip(name));
    //     }
    //     return [getVersionSetting().data.version,getModelNoInstaceSetting().data.modelNo,"",...results]
    // })
}