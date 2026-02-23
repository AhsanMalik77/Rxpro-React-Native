import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  ScrollView } from 'react-native';
import UserSignUpForm from '../../components/Auth/UserSignUpForm';
import StoreSignUpForm from '../../components/Auth/StoreSignUpForm';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignUpScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('User');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Title: Sign Up */}
        <Text style={styles.headerTitle}>Sign Up</Text>

        {/* Custom Toggle Switch */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.toggleButton,
              userType === 'User' && styles.activeButton,
            ]}
            onPress={() => setUserType('User')}
          >
            <Text
              style={[
                styles.toggleText,
                userType === 'User' ? styles.activeText : styles.inactiveText,
              ]}
            >
              User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.toggleButton,
              userType === 'Store' && styles.activeButton,
            ]}
            onPress={() => setUserType('Store')}
          >
            <Text
              style={[
                styles.toggleText,
                userType === 'Store' ? styles.activeText : styles.inactiveText,
              ]}
            >
              Store
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering of Forms */}
        <View style={styles.formWrapper}>
          {userType === 'User' ? (
            <UserSignUpForm navigation={navigation} />
          ) : (
            <StoreSignUpForm navigation={navigation} />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00C874', // Green title as per image
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#E8F9F3', // Very light green background
    borderRadius: 35,
    height: 65,
    padding: 6,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  activeButton: {
    backgroundColor: '#00C874', // Solid green for active state
    // Shadow for active button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#00C874', // Green text for inactive state
  },
  formWrapper: {
    flex: 1,
  },
});

export default SignUpScreen;