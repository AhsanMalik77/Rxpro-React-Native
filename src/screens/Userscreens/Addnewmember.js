import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TextInput, TouchableOpacity, 
  StyleSheet, Alert, Modal, FlatList, Image, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, ChevronDown, Phone, Camera, User, X } from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function Addnewmember() {
  // ✅ ALL HOOKS AT THE TOP - FIXED ORDER
  const navigation = useNavigation();
  
  // All useState hooks - SAME ORDER EVERY RENDER
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [relationship, setRelationship] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ✅ CONSTANTS - Not hooks, safe anywhere
  const relationships = ['Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter', 'Husband', 'Wife', 'Friend', 'Other'];
  const genders = ['Male', 'Female', 'Other'];

  // ✅ ALL FUNCTIONS AFTER HOOKS
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setDateOfBirth(formattedDate);
    }
    setShowDatePicker(false);
  };

  const openGallery = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
        Alert.alert('Success', 'Profile picture selected!');
      }
    });
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchCamera(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
        Alert.alert('Success', 'Photo captured!');
      }
    });
  };

  const handleProfileUpload = () => {
    Alert.alert('Upload Profile Picture', 'Choose an option', [
      { text: '📸 Take Photo', onPress: openCamera },
      { text: '🖼️ Choose from Gallery', onPress: openGallery },
      { text: '🗑️ Remove', onPress: () => setProfileImage(null) },
      { text: '❌ Cancel', style: 'cancel' }
    ]);
  };

  const handleAddMember = () => {
    if (!fullName || !dateOfBirth || !relationship || !gender || !contact) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Member Added Successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft color="#000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Member</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Circle */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileCircle} onPress={handleProfileUpload}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <User color="#00C874" size={40} />
            )}
            <View style={styles.cameraIcon}>
              <Camera color="white" size={14} />
            </View>
          </TouchableOpacity>
          <Text style={styles.uploadText}>Tap to upload photo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#A0A0A0"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity 
              style={styles.inputWithIcon}
              onPress={() => setShowDatePicker(true)}
            >
              <TextInput
                style={styles.input}
                placeholder="Select Date"
                placeholderTextColor="#A0A0A0"
                value={dateOfBirth}
                editable={false}
              />
              <Calendar color="#00C874" size={20} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* Relationship */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Relationship</Text>
            <TouchableOpacity 
              style={styles.inputWithIcon}
              onPress={() => setShowRelationshipModal(true)}
            >
              <TextInput
                style={styles.input}
                placeholder="Relationship"
                placeholderTextColor="#A0A0A0"
                value={relationship}
                editable={false}
              />
              <ChevronDown color="#00C874" size={20} />
            </TouchableOpacity>
          </View>

          {/* Gender */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Gender</Text>
            <TouchableOpacity 
              style={styles.inputWithIcon}
              onPress={() => setShowGenderModal(true)}
            >
              <TextInput
                style={styles.input}
                placeholder="Gender"
                placeholderTextColor="#A0A0A0"
                value={gender}
                editable={false}
              />
              <ChevronDown color="#00C874" size={20} />
            </TouchableOpacity>
          </View>

          {/* Contact */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#A0A0A0"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
              />
              <Phone color="#00C874" size={20} />
            </View>
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
          <Text style={styles.addButtonText}>Add Member</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Relationship Modal */}
      {showRelationshipModal && (
        <Modal visible={showRelationshipModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Relationship</Text>
                <TouchableOpacity onPress={() => setShowRelationshipModal(false)}>
                  <X color="#000" size={22} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={relationships}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setRelationship(item);
                      setShowRelationshipModal(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Gender Modal */}
      {showGenderModal && (
        <Modal visible={showGenderModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Gender</Text>
                <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                  <X color="#000" size={22} />
                </TouchableOpacity>
              </View>
              {genders.map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.modalItem}
                  onPress={() => {
                    setGender(item);
                    setShowGenderModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00C874',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#00C874',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  uploadText: {
    marginTop: 8,
    color: '#00C874',
    fontSize: 12,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
  },
});