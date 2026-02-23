import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';  // Lucide icon


const AddPHRButton = ({ onPress }) => {
   const navigation = useNavigation(); // 👈 HOOK USE KARO
  
    const handlePress = () => {
      navigation.navigate('AddphR'); // 👈 SCREEN PAR JAO
    };
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <FileText size={26.88} color="#00C874" />
      </View>
      <Text style={styles.label}>Add PHR</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 90.4,
    height: 120,
    left: 114,
    top: -0.06,
    alignItems: 'center',
  },
  iconContainer: {
    width: 71.68,
    height: 71.68,
    borderRadius: 24,
    backgroundColor: '#E5F9F1',  // Light red background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14.56,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1C1B1F',
  },
});

export default AddPHRButton;