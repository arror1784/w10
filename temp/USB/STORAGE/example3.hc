Example Course3
Wait 2000
GPIOWrite propeller1 false
PWMSetPeriod pump 100
PWMSetPeriod propeller 100
PWMSetDuty pump 50
Wait 2000
PWMSetDuty pump 0
PWMLinearAccel propeller 0 80 20 1000 5000
