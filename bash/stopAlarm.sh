#!/bin/bash

pgrep startAlarm | xargs kill
pgrep soundAlarm | xargs kill
pgrep aplay | xargs kill
curl -X PUT -d red=0 -d green=0 -d blue=0 -d white=0 localhost:3000/leds
