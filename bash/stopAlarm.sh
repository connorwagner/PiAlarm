#!/bin/bash

pgrep startAlarm | xargs kill
pgrep soundAlarm | xargs kill
pgrep aplay | xargs kill
