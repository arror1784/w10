Wash cycle test half
Wait 500
GPIOEnable valve false
GPIOEnable pump1 true
GPIOEnable pump2 false
PWMEnable pump true
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 40000
GPIOEnable pump1 false
Wait 1000
PWMEnable propeller true
PWMSetPeriod propeller 50
GPIOEnable propeller1 true
PWMLinearAccel propeller 0.66 0.78 1200
Wait 30000
PWMLinearAccel propeller 0.78 0.7 1200
GPIOEnable propeller1 false
PWMEnable propeller false
Wait 5000
GPIOEnable pump2 true
PWMEnable pump true
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 43000
GPIOEnable pump2 false
Wait 1000000
GPIOEnable valve true
Wait 5000
GPIOEnable pump1 true
GPIOEnable pump2 false
PWMEnable pump true
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 40000
GPIOEnable pump1 false
Wait 1000
PWMEnable propeller true
PWMSetPeriod propeller 50
GPIOEnable propeller1 true
PWMLinearAccel propeller 0.66 0.78 1200
Wait 30000
PWMLinearAccel propeller 0.78 0.7 1200
GPIOEnable propeller1 false
PWMEnable propeller false
Wait 5000
GPIOEnable pump2 true
PWMEnable pump true
PWMSetPeriod pump 62
PWMSetDuty pump 0.95
Wait 43000
GPIOEnable pump2 false
GPIOEnable valve false
Wait 1000