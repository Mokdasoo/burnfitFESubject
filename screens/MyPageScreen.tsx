import {View, StyleSheet, Text} from 'react-native';

const MyPageScreen = () : JSX.Element => {
    return (
        <View style={styles.container}>
            <Text>My Page</Text>
        </View>
    );
}

export default MyPageScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
