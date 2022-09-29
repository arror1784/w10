Example Course pump
Wait 500
GPIOEnable pump1 true
GPIOEnable pump2 false
PWMEnable pump true
PWMSetDuty pump 0.95
PWMSetPeriod pump 62
Wait 5000
GPIOEnable pump1 false
Wait 500
GPIOEnable pump2 true
Wait 5000
GPIOEnable pump2 false
PWMEnable pump false