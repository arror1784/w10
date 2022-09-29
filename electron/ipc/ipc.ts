import { ipcMain } from "electron"
import { FileSystemCH } from "./cmdChannels"

import { getUSBPath, readDir } from "./filesystem"

import { factoryReset } from './factoryReset'
function ipcHandle(){
    
    ipcMain.handle(FileSystemCH.readDirTW, readDir)
    ipcMain.handle(FileSystemCH.getUSBPathTW,getUSBPath)

    ipcMain.on("factoryReset",factoryReset)
}

export {ipcHandle}