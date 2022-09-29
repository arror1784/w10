Ex motor
Wait 500
GPIOEnable propeller1 true
PWMEnable propeller true
PWMSetPeriod propeller 50
PWMLinearAccel propeller 0.66 0.78 1200
Wait 30000
PWMLinearAccel propeller 0.78 0.7 1200
GPIOEnable propeller1 false
PWMEnable propeller false
Wait 5000
