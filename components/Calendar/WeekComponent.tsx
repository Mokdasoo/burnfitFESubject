import { dateObj } from "../../util/dateFunctions";
import {Pressable, View, Text, StyleSheet, Dimensions } from 'react-native';

interface WeekComponent {
    month: number;
    weekData: dateObj[];
    selectedDate: dateObj;
    selectDateHandler: (date: dateObj)=>void;
    dateStateController: {
        prevMonthHandler: ()=>void;
        nextMonthHandler: ()=>void;
    };
}

const WINDOWWIDTH = Dimensions.get('window').width;
const WeekComponent = ({month, weekData, selectedDate, selectDateHandler, dateStateController}: WeekComponent) : JSX.Element => {
    return (
        <View style={[styles.container]}>
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
                    <View style={[`${selectedDate.year}${selectedDate.month}${selectedDate.date}` === `${date.year}${date.month}${date.date}` && styles.seleted]}/>
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
        </View>
    );
};

export default WeekComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        
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