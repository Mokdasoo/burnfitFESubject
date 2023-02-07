import React,{ useState } from 'react';
import {StyleSheet} from 'react-native';
import {  dateObj, getDateInfo, MonthObj } from '../../util/dateFunctions';
import Animated, {useSharedValue, useAnimatedStyle,useAnimatedGestureHandler, AnimatedStyleProp, withTiming, Easing} from 'react-native-reanimated';
import {  gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent, FlatList  } from 'react-native-gesture-handler';
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
const WEEK_HEIGHT = 60;


const CalendarBody =gestureHandlerRootHOC( ({datesArray, dateStateController}: CalendarBodyProps) : JSX.Element => {
    
    const y = useSharedValue(0);
    const monthOpacity = useSharedValue(1);
    const weekOpacity = useSharedValue(0);

    type ctxType = {
        diffY: number;
    }
    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ctxType>({
        onStart: (_, ctx) => {
          ctx.diffY = 0;
        },
        onActive: (event, ctx) => {
            ctx.diffY = event.translationY;
            if(ctx.diffY > 0 && monthOpacity.value < 1) monthOpacity.value = 0 + ctx.diffY/500;
            else if(ctx.diffY <= -100 && monthOpacity.value > 0) monthOpacity.value = 1 + ctx.diffY/500;
            if(ctx.diffY <= -100 && weekOpacity.value >= 0) weekOpacity.value = 0 + -ctx.diffY/500;
            else if(ctx.diffY > 0 && weekOpacity.value < 1) weekOpacity.value = 1 - ctx.diffY/500;
        },
        onEnd: (_, ctx) => {
            if(monthOpacity.value <= 0.5){
                monthOpacity.value = 0;
                weekOpacity.value = 1;
            }else{
                monthOpacity.value = 1;
                weekOpacity.value = 0;
            }
        },
      });
    const monthAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: monthOpacity.value
        };
    });
    const weekAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: weekOpacity.value
        };
    });
    
    
    const [selectedDate, setSelectedDate] = useState<dateObj>(getDateInfo(new Date()));
    const selectDateHandler = (date: dateObj) => {
        setSelectedDate(prevState => ({
            ...date
        }))
    }

    return (
        <PanGestureHandler  onGestureEvent={gestureHandler}>
            <Animated.View style={styles.container}>
                <MonthView 
                    datesArray={datesArray} 
                    dateStateController={dateStateController} 
                    selectedDate={selectedDate} 
                    selectDateHandler={selectDateHandler} 
                    animatedStyle={monthAnimatedStyle} 
                />
                <WeekView 
                    datesArray={datesArray} 
                    dateStateController={dateStateController} 
                    selectedDate={selectedDate} 
                    selectDateHandler={selectDateHandler} 
                    animatedStyle={weekAnimatedStyle} 
                />
               
            </Animated.View>
        </PanGestureHandler >
    );
});

export default CalendarBody;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Monthcontainer: {
        width: '100%',
        height: MONTH_HEIGHT,
    },
    WeekContainer: {
        width: '100%',
        height: WEEK_HEIGHT
    }
});