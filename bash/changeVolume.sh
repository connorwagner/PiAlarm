#!/bin/bash

/home/pi/PiAlarm/bash/connectBluetooth.sh

pactl set-sink-volume @DEFAULT_SINK@ $1%
