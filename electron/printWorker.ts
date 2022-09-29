import { Wait,actionType, Action,GPIOAction,
    GPIOEnable,GPIOPin,PWMAction,PWMEnable,PWMLinearAccel,PWMSetDuty,PWMSetPeriod } from './actions'

import { Stopwatch } from 'ts-stopwatch'

import { Gpio } from 'pigpio'


enum WorkingState{
    working = "working",
    stop = "stop",
    stopWork = "stopWork",
    pause = "pause",
    pauseWork = "pauseWork",
    error = "error"
}

enum MoveMotorCommand{
    GoHome="GoHome",
    AutoHome="AutoHome",
    MoveMicro="MoveMicro",
    MoveMaxHeight="MoveMaxHeight",
}
class printWorkerInterface{

    protected _actions: Array<Action> = new Array<Action>(10000);

    protected _name: string = ""
    protected _currentStep: number = 0
    protected _workingState: WorkingState = WorkingState.stop
    protected _progress : number = 0
    protected _stopwatch : Stopwatch = new Stopwatch()
    protected _totalTime: number = 0

    protected _onProgressCallback?: (progress : number) => void
    protected _onWorkingStateChangedCallback?: (state : WorkingState,message?:string) => void
    protected _onSetTotaltime?: (value : number) => void
    

    constructor(){
    }
    
    run(){

        this.process()

        return true
    }
    createActions() {
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
    printAgain(){
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
                    this._workingState = WorkingState.stop
                    this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
                    return;
                case WorkingState.error:
                    this.stop()
                    return;
                default:
                    break;
            }
            this._progress = this._currentStep / this._actions.length
            this._onProgressCallback && this._onProgressCallback(this._progress)

            const action = this._actions[this._currentStep]
            switch (action.type) {
                case "GPIOEnable":
                    break;
                case "PWMEnable":
                    break;
                case "PWMSetDuty":
                    break;
                case "PWMSetPeriod":
                    break;
                case "PWMLinearAccel":
                    break;
                case "Wait":
                     await new Promise(resolve => setTimeout(resolve, (action as Wait).msec));
                    break;
                default:
                    break;
            }
            this._currentStep++
        }
    }
    onProgressCB(cb : (progreess: number) => void){
        this._onProgressCallback = cb
    }
    onStateChangeCB(cb : (state : WorkingState,message?:string) => void){
        this._onWorkingStateChangedCallback = cb
    }
}
class PrintWorker extends printWorkerInterface{

    protected _gpioMap = new Map<GPIOPin,Gpio>()

    constructor(){
        super()

        this._gpioMap.set(GPIOPin.gp1,new Gpio(GPIOPin.gp1,{mode:Gpio.OUTPUT}))
        this._gpioMap.set(GPIOPin.propeller1,new Gpio(GPIOPin.propeller1,{mode:Gpio.OUTPUT}))
        this._gpioMap.set(GPIOPin.propeller2,new Gpio(GPIOPin.propeller2,{mode:Gpio.OUTPUT}))
        this._gpioMap.set(GPIOPin.pump1,new Gpio(GPIOPin.pump1,{mode:Gpio.OUTPUT}))
        this._gpioMap.set(GPIOPin.pump2,new Gpio(GPIOPin.pump2,{mode:Gpio.OUTPUT}))
        this._gpioMap.set(GPIOPin.valve,new Gpio(GPIOPin.valve,{mode:Gpio.OUTPUT}))
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
                    this._workingState = WorkingState.stop
                    this._onWorkingStateChangedCallback && this._onWorkingStateChangedCallback(this._workingState)
                    return;
                case WorkingState.error:
                    this.stop()
                    return;
                default:
                    break;
            }
            this._progress = this._currentStep / this._actions.length
            this._onProgressCallback && this._onProgressCallback(this._progress)

            const action = this._actions[this._currentStep]
            switch (action.type) {
                case "GPIOEnable":
                    let gpioEnable = (action as GPIOEnable)

                    this._gpioMap.get(gpioEnable.pin)?.digitalWrite(gpioEnable.level)
                    break;
                case "PWMEnable":
                
                    break;
                case "PWMSetDuty":
                    let pwmSetDuty = (action as PWMSetDuty)
                    this._gpioMap.get(pwmSetDuty.pin)?.pwmWrite(pwmSetDuty.duty)
                    break;
                case "PWMSetPeriod":
                    let pemSetPeriod = (action as PWMSetPeriod)
                    this._gpioMap.get(pemSetPeriod.pin)?.pwmRange(pemSetPeriod.period)
                    break;
                case "Wait":
                    await new Promise(resolve => setTimeout(resolve, (action as Wait).msec))

                    break;
                default:
                    break;
            }
            this._currentStep++
        }
    }
}

function checktime(){
    let a = new Date(Date.now())
}


export {PrintWorker,printWorkerInterface,WorkingState,MoveMotorCommand}
