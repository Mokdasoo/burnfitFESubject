import {useState, useEffect, useRef} from 'react';
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {StyleSheet, useWindowDimensions} from 'react-native';
import WeekComponent from "../WeekComponent";
import { CalendarBodyProps } from "../CalendarBody";
import { dateObj } from "../../../util/dateFunctions";
interface WeekViewProps extends CalendarBodyProps {
    animatedStyle: {};
    selectedDate: dateObj;
    selectDateHandler: (date: dateObj) =>void;
}
const WEEK_HEIGHT = 60;
const WeekView = ({datesArray, dateStateController, animatedStyle, selectedDate, selectDateHandler} : WeekViewProps): JSX.Element => {
    const {width} = useWindowDimensions();
    const flatlistRef = useRef<FlatList>(null);
    const [selectedIndex, setSelectedIndex] = useState(
        datesArray.date.findIndex(week => 
        week.findIndex(day => 
            `${day.year}${day.month}${day.date}` === `${selectedDate.year}${selectedDate.month}${selectedDate.date}`
        ) !== -1
    ));

    useEffect(() => {
        setSelectedIndex(() =>
            datesArray.date.findIndex(week => 
                week.findIndex(day => 
                    `${day.year}${day.month}${day.date}` === `${selectedDate.year}${selectedDate.month}${selectedDate.date}`
                ) !== -1)
        );
        if(selectedIndex === -1){
            flatlistRef.current?.scrollToIndex({index: 0});
        }else{
            flatlistRef.current?.scrollToIndex({index: selectedIndex});
        }
    }, [datesArray, selectedDate, selectedIndex]);
    
    console.log(selectedIndex);

    return (
        <Animated.View style={[styles.WeekContainer, animatedStyle]}>
            <FlatList 
                ref={flatlistRef}
                data={datesArray.date}
                keyExtractor={(item, index) => `Week_year${datesArray.year}month${datesArray.month}week${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => (
                    {length: width-32, offset: (width-32) * index, index}
                  )}
                renderItem={({item, index}) => (
                    <WeekComponent 
                        month={datesArray.month} 
                        weekData={item} 
                        selectedDate={selectedDate} 
                        selectDateHandler={selectDateHandler}
                        dateStateController={dateStateController}
                    />
                )}
            />
        </Animated.View>
    )
}

export default WeekView;

const styles = StyleSheet.create({
    WeekContainer: {
        width: '100%',
        height: WEEK_HEIGHT,
        position : 'absolute'
    }
});