import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import LibraryScreen from './screens/LibraryScreen';
import MyPageScreen from './screens/MyPageScreen';


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
            headerShown: false
          }}>
            <Tab.Screen 
              name="HOME" 
              component={HomeScreen}
              options={{
                tabBarLabelStyle: {fontWeight: 'bold'},
                tabBarIcon : ({color, size}) => (
                  <Ionicons name='home' color={color} size={size} />
                ),
                tabBarActiveTintColor: 'black',
              }}
            />
            <Tab.Screen 
              name="CALENDAR" 
              component={CalendarScreen} 
              options={{
                tabBarLabelStyle: {fontWeight: 'bold'},
                tabBarIcon : ({color, size}) => (
                  <Ionicons name='calendar-sharp' color={color} size={size} />
                ),
                tabBarActiveTintColor: 'black',
              }}
            />
            <Tab.Screen 
              name="LIBRARY" 
              component={LibraryScreen} 
              options={{
                tabBarLabelStyle: {fontWeight: 'bold'},
                tabBarIcon : ({color, size}) => (
                  <FontAwesome5 name="dumbbell" color={color} size={size} />
                ),
                tabBarActiveTintColor: 'black',
              }}
            />
            <Tab.Screen 
              name="MY PAGE" 
              component={MyPageScreen} 
              options={{
                tabBarLabelStyle: {fontWeight: 'bold'},
                tabBarIcon : ({color, size}) => (
                  <Ionicons name="person-outline" color={color} size={size} />
                ),
                tabBarActiveTintColor: 'black',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
