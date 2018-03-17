import time
import requests

brightness = 0
for i in range(255):
    brightness += 1
    r = requests.put("http://localhost:3000/leds", data={'red': brightness, 'green': brightness, 'blue': brightness, 'white': brightness})
    time.sleep(3600 / 255)
