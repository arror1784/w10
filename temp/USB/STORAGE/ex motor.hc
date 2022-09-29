Ex motor
Wait 500
GPIOWrite propeller1 true
PWMSetPeriod propeller 50
PWMLinearAccel propeller 0.66 0.78 1200
Wait 30000
PWMLinearAccel propeller 0.78 0.7 1200
GPIOWrite propeller1 false
Wait 5000
