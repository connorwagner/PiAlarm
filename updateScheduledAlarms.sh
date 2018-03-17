#!/bin/bash

JOBS=$(atq)
while read -r line; do
    if [ ! -z "$line" ]; then
        ID=`awk '{print $1}' <<< "$line"`
        atrm "$ID"
    fi
done <<< "$JOBS"

ALARMS="$(curl -s "http://localhost:3000/alarms/active" | jq -c '.[]')"
while read -r line; do
    if [ ! -z "$line" ]; then
        hour=`jq '.Hour' <<< "$line"`
        hour=$((hour-1))
        swapDay=false
        AMPM="AM"
        if [ $hour -le -1 ]; then
            swapDay=true
            AMPM="PM"
            hour=11
        fi
        if [ $hour -ge 12 ]; then
            AMPM="PM"
            if [ $hour -ge 13 ]; then
                hour=$((hour-12))
            fi
        fi
        minute=`jq '.Minute' <<< "$line"`
        if [ $minute -le 9 ]; then
            minute="0$minute"
        fi
        days=`jq -r '.Days' <<< "$line"`
        for (( i=0; i<${#days}; i++ )); do
            day="${days:$i:1}";
            case "$day" in
                M) $swapDay && day="Sunday" || day="Monday" ;;
                T) $swapDay && day="Monday" || day="Tuesday" ;;
                W) $swapDay && day="Tuesday" || day="Wednesday" ;;
                R) $swapDay && day="Wednesday" || day="Thursday" ;;
                F) $swapDay && day="Thursday" || day="Friday" ;;
                S) $swapDay && day="Friday" || day="Saturday" ;;
                U) $swapDay && day="Saturday" || day="Sunday" ;;
            esac
            echo "echo 'python3 /home/pi/PiAlarm/startAlarm.py' | at $hour:$minute $AMPM $day > /dev/null 2>&1"
        done
    fi
done <<< "$ALARMS"
