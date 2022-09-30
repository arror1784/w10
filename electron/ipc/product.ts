import address from "address";
import { exec } from "child_process";
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { networkInterfaces } from "os";
import { getModelNoInstaceSetting } from "../json/modelNo";
import { getVersionSetting } from "../json/version";
import { ProductCH } from "./cmdChannels";

export function productIpcInit(mainWindow:BrowserWindow){

    ipcMain.handle(ProductCH.getProductInfoTW,()=>{

        const nets = networkInterfaces();
        const results : string[] = [] // Or just '{}', an empty object
        
        return [getVersionSetting().data.version,getModelNoInstaceSetting().data.modelNo]
    })
}