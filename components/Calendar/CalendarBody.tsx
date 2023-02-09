import React,{ useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import {  dateObj, getDateInfo, MonthObj } from '../../util/dateFunctions';
import Animated, {useSharedValue, useAnimatedStyle,useAnimatedGestureHandler, withTiming, Easing, } from 'react-native-reanimated';
import {  gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';

export interface CalendarBodyProps {
    datesArray: MonthObj;
    dateStateController: {
        prevMonthHandler: ()=>void;
        nextMonthHandler: ()=>void;
    };
}
const MONTH_HEIGHT = 300;
const WEEK_HEIGHT = 50;


const CalendarBody =gestureHandlerRootHOC( ({datesArray, dateStateController}: CalendarBodyProps) : JSX.Element => {
    
    const calendarContainerHeight = useSharedValue(MONTH_HEIGHT);
    const monthDisplay = useSharedValue(1);
    const weekDisplay = useSharedValue(0);

    type ctxType = {
        startHeight : number;
        boundaryPointY: number;
    }
    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ctxType>({
        onStart: (_, ctx) => {
            ctx.startHeight = calendarContainerHeight.value;
        },
        onActive: (event, ctx) => {
            /** weekview와 monthview 둘 중 하나만 활성화하기 위한 if문 */
            if(Math.abs(event.translationY) <= WEEK_HEIGHT && calendarContainerHeight.value === WEEK_HEIGHT ){
                monthDisplay.value = 0;
                weekDisplay.value = 1;
            }else{
                monthDisplay.value = 1;
                weekDisplay.value = 0;

                /** drag시 높이 위치에 따라 조절 */
                calendarContainerHeight.value = ctx.startHeight + event.translationY;
            }

            /** 높이 최대 최소 넘으면 절대 치수로 고정 */
            if(event.translationY <= 0 && calendarContainerHeight.value <= WEEK_HEIGHT){
                calendarContainerHeight.value = WEEK_HEIGHT;
            }else if(event.translationY >= 0 && calendarContainerHeight.value >= MONTH_HEIGHT){
                calendarContainerHeight.value = MONTH_HEIGHT;
            }
        },
        onEnd: ({translationY}, ctx) => {
            ctx.boundaryPointY = calendarContainerHeight.value;
            if(translationY > 0){
                ctx.boundaryPointY = MONTH_HEIGHT;
                monthDisplay.value = 1;
                weekDisplay.value = 0;
            }else if( translationY < 0 ) {
                ctx.boundaryPointY = WEEK_HEIGHT;
                monthDisplay.value = 0;
                weekDisplay.value = 1;
            }
            if(translationY !== 0 ){
                calendarContainerHeight.value = withTiming(ctx.boundaryPointY, {
                    duration: 500,
                    easing: Easing.out(Easing.exp),
                });
            }
        },
      });
    const gestureStyle = useAnimatedStyle(() => {
        return {
            height : calendarContainerHeight.value,
        }
    });
    
    const weekAnimatedStyle = useAnimatedStyle(() => {
          return {
            opacity: weekDisplay.value
          };
    });
    
    const [selectedDate, setSelectedDate] = useState<dateObj>(getDateInfo(new Date()));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectDateHandler = (date: dateObj) => {
        setSelectedDate(_ => ({
            ...date
        }))
    }
    useEffect(() => {
        let Index = datesArray.date.findIndex(week => 
            (week.findIndex(day => 
                `${day.year}${day.month}${day.date}` === `${selectedDate.year}${selectedDate.month}${selectedDate.date}`
            ) !== -1) 
        );
        if(Index === -1) Index = 0;
        setSelectedIndex(prev => {
            return Index;
        });
    }, [datesArray, selectedDate, selectedIndex]);

    return (
        <PanGestureHandler  onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.container, gestureStyle]}>
                <WeekView 
                    datesArray={datesArray} 
                    dateStateController={dateStateController} 
                    selectedDate={selectedDate} 
                    selectDateHandler={selectDateHandler} 
                    animatedStyle={weekAnimatedStyle} 
                    selectedIndex={selectedIndex}
                    calendarContainerHeight={calendarContainerHeight}
                />
                <MonthView 
                    datesArray={datesArray} 
                    dateStateController={dateStateController} 
                    selectedDate={selectedDate} 
                    selectDateHandler={selectDateHandler}
                    calendarContainerHeight={calendarContainerHeight}
                    monthDisplay={monthDisplay}
                    selectedIndex={selectedIndex}
                />
                
               
            </Animated.View>
        </PanGestureHandler >
    );
});

export default CalendarBody;

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
        borderBottomRadius: 4 ,
        overflow: 'hidden',
    },
});