import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Home, Package, Truck, User, Search, Plus, Bell, MapPin,Motorbike } from 'lucide-react-native';

// Import medical screens
import Medicalhome from '../src/screens/Medicalscreens/Mhome';
import Medicalstock from '../src/screens/Medicalscreens/Mstock';
import MedicalRider from '../src/screens/Medicalscreens/Mrider';
import Medicalprof from '../src/screens/Medicalscreens/Mstore';

const Tab = createBottomTabNavigator();

export default function Medicaltab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 5,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarActiveTintColor: '#00D98E',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Medicalhome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Stock" 
        component={Medicalstock}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Package color={color} size={size} />
          ),
          tabBarLabel: 'Stock',
        }}
      />
      <Tab.Screen 
        name="Rider" 
        component={MedicalRider}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Motorbike color={color} size={size} />
          ),
          tabBarLabel: 'Rider',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Medicalprof}
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