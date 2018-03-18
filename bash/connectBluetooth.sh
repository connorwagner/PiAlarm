#!/bin/bash

pulseaudio --start

echo -e "connect \t\nquit" | bluetoothctl
sleep 5
