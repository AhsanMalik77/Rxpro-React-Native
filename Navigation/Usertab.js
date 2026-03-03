import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Home, FileText, ShoppingBag, User,HeartPulse } from 'lucide-react-native';

// Import UserDashboard jo chal raha hai
import UserDashboard from '../src/screens/Userscreens/UserDashboard';
import PhrScreen from '../src/screens/Userscreens/PhrScreen';  
import OrdersScreen from '../src/screens/Userscreens/OrdersScreen';  
import ProfileScreen from '../src/screens/Userscreens/ProfileScreen';




const styles = StyleSheet.create({
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

const Tab = createBottomTabNavigator();

export default function Usertab({userId,name}) {
  const id=userId

console.log("Usertab ko ye ID mili:", id);
console.log(name);

  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#00D98E',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
       
        
        
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />

          ),
          tabBarLabel: 'Home',
        }}> 
     {(props) => <UserDashboard {...props} userId={userId} name={name} />}
        </Tab.Screen>
   
      <Tab.Screen 
        name="Phr" 
        component={PhrScreen}  // ✅ Ab defined hai
        options={{
          tabBarIcon: ({ color, size }) => (
            <HeartPulse color={color} size={size} />
          ),
          tabBarLabel: 'PHR',
        }}/>
             
   

      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen}  // ✅ Ab defined hai
        options={{
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
          ),
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}  // ✅ Ab defined hai
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}