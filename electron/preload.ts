import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { DirOrFile } from './ipc/filesystem'
import { FileSystemCH, ProductCH, WorkerCH } from './ipc/cmdChannels';

let _id = 0

interface EventListener{
    channel:string;
    id:string;
}
interface EventListenerArr{
    [key:string] : (...args : any[]) => void
}
let eventListnerArr : EventListenerArr = {}

function eventADD(channel : string,listner:(...args : any[]) => void) : EventListener{

    _id++
    eventListnerArr[_id.toString()] = listner
    ipcRenderer.on(channel,eventListnerArr[_id.toString()])

    // console.log("IPC EVENT ADD",channel,ipcRenderer.listenerCount(channel),Object.keys(eventListnerArr).length)

    return {channel:channel,id:_id.toString()}
}
function eventRemove(listener:EventListener){
    ipcRenderer.removeListener(listener.channel,eventListnerArr[listener.id])

    delete eventListnerArr[listener.id]

    // console.log("IPC EVENT REMOVE",listener.channel,"Listener Count : ",ipcRenderer.listenerCount(listener.channel),"Total Key Length : ",Object.keys(eventListnerArr).length)
}

interface electronApiInterface {
    readDirTW: (path : string) => Promise<DirOrFile[]>;
    getLayerHeightTW: (filePath:string) => Promise<number>;
    getOffsetSettingsTW: () => Promise<number[]>;
    isCustomTW: (filePath:string) => Promise<boolean>;
    getProductInfoTW: () => Promise<string[]>; // 0:version,1:serial,2:wifi,3:ip,
    getUartConnectionErrorTW: ()=>Promise<boolean>;
    getUSBPathTW:()=>Promise<string>;
    
    printStartRM: (path : string, material : string) => void;
    printCommandRM: (cmd :string) => void;
    requestPrintInfoRM: () => void;
    factoryRestRM:()=>void;
    
    onWorkingStateChangedMR: (callback:(event:IpcRendererEvent,state: string,message?:string) => void) => EventListener;
    onPrintInfoMR: (callback:(event:IpcRendererEvent,state: string, material: string, 
                                filename: string, layerheight: number, elapsedTime: number, 
                                totalTime: number,progress : number,enabelTimer: number) => void) => EventListener;
    onStartErrorMR: (callback:(event:IpcRendererEvent,error: string) => void) => EventListener;
    onProgressMR: (callback:(event:IpcRendererEvent,progress: number) => void) => EventListener;
    onSetTotalTimeMR: (callback:(event:IpcRendererEvent,value:number)=>void) => EventListener;
    
    removeListener : (listener:EventListener) => void;
    removeAllListner : (channel:string) => void;

}
const exposedApi: electronApiInterface = {
    readDirTW: (path: string) => ipcRenderer.invoke(FileSystemCH.readDirTW,path),
    getLayerHeightTW: (filePath:string) => ipcRenderer.invoke(FileSystemCH.getLayerHeightTW,filePath),
    getOffsetSettingsTW: () => ipcRenderer.invoke(ProductCH.getOffsetSettingsTW),
    isCustomTW: (filePath:string) => ipcRenderer.invoke(FileSystemCH.isCustomTW,filePath),
    getProductInfoTW: () => ipcRenderer.invoke(ProductCH.getProductInfoTW),
    getUartConnectionErrorTW: ()=>ipcRenderer.invoke(ProductCH.getUartConnectionErrorTW),
    getUSBPathTW:()=>ipcRenderer.invoke(FileSystemCH.getUSBPathTW),

    printStartRM: (path : string, material : string) => ipcRenderer.send(WorkerCH.startRM,path,material),
    printCommandRM: (cmd :string) => ipcRenderer.send(WorkerCH.commandRM,cmd),
    requestPrintInfoRM: () => ipcRenderer.send(WorkerCH.requestPrintInfoRM),
    factoryRestRM:()=>ipcRenderer.send("factoryReset"),

    onWorkingStateChangedMR: (callback:(event: IpcRendererEvent,state: string,message?:string) => void) => {return eventADD(WorkerCH.onWorkingStateChangedMR,callback)},
    onPrintInfoMR: (callback:(event:IpcRendererEvent,state: string, material: string, 
                                filename: string, layerheight: number, elapsedTime: number, 
                                totalTime: number,progress : number,enabelTimer: number) => void) => {return eventADD(WorkerCH.onPrintInfoMR,callback)},
    onStartErrorMR: (callback:(event:IpcRendererEvent,error: string) => void) => {return eventADD(WorkerCH.onStartErrorMR,callback)},
    onProgressMR: (callback:(event:IpcRendererEvent,progress: number) => void) => {return eventADD(WorkerCH.onProgressMR,callback)},
    onSetTotalTimeMR: (callback:(event:IpcRendererEvent,value:number)=>void) =>{return eventADD(WorkerCH.onSetTotalTimeMR,callback)},

    removeListener : (listener:EventListener) => eventRemove(listener),
    removeAllListner : (channel:string) => ipcRenderer.removeAllListeners(channel),
}

contextBridge.exposeInMainWorld('electronAPI', exposedApi)

export type {electronApiInterface}