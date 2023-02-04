import {StyleSheet, View, Text, Dimensions} from 'react-native';

const WINDOWWIDTH = Dimensions.get('window').width;
const DayofTheWeek = () : JSX.Element => {
    const dayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <View style={styles.day}>
            {dayOfTheWeek.map((day) => {
                let dayStyle;
                switch (day) {
                    case 'Sun':
                        dayStyle =  styles.sunday;
                        break;
                    case 'Sat':
                        dayStyle = styles.saturday;
                        break;
                    default:
                        dayStyle = styles.weekday;
                }
                return (
                    <View style={styles.textWrap} key={day}>
                        <Text  style={dayStyle}>{day}</Text>
                    </View>
                );
            })}
            
        </View>
    );
};

export default DayofTheWeek;

const styles = StyleSheet.create({
    day:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textWrap: {
        width: WINDOWWIDTH/8,
        height: WINDOWWIDTH/8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekday:{
        fontSize: 18,
        opacity: 0.5,
        color: 'black'
    },
    sunday:{
        fontSize: 18,
        opacity: 0.5,
        color: 'red'
    },
    saturday:{
        fontSize: 18,
        opacity: 0.5,
        color: 'blue'
    }
});