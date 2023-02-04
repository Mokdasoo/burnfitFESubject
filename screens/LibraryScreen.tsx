import {View, Text, StyleSheet} from 'react-native';

const LibraryScreen = () : JSX.Element => {
    return (
        <View style={styles.container}>
            <Text>Library</Text>
        </View>
    );
}

export default LibraryScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
