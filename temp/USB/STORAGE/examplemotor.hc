Example motor w pump pins
Wait 500
GPIOWrite pump1 true
GPIOWrite pump2 false
PWMSetPeriod pump 50
PWMSetDuty pump 0.6
Wait 5000000
PWMLinearAccel pump 0.65 0.79 12000
Wait 30000
PWMLinearAccel pump 0.79 0.65 12000
Wait 3000
GPIOWrite pump1 false
