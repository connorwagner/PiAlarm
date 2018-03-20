#!/bin/bash

/home/pi/PiAlarm/bash/connectBluetooth.sh

tone=$(ls /home/pi/PiAlarm/alarmTones | shuf -n 1)

while [ 1 ]; do
    aplay /home/pi/PiAlarm/alarmTones/"$tone" 2> /dev/null
done
