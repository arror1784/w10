Example motor w pump pins
Wait 500
GPIOEnable pump1 true
GPIOEnable pump2 false
PWMEnable pump true
PWMSetPeriod pump 50
PWMSetDuty pump 0.6
Wait 5000000
PWMLinearAccel pump 0.65 0.79 12000
Wait 30000
PWMLinearAccel pump 0.79 0.65 12000
Wait 3000
GPIOEnable pump1 false
PWMEnable pump false