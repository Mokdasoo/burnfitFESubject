import {useEffect, useRef} from 'react';
import { FlatList } from "react-native-gesture-handler";
import Animated, { SharedValue } from "react-native-reanimated";
import {StyleSheet, useWindowDimensions} from 'react-native';
import WeekComponent from "../WeekComponent";
import { CalendarBodyProps } from "../CalendarBody";
import { dateObj } from "../../../util/dateFunctions";
interface WeekViewProps extends CalendarBodyProps {
    animatedStyle: {};
    selectedDate: dateObj;
    selectDateHandler: (date: dateObj) =>void;
    selectedIndex: number;
    calendarContainerHeight: SharedValue<number>;
}
const WeekView = ({
    datesArray, 
    dateStateController, 
    animatedStyle, 
    selectedDate, 
    selectDateHandler, 
    selectedIndex,
    calendarContainerHeight
} : WeekViewProps): JSX.Element => {
    const {width} = useWindowDimensions();
    const flatlistRef = useRef<FlatList>(null);

    useEffect(() => {
        flatlistRef.current?.scrollToIndex({index: selectedIndex});
    }, [selectedIndex]);
    

    return (
        <Animated.View style={[styles.WeekContainer, animatedStyle]}>
            <FlatList 
                ref={flatlistRef}
                data={datesArray.date}
                initialNumToRender={1} 
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
                        weekIndex={index}
                        selectedIndex={selectedIndex}
                        calendarContainerHeight={calendarContainerHeight}
                        mode='week'
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
        height: '100%',
        position: 'absolute'
    }
});