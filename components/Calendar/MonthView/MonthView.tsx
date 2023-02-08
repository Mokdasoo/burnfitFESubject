import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {StyleSheet} from 'react-native';
import WeekComponent from "../WeekComponent";
import { CalendarBodyProps } from "../CalendarBody";
import { dateObj } from "../../../util/dateFunctions";
interface WeekViewProps extends CalendarBodyProps {
    animatedStyle: {};
    selectedDate: dateObj;
    selectDateHandler: (date: dateObj) =>void;
}
const MONTH_HEIGHT = 300;
const MonthView = ({datesArray, dateStateController, animatedStyle, selectedDate, selectDateHandler} : WeekViewProps): JSX.Element => {

    return (
        <Animated.View style={[styles.Monthcontainer, animatedStyle]}>
            {/* <Animated.FlatList 
                data={datesArray.date}
                renderItem={({item, index}) => (
                    <WeekComponent 
                        month={datesArray.month} 
                        weekData={item} 
                        selectedDate={selectedDate} 
                        selectDateHandler={selectDateHandler}
                        dateStateController={dateStateController}
                    />
                    )}
                    keyExtractor={(item, index) => `Month_year${datesArray.year}month${datesArray.month}week${index}`}
            /> */}
            {
                datesArray.date.map((week, index) => (
                    <WeekComponent 
                        month={datesArray.month} 
                        weekData={week} 
                        selectedDate={selectedDate} 
                        selectDateHandler={selectDateHandler}
                        dateStateController={dateStateController}
                        key={`Month_year${datesArray.year}month${datesArray.month}week${index}`}
                    />
                ))
            }
        </Animated.View>
    )
}

export default MonthView;

const styles = StyleSheet.create({
    Monthcontainer: {
        width: '100%',
        height: MONTH_HEIGHT,
        position: 'absolute',
        overflow: 'hidden'
    },
});