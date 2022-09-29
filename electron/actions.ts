import { pipeline } from "stream";

type actionType = "PWMAction" | "GPIOEnable" | "PWMEnable" | "PWMSetDuty" | "PWMLinearAccel" | "PWMSetPeriod" | "Wait";


//pump1: 6
//pump2: 16
//propeller1: 19
//propeller2: 20
//valve: 21
//gp1: 26

enum GPIOPin
{
    pump1 = 6, 
    pump2 = 16,
    propeller1 = 19,
    propeller2 = 20,
    valve = 21,
    gp1 = 26,
    none = -1
}

export function nameToPin(name:string){
    switch(name){
        case "pump1":
            return GPIOPin.pump1
        case "pump2":
            return GPIOPin.pump2
        case "propeller1":
            return GPIOPin.propeller1
        case "propeller2":
            return GPIOPin.propeller2
        case "valve":
            return GPIOPin.valve
        case "gp1":
            return GPIOPin.gp1
        default:
            return GPIOPin.none
    }
}


abstract class Action{
    abstract readonly type: actionType;
}

abstract class GPIOAction extends Action{
    abstract readonly pin: GPIOPin
}


class Wait extends Action{
    type: actionType = "Wait";
    constructor(public readonly msec : number){
        super()
    }
}
class PWMAction extends GPIOAction{
    type: actionType = "PWMAction";
    pin: GPIOPin
    constructor(pin:GPIOPin){
        super()
        this.pin = pin
    }
}
class GPIOEnable extends GPIOAction{
    type: actionType = "GPIOEnable";
    pin: GPIOPin

    constructor(pin:GPIOPin,public readonly level:1|0){
        super()
        this.pin = pin
    }
}

class PWMEnable extends GPIOAction{
    type: actionType = "PWMEnable";
    pin: GPIOPin

    constructor(pin:GPIOPin,public readonly duty:number){
        super()
        this.pin = pin
    }
}

class PWMSetDuty extends GPIOAction{
    type: actionType = "PWMSetDuty";
    pin: GPIOPin

    constructor(pin:GPIOPin,public readonly duty: number){
        super()
        this.pin = pin
    }
}

class PWMSetPeriod extends GPIOAction{
    type: actionType = "PWMSetPeriod";
    pin: GPIOPin

    constructor(pin:GPIOPin,public readonly period:number){
        super()
        this.pin = pin

    }
}
class PWMLinearAccel extends GPIOAction{
    type: actionType = "PWMLinearAccel";
    pin: GPIOPin
    
    constructor(pin:GPIOPin,public readonly beginSpeed:number,public readonly endSpeed:number,
        public readonly accelDuty:number,public readonly resolution : number,public readonly duration:number){

        super()
        this.pin = pin
    }

    createActions() : Action[] {

        let actions : Action[] = []
        let speed : number = 0
        let accel : number = 0
        let timeSteps : number = Math.ceil((this.duration / this.resolution))
        
        accel = this.accelDuty * this.resolution
        speed = this.beginSpeed

        actions.push(new PWMSetDuty(this.pin,speed))

        for (let i = 0; i < timeSteps; i++) {
            
            actions.push(new Wait(this.resolution))
            speed = speed + accel
            
            if(speed >= this.endSpeed){
                speed = this.endSpeed
                actions.push(new PWMSetDuty(this.pin,this.endSpeed))
            }
            else
                actions.push(new PWMSetDuty(this.pin,speed))
        }
        actions.push(new PWMSetDuty(this.pin,0))

        return actions
    }
}

export {Wait,Action,GPIOAction,GPIOEnable,GPIOPin,PWMAction,PWMEnable,PWMLinearAccel,PWMSetDuty,PWMSetPeriod};
export type { actionType }