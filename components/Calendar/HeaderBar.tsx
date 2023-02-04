import {StyleSheet, View, Pressable, Text} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

interface HeaderBarProps {
    year: number;
    month: number;
    prevMonthHandler : () => void;
    nextMonthHandler: () => void;
}

const HeaderBar = ({year, month, prevMonthHandler, nextMonthHandler}: HeaderBarProps) : JSX.Element => {

    return (
        <View style={styles.container}>
            <Pressable onPress={prevMonthHandler} style={({pressed})=>[pressed && styles.pressed]}>
                <FontAwesome5 name="chevron-left" size={18} color="#1f9aff" />
            </Pressable>
            <Text style={styles.text}>{`${year}년 ${month}월`}</Text>
            <Pressable onPress={nextMonthHandler} style={({pressed})=>[pressed && styles.pressed]}>
                <FontAwesome5 name="chevron-right" size={18} color="#1f9aff" />
            </Pressable>
        </View>
    );
}

export default HeaderBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.5
    }
});