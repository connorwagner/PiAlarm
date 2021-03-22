#!/usr/bin/python3

import time
import requests
import os

brightness = 0
for i in range(255):
    brightness += 1
    r = requests.put("http://localhost:3000/leds", data={'red': 0, 'green': 0, 'blue': 0, 'white': brightness})
    time.sleep(int(os.environ['ALARM_DURATION']) * 60 / 255)

requests.post("http://localhost:3000/speaker")
