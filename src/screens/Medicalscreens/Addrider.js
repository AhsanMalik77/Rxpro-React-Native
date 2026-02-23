import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Bike,
  Camera,
  Calendar,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AddRider({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [riderPhoto, setRiderPhoto] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Date picker handler
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setDateOfBirth(formattedDate);
    }
    setShowDatePicker(false);
  };

  // Image picker functions
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setRiderPhoto(response.assets[0].uri);
        Alert.alert('Success', 'Photo selected!');
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setRiderPhoto(response.assets[0].uri);
        Alert.alert('Success', 'Photo captured!');
      }
    });
  };

  const handlePhotoUpload = () => {
    Alert.alert(
      'Upload Rider Photo',
      'Choose an option',
      [
        { text: '📸 Take Photo', onPress: openCamera },
        { text: '🖼️ Choose from Gallery', onPress: openGallery },
        { text: '❌ Cancel', style: 'cancel' }
      ]
    );
  };

  const handleAddRider = () => {
    if (!name || !email || !contact || !address || !vehicleInfo || !dateOfBirth || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Rider added successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Rider</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <User color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter rider name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Mail color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Contact Info</Text>
          <View style={styles.inputWrapper}>
            <Phone color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Address */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputWrapper}>
            <MapPin color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        {/* Courier Vehicle Info */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Courier Vehicle Info</Text>
          <View style={styles.inputWrapper}>
            <Bike color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="e.g., Honda CD 70, 2022"
              placeholderTextColor="#999"
              value={vehicleInfo}
              onChangeText={setVehicleInfo}
            />
          </View>
        </View>

        {/* Rider Photo */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Rider Photo</Text>
          <TouchableOpacity style={styles.photoWrapper} onPress={handlePhotoUpload}>
            {riderPhoto ? (
              <View style={styles.photoPreviewContainer}>
                <Image source={{ uri: riderPhoto }} style={styles.photoPreview} />
                <Text style={styles.changePhotoText}>Tap to change</Text>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Camera color="#00D98E" size={30} />
                <Text style={styles.uploadText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Date of Birth */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity 
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <Calendar color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Select date of birth"
              placeholderTextColor="#999"
              value={dateOfBirth}
              editable={false}
            />
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* Password with Lucide Eye Toggle */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Lock color="#00D98E" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              {showPassword ? (
                <Eye color="#00D98E" size={22} strokeWidth={2} />
              ) : (
                <EyeOff color="#00D98E" size={22} strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Rider Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddRider}>
          <Text style={styles.addButtonText}>Add Rider</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    padding: 0,
  },
  eyeButton: {
    padding: 4,
  },
  photoWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#00D98E',
    fontWeight: '500',
  },
  photoPreviewContainer: {
    alignItems: 'center',
    padding: 10,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  changePhotoText: {
    fontSize: 12,
    color: '#00D98E',
  },
  addButton: {
    backgroundColor: '#00D98E',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});