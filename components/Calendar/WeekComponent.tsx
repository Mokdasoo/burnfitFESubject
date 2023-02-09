import { dateObj } from "../../util/dateFunctions";
import {Pressable, View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface WeekComponent {
    month: number;
    weekData: dateObj[];
    selectedDate: dateObj;
    selectDateHandler: (date: dateObj)=>void;
    dateStateController: {
        prevMonthHandler: ()=>void;
        nextMonthHandler: ()=>void;
    };
    weekIndex : number;
    calendarContainerHeight: SharedValue<number>;
    selectedIndex?:number;
    mode: 'month' | 'week';
}

const MONTH_HEIGHT = 300;
const WEEK_HEIGHT = 50;
const WINDOWWIDTH = Dimensions.get('window').width;
const WeekComponent = ({month, weekData, selectedDate, selectDateHandler, dateStateController, weekIndex, calendarContainerHeight, selectedIndex, mode}: WeekComponent) : JSX.Element => {
    const monthWeekAnimatedStyle = useAnimatedStyle(() => {
        const monthViewOpacity = interpolate(
            calendarContainerHeight.value,
            [MONTH_HEIGHT, WEEK_HEIGHT],
            [1, 0]
        );
        return {
            opacity: monthViewOpacity,
        };
    });
    return (
        <Animated.View style={[styles.container,  (selectedIndex !== weekIndex) && mode === 'month' && monthWeekAnimatedStyle]}>
            {weekData.map((date,index)=>{
                return(
                    <Pressable 
                        onPress={()=>{
                            selectDateHandler(date);
                            if(month > date.month) dateStateController.prevMonthHandler();
                            else if(month < date.month) dateStateController.nextMonthHandler();
                        }} 
                        style={styles.day_container}
                        key={`${date.year}${date.month}${date.date}`}
                    >
                        {`${selectedDate.year}${selectedDate.month}${selectedDate.date}` === 
                            `${date.year}${date.month}${date.date}` 
                            && <View style={styles.seleted}/>
                        }
                        <Text 
                            style={[
                                    styles.day_text, 
                                    month !== date.month && styles.notCurrentMonthDay, 
                                    date.day===0 && styles.sunday, 
                                    date.day===6 && styles.saturday
                            ]}
                        >
                            {date.date}
                        </Text>
                    </Pressable>
                )
            })}
        </Animated.View>
    );
};

export default WeekComponent;

const styles = StyleSheet.create({
    container: {
        width: WINDOWWIDTH- 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    day_container: {
        width: WINDOWWIDTH/8,
        height: WINDOWWIDTH/8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    day_text: {
        fontSize: 20
    },
    sunday:{
        color: 'red',
    },
    saturday:{
        color: 'blue'
    },
    notCurrentMonthDay:{
        opacity: 0.3
    },
    seleted: {
        position:'absolute',
        width: WINDOWWIDTH/10,
        height: WINDOWWIDTH/10,
        borderRadius: WINDOWWIDTH/20,
        borderColor: '#3575ffb2',
        borderWidth: 2
    },
});