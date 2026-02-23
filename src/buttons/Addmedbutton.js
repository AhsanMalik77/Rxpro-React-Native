import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Addmedbtn = ({ 
  label = 'Add Medicine',
  bgColor = '#E8F5E9',  // Light green background
  iconColor = '#00D98E'  // Green icon
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('AddMed');
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBg, { backgroundColor: bgColor }]}>
        <Plus size={26} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,  // Slightly smaller to match image
  },
  iconBg: {
    width: 60,  // Smaller icon background
    height: 60,
    borderRadius: 18,  // Slightly less rounded
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,  // Smaller text
    fontWeight: '500',
    color: '#333',  // Darker text
  },
});

export default Addmedbtn;