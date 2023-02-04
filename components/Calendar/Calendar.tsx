import {View, StyleSheet} from 'react-native';
import {useState} from 'react';
import HeaderBar from './HeaderBar';
import DayofTheWeek from './DayofTheWeek';
import CalendarBody from './CalendarBody';
import { dateObj, getDateInfo, getMonthDate, MonthObj } from '../../util/dateFunctions';



const Calendar = () : JSX.Element => {
    const today = getDateInfo(new Date());
    const [dateState, setDateState] = useState<dateObj>(today);
    const array = getMonthDate(dateState);
    const [datesArray, setDatesArray] = useState<MonthObj>(array);
    const prevMonthHandler = () => {
        const newState = getDateInfo(new Date(dateState.year, dateState.month-2, 1));
        setDateState(prevState => ({
            ...prevState,
            ...newState
        }));
        const newArray = getMonthDate(newState);
        setDatesArray(prevState => ({
            ...prevState,
            ...newArray

        }));
    }
    const nextMonthHandler = () => {
        const newState = getDateInfo(new Date(dateState.year, dateState.month, 1));
        setDateState(prevState => ({
            ...prevState,
            ...newState
        }));
        const newArray = getMonthDate(newState);
        setDatesArray(prevState => ({
            ...prevState,
            ...newArray

        }));
    }
    const dateStateController = {
        prevMonthHandler: prevMonthHandler,
        nextMonthHandler: nextMonthHandler
    }

    

    return (
        <View style={styles.container}>
            <HeaderBar 
                prevMonthHandler={prevMonthHandler} 
                nextMonthHandler={nextMonthHandler}  
                year={dateState.year}
                month={dateState.month}
            />
            <DayofTheWeek />
            <CalendarBody 
                mode='month'
                datesArray={datesArray}
                dateStateController={dateStateController}
            />
        </View>
    );
};
export default Calendar;

const styles = StyleSheet.create({
    container: {
       marginTop: 24,
       marginHorizontal: 16

    }
})

