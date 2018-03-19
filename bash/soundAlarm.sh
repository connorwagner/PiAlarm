#!/bin/bash

echo $$

/home/pi/PiAlarm/bash/connectBluetooth.sh

while [ 1 ]; do
    aplay /home/pi/PiAlarm/alarm.wav 2> /dev/null
done
