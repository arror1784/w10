Example Course pump
Wait 500
GPIOWrite pump1 true
GPIOWrite pump2 false
PWMSetDuty pump 0.95
PWMSetPeriod pump 62
Wait 5000
GPIOWrite pump1 false
Wait 500
GPIOWrite pump2 true
Wait 5000
GPIOWrite pump2 false
