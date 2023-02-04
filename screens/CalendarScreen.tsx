import {View, StyleSheet} from 'react-native';
import Calendar from '../components/Calendar/Calendar';

const CalendarScreen = () : JSX.Element => {
    return (
        <View style={styles.container}>
            <Calendar />
        </View>
    );
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });