import { Action,actionType, GPIOEnable, nameToPin, PWMLinearAccel, PWMSetDuty, PWMSetPeriod, Wait } from "./actions"


class CourseLoader{

    private _actions : Action[] = []
    private _duration:number = 0

    constructor(){

    }

    createActions(data : string){
        let strArr = data.split('\n')
        this._actions = []
        this._duration = 0

        for (const i of strArr) {
            const parsingStr = i.split(' ')
            switch (parsingStr[0] as actionType) {
                case "GPIOEnable": // GPIOEnable {GPIOPin} {boolean}
                    this._actions.push(new GPIOEnable(nameToPin(parsingStr[1]),parsingStr[2] == "true" ? 1 : 0))
                    break;
                case "PWMAction": //
                    break;
                case "PWMEnable":
                    break;
                case "PWMLinearAccel": // PWMLinearAccel {GPIOPin} {BeginDuty} {LastDuty} {accelDuty:duty/sec} { resolution : milli } {time:milli}
                    let pwmLinearAccel = new PWMLinearAccel(nameToPin(parsingStr[1]),Number(parsingStr[2]),Number(parsingStr[3])
                                                    ,Number(parsingStr[4]),Number(parsingStr[5]),Number(parsingStr[6]))
                    this._actions.push(...pwmLinearAccel.createActions())
                    this._duration = this._duration + Number(parsingStr[6])
                    break;
                case "PWMSetDuty": // PWMSetDuty {GPIOPin} {duty}
                    this._actions.push(new PWMSetDuty(nameToPin(parsingStr[1]),Number(parsingStr[2])))

                    break;
                case "PWMSetPeriod":// PWMSetPeriod {GPIOPin} {period}
                    this._actions.push(new PWMSetPeriod(nameToPin(parsingStr[1]),Number(parsingStr[2])))

                    break;
                case "Wait": // Wait {time:milli}
                    this._actions.push(new Wait(Number(parsingStr[1])))
                    this._duration = this._duration + Number(parsingStr[1])
                    break;

                default:
                    break;
            }
        }
        return this._actions
    }
    getDuration(){
        return this._duration
    }
}
const modelNOInstance = new CourseLoader()

export function getModelNOInstance(){
    return modelNOInstance
}