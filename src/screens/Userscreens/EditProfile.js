import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Image as ImageIcon
} from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Editprofile({ navigation }) {
  // State for form fields
  const [profileImage, setProfileImage] = useState(null);
  const [age, setAge] = useState('21');
  const [email, setEmail] = useState('aliibtisam28@gmail.com');
  const [contact, setContact] = useState('+92 3345133424');
  const [address, setAddress] = useState('Sixth Road, Rawalpindi');

  // Image picker functions
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
        Alert.alert('Success', 'Profile picture updated!');
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
        setProfileImage(response.assets[0].uri);
        Alert.alert('Success', 'Photo captured!');
      }
    });
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: '📸 Take Photo', onPress: openCamera },
        { text: '🖼️ Choose from Gallery', onPress: openGallery },
        { text: '❌ Cancel', style: 'cancel' }
      ]
    );
  };

  const handleUpdate = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileCircle} onPress={handleImageUpload}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <User color="#00C874" size={50} />
            )}
            <View style={styles.cameraIcon}>
              <Camera color="#fff" size={18} />
            </View>
          </TouchableOpacity>
          <Text style={styles.uploadText}>Tap to change photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Age */}
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Calendar color="#00C874" size={22} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="#999"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Mail color="#00C874" size={22} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Contact */}
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Phone color="#00C874" size={22} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Contact"
              placeholderTextColor="#999"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
          </View>

          {/* Address */}
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <MapPin color="#00C874" size={22} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00C874',
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  profileImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#00C874',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  uploadText: {
    fontSize: 14,
    color: '#00C874',
    fontWeight: '500',
  },
  formContainer: {
    gap: 15,
    marginBottom: 30,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});