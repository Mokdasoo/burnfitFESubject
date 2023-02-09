import { FlatList } from "react-native-gesture-handler";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import {StyleSheet} from 'react-native';
import WeekComponent from "../WeekComponent";
import { CalendarBodyProps } from "../CalendarBody";
import { dateObj } from "../../../util/dateFunctions";

interface WeekViewProps extends CalendarBodyProps {
    selectedDate: dateObj;
    selectDateHandler: (date: dateObj) =>void;
    calendarContainerHeight: SharedValue<number>;
    monthDisplay: SharedValue<number>;
    selectedIndex: number;
}
const MONTH_HEIGHT = 300;
const WEEK_HEIGHT = 50;
const MonthView = ({
    datesArray, 
    dateStateController,  
    selectedDate, 
    selectDateHandler, 
    calendarContainerHeight, 
    monthDisplay,
    selectedIndex
} : WeekViewProps): JSX.Element => {

    
    const monthDisplayStyle = useAnimatedStyle(()=>{
        return {
            opacity: monthDisplay.value,
            height: calendarContainerHeight.value + interpolate(
                calendarContainerHeight.value,
                [MONTH_HEIGHT, WEEK_HEIGHT],
                [0, WEEK_HEIGHT * selectedIndex]
            )
        }
    });
    const monthWeekPositionStyle = useAnimatedStyle(() => {
        return{
            transform: [{
                translateY : interpolate(
                    calendarContainerHeight.value,
                    [MONTH_HEIGHT, WEEK_HEIGHT],
                    [0, - WEEK_HEIGHT * selectedIndex]
                )
            }],
            
        }
    });
    return (
        <Animated.View style={[styles.Monthcontainer, monthDisplayStyle]}>
            <Animated.View style={[monthWeekPositionStyle]}>
                <FlatList 
                    data={datesArray.date}
                    keyExtractor={(item, index) => `Month_year${datesArray.year}month${datesArray.month}week${index}`}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                        <WeekComponent 
                            month={datesArray.month} 
                            weekData={item} 
                            selectedDate={selectedDate} 
                            selectDateHandler={selectDateHandler}
                            dateStateController={dateStateController}
                            key={`Month_year${datesArray.year}month${datesArray.month}week${index}`}
                            weekIndex={index}
                            calendarContainerHeight={calendarContainerHeight}
                            selectedIndex={selectedIndex}
                            mode='month'
                        />
                    )}
                />
            </Animated.View>

            
        </Animated.View>
    )
}

export default MonthView;

const styles = StyleSheet.create({
    Monthcontainer: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
});