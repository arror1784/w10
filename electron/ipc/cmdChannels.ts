import { type } from "os";

//(target:command),(parameter:type),(parameter:type),...,(RT:return type) 
//if return type is void, it can be empty

// 웹 과의 호환성을 위하여 twoway 채널은 사용을 지양

//*RM - Renderer to Main
//*MR - Main to Renderer
//*TW - Renderer to Main Two Way

enum FileSystemCH{
    readDirTW = "FileSystem:readDir,RT:DirOrFile[]",
    isCustomTW = "Filesystem:getLayerHeightTW,filePath:string",
    getUSBPathTW = "FileSystemCH:getUSBPathTW",

}
enum ProductCH{
    getProductInfoTW = "product:getProductInfo,RT:string[]",
}

enum WorkerCH{
    startRM = "worker:start,path:string",
    commandRM = "worker:command,cmd:string",
    
    requestPrintInfoRM = "worker:requestPrintInfo,RT:[state,resinname,filename,layerheight,elapsedtime,totaltime,progress]",
    onWorkingStateChangedMR = "worker:onWorkingStateChanged,state:string,message:string",
    onPrintInfoMR = "worker:onPrintInfo,state:string,material:string,filename:string,layerheight:number,elapsedTime:number,totalTime:number,progress:number,enabelTimer:number",
    onStartErrorMR = "worker:onStartError,error:string",
    onProgressMR = "worker:onProgress,progress:number",
    onSetTotalTimeMR = "worker:onSetTotalTimeMR",
}
enum FactoryResetCH{
    FactoryReset = "FactoryReset"
}
export { FileSystemCH,WorkerCH,ProductCH,FactoryResetCH}