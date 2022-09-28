
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"
import { MoveMotorCommand, PrintWorker, WorkingState } from "./printWorker"
import { ImageCH, ProductCH, UpdateCH, WorkerCH } from './ipc/cmdChannels'

import fs from "fs"
import { ResinSetting } from "./json/resin"
import { getProductSetting } from "./json/productSetting"
import { wifiInit } from "./ipc/wifiControl"

import { getPrinterSetting } from "./json/printerSetting"

import { WebSocketMessage } from "./json/webSockectMessage"
import { productIpcInit } from "./ipc/product"
const sliceFileRoot : string = process.platform === "win32" ? process.cwd() + "/temp/print/printFilePath/" : "/opt/capsuleFW/print/printFilePath/"

let worker = new PrintWorker()

async function mainProsessing(mainWindow:BrowserWindow){
    ipcMain.on(WorkerCH.startRM,(event:IpcMainEvent,path:string,material:string)=>{
        try {
            let nameArr = path.split('/')
            let name = nameArr[nameArr.length - 1]
            worker.print(material,path,name)

        } catch (error) {
            mainWindow.webContents.send(WorkerCH.onStartErrorMR,(error as Error).message)
            console.log((error as Error).message)
        }
    })
    worker.onProgressCB((progress:number)=>{
        mainWindow.webContents.send(WorkerCH.onProgressMR,progress)
    })
    worker.onStateChangeCB((state:WorkingState,message?:string)=>{
        mainWindow.webContents.send(WorkerCH.onWorkingStateChangedMR,state,message)
    })
    worker.onSetTotalTimeCB((value:number)=>{
        mainWindow.webContents.send(WorkerCH.onSetTotalTimeMR,value)
    })
    ipcMain.on(WorkerCH.commandRM,(event:IpcMainEvent,cmd:string)=>{
        switch (cmd) {
            case "pause":
                worker.pause()
                break;
            case "quit":
                worker.stop()
                break;
            case "resume":
                worker.resume()
                break;
            case "printAgain":
                worker.printAgain()
                break;
            default:
                break;
        }
    })
    productIpcInit(mainWindow)
    wifiInit(mainWindow)
    // updateIpcInit(mainWindow)
}
export {mainProsessing}