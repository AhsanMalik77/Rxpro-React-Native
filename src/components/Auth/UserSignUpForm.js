import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  StyleSheet,

  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays, Eye, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signupuser } from '../../Services/authservice';

const UserSignUpForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleDateChange = (event, selectedDate) => {
  setShowDatePicker(false);
  
  if (selectedDate) {
    // Extract Year, Month, and Day
    const year = selectedDate.getFullYear();
    // Months 0-11 hotay hain, isliye +1 kiya aur '0' add kiya agar single digit ho
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    // Visual Studio / SQL / MongoDB standard format: YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    
    setDateOfBirth(formattedDate);
    console.log("Formatted Date for Backend:", formattedDate);
  }
};

 const handleSubmit = async () => {
    // Basic Validation
    if (!username || !email || !contact || !dateOfBirth || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // 3. API Call ka setup

    try {
      // Backend ke "Customer" model ke mutabiq object taiyar karein
      const userData = {
        name: username,
        email: email,
        password: password,
        contact: contact,
        dob: dateOfBirth, // Agar backend mein field hai to add karein
      }; 

      const result = await signupuser(userData); // Service call
      
      Alert.alert('Success', 'Account Created Successfully!');
      navigation.navigate('SignIn'); // Signup ke baad Login par bhej dein

    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      // Loading band
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Username */}
        <TextInput 
          style={styles.input}
          placeholder="Username" 
          placeholderTextColor="#BDBDBD"
          value={username} 
          onChangeText={setUsername} 
        />

        {/* Email */}
        <TextInput 
          style={styles.input}
          placeholder="Email" 
          placeholderTextColor="#BDBDBD"
          keyboardType="email-address"
          value={email} 
          onChangeText={setEmail} 
        />

        {/* Password (Simplified Layout like Image) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.flexInput}
            placeholder="Password"
            placeholderTextColor="#BDBDBD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
             {showPassword ? <Eye size={22} color="#BDBDBD" /> : <EyeOff size={22} color="#BDBDBD" />}
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.flexInput}
            placeholder="Confirm Password"
            placeholderTextColor="#BDBDBD"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
             {showConfirmPassword ? <Eye size={22} color="#BDBDBD" /> : <EyeOff size={22} color="#BDBDBD" />}
          </TouchableOpacity>
        </View>

        {/* Contact */}
        <TextInput 
          style={styles.input}
          placeholder="Contact" 
          placeholderTextColor="#BDBDBD"
          keyboardType="phone-pad"
          value={contact} 
          onChangeText={setContact} 
        />

        {/* Date of Birth */}
        <TouchableOpacity 
          style={styles.inputContainer} 
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.8}
        >
          <TextInput 
            style={styles.flexInput}
            placeholder="Date of Birth" 
            placeholderTextColor="#BDBDBD"
            value={dateOfBirth} 
            editable={false} 
          />
          <CalendarDays size={22} color="#00D98E" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 30,
    paddingTop: 20,
  },
  input: {
    height: 60,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    height: 60,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  flexInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  signUpButton: {
    backgroundColor: '#00C874',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserSignUpForm;