#!/bin/bash

echo $$

while [ 1 ]; do
    aplay /home/pi/PiAlarm/alarm.wav 2> /dev/null
done
