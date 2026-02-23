import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';

const UserHeader = ({ userName, onNotificationPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello, </Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <Bell size={20} color="#1f2020" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 11,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00C874',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00C874',
    marginLeft: 4,
  },
  notificationButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
   

  },

});

export default UserHeader;
