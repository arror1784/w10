
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"
import { ProductCH, WorkerCH } from './ipc/cmdChannels'
import { productIpcInit } from "./ipc/product"

import { PrintWorker, printWorkerInterface, WorkingState } from "./printWorker"

let worker = new printWorkerInterface()
async function mainProsessing(mainWindow:BrowserWindow){
    ipcMain.on(WorkerCH.startRM,(event:IpcMainEvent,path:string,material:string)=>{
        try {
            let nameArr = path.split('/')
            let name = nameArr[nameArr.length - 1]
            worker.run()

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
    ipcMain.on(WorkerCH.requestPrintInfoRM,(event:IpcMainEvent)=>{
        mainWindow.webContents.send(WorkerCH.onPrintInfoMR)
    })
    productIpcInit(mainWindow)
}
export {mainProsessing}