import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const AddrxButton = ({ 
  label = 'Add Rx', 
  onPress,
  bgColor = '#E5F9F1',
  iconColor = '#00C874'
}) => {
   const navigation = useNavigation(); // 👈 HOOK USE KARO
    
      const handlePress = () => {
        navigation.navigate('AddrX'); // 👈 SCREEN PAR JAO
      };
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
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
    width: 87,
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1F',
  },
});

export default AddrxButton;