#!/bin/bash

pulseaudio --start
sleep 5

echo -e "connect \t\nquit" | bluetoothctl
sleep 5
