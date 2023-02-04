import { useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, FlatList} from 'react-native';
import {  dateObj, getDateInfo, MonthObj } from '../../util/dateFunctions';
import WeekComponent from './WeekComponent';

interface CalendarBodyProps {
    mode: 'week' | 'month';
    datesArray: MonthObj;
    dateStateController: {
        prevMonthHandler: ()=>void;
        nextMonthHandler: ()=>void;
    };
}

const CalendarBody = ({mode, datesArray, dateStateController}: CalendarBodyProps) : JSX.Element => {
    
    const [selectedDate, setSelectedDate] = useState<dateObj>(getDateInfo(new Date()));
    const selectDateHandler = (date: dateObj) => {
        setSelectedDate(prevState => ({
            ...date
        }))
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={datesArray.date}//[week1, week2, ...]
                renderItem={({item}) => 
                    <WeekComponent 
                        month={datesArray.month} 
                        weekData={item} 
                        selectedDate={selectedDate} 
                        selectDateHandler={selectDateHandler}
                        dateStateController={dateStateController}
                    />
                }
                keyExtractor={(item, index) => `year${datesArray.year}month${datesArray.month}week${index}`}
                horizontal={ mode === 'week' }
            />
            
        </View>
    );
}

export default CalendarBody;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
    },
});