
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"
import { arch } from "process"
import { getCourseLoaderInstance } from "./courseLoader"
import { ProductCH, WorkerCH } from './ipc/cmdChannels'
import { productIpcInit } from "./ipc/product"

import { PrintWorker, printWorkerInterface, WorkingState } from "./printWorker"

import fs from 'fs'

let worker : printWorkerInterface | PrintWorker
if(arch == "arm")
    worker = new PrintWorker()
else
    worker = new printWorkerInterface()

async function mainProsessing(mainWindow:BrowserWindow){

    let data = fs.readFileSync("/home/jsh/workspace/w10/temp/USB/STORAGE/example3.hc")
    let action = getCourseLoaderInstance().createActions(data.toString())
    // console.log(action)
    // console.log(getCourseLoaderInstance().getDuration())
    
    ipcMain.on(WorkerCH.startRM,(event:IpcMainEvent,path:string)=>{
        try {
            let nameArr = path.split('/')
            let name = nameArr[nameArr.length - 1]
            worker.run(path,name)

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
        mainWindow.webContents.send(WorkerCH.onPrintInfoMR,...worker.getPrintInfo())
    })
    productIpcInit(mainWindow)
}
export {mainProsessing}