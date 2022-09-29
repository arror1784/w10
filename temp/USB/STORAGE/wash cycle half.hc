Wash cycle test half
Wait 500
GPIOWrite valve false
GPIOWrite pump1 true
GPIOWrite pump2 false
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 40000
GPIOWrite pump1 false
Wait 1000
PWMSetPeriod propeller 50
GPIOWrite propeller1 true
PWMLinearAccel propeller 0.66 0.78 1200
Wait 30000
PWMLinearAccel propeller 0.78 0.7 1200
GPIOWrite propeller1 false
Wait 5000
GPIOWrite pump2 true
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 43000
GPIOWrite pump2 false
Wait 1000000
GPIOWrite valve true
Wait 5000
GPIOWrite pump1 true
GPIOWrite pump2 false
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 40000
GPIOWrite pump1 false
Wait 1000
PWMSetPeriod propeller 50
GPIOWrite propeller1 true
PWMLinearAccel propeller 0.66 0.78 1200
Wait 30000
PWMLinearAccel propeller 0.78 0.7 1200
GPIOWrite propeller1 false
Wait 5000
GPIOWrite pump2 true
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 43000
GPIOWrite pump2 false
GPIOWrite valve false
Wait 1000