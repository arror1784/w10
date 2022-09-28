import { LEDEnable,MoveLength,MovePosition,Wait,actionType, Action, AutoHome, SetImage, CheckTime, LEDToggle, ProcessImage } from './actions'
import { getPrinterSetting } from './json/printerSetting'
import { ResinSetting, ResinSettingValue } from './json/resin';
import { InfoSetting, InfoSettingValue } from './json/infoSetting';
import { Stopwatch } from 'ts-stopwatch';

import * as fs from 'fs'
import { getProductSetting } from './json/productSetting';


const sliceFileRoot : string = process.platform === "win32" ? process.cwd() + "/temp/print/printFilePath/" : "/opt/capsuleFW/print/printFilePath/"

enum WorkingState{
    working = "working",
    stop = "stop",
    stopWork = "stopWork",
    pause = "pause",
    pauseWork = "pauseWork",
    error = "error",
    lock = "lock"
}

enum MoveMotorCommand{
    GoHome="GoHome",
    AutoHome="AutoHome",
    MoveMicro="MoveMicro",
    MoveMaxHeight="MoveMaxHeight",
}
class PrintWorker{

    private _actions: Array<Action> = new Array<Action>(10000);

    private _name: string = ""
    private _currentStep: number = 0
    private _workingState: WorkingState = WorkingState.stop
    private _progress : number = 0
    private _printingErrorMessage : string = ""
    private _stopwatch : Stopwatch = new Stopwatch()
    private _curingStopwatch : Stopwatch = new Stopwatch()
    private _totalTime: number = 0

    private _onProgressCallback?: (progress : number) => void
    private _onWorkingStateChangedCallback?: (state : WorkingState,message?:string) => void
    private _onSetTotaltime?: (value : number) => void
    
    print(material:string,path:string,name:string){

        this.run()
    }
    
    private run(){
        this.process()

        return true
    }
    createActions(resinSetting : ResinSettingValue,infoSetting : InfoSettingValue) {

        this._actions = []

            this._actions.push(new Wait(1000))
    }
    pause(){
        this._workingState = WorkingState.pauseWork
        this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
    }
    resume(){
        this._workingState = WorkingState.working
        this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
        this.process()
    }
    async stop(){
        const prevState = this._workingState
        this._workingState = WorkingState.stopWork
        this._stopwatch.stop()

        if(prevState != WorkingState.working && prevState != WorkingState.pauseWork){
            this.process()
        }

        this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
    }
    printAgain(resin?:ResinSetting){
        this.run()
    }
    async process(){
        this._stopwatch.start()
        while(this._currentStep <= this._actions.length) {

            if(this._currentStep == this._actions.length)
                this.stop()

            switch (this._workingState) {
                case WorkingState.pauseWork:
                    this._workingState = WorkingState.pause
                    this._stopwatch.stop()
                    this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
                    return;
                case WorkingState.stopWork:
                    this._workingState = WorkingState.lock
                    this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
                    return;
                case WorkingState.error:
                    this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(WorkingState.error,this._printingErrorMessage)
                    this.stop()
                    return;
                default:
                    break;
            }
            this._progress = this._currentStep / this._actions.length
            this._onProgressCallback && this._onProgressCallback(this._progress)

            const action = this._actions[this._currentStep]
            console.log("PROCESS WHILE",this._currentStep,action.type)
            switch (action.type) {
                case "autoHome":

                    break;
                case "ledEnable":
                    break;
                case "ledToggle":
                    break;
                case "moveLength":
                    break;
                case "movePosition":
                    break;
                case "wait":
                    break;
                case "processImage":
                    break;
                case "setImage":
                    break;
                case "checkTime":
                    switch ((action as CheckTime).checkTimeType) {
                    }
                    break;
                default:
                    break;
            }
            this._currentStep++
        }
    }
    unlock(){
        this._workingState = WorkingState.stop
    }
    onProgressCB(cb : (progreess: number) => void){
        this._onProgressCallback = cb
    }
    onStateChangeCB(cb : (state : WorkingState,message?:string) => void){
        this._onWorkingStateChangedCallback = cb
    }
    onSetTotalTimeCB(cb : (value : number) => void){
        this._onSetTotaltime = cb
        
    }
}

function checktime(){
    let a = new Date(Date.now())
    console.log(a.getSeconds(),a.getMilliseconds())
}


export {PrintWorker,WorkingState,MoveMotorCommand}
