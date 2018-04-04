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
        minute=`jq '.Minute' <<< "$line"`
        minute=$((minute-30))
        if [ $minute -le -1 ]; then
            hour=$((hour-1))
            minute=$((minute+60))
        fi
        if [ $minute -le 9 ]; then
            minute="0$minute"
        fi
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
            if [ "$day" == $(date +"%A") ]; then
                echo '/home/pi/PiAlarm/startAlarm.py' | at $hour:$minute $AMPM
            fi
        done
    fi
done <<< "$ALARMS"
