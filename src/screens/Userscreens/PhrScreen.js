import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Edit2,
  User,
  MoreVertical,
  Calendar,
  ChevronDown,
  Phone,
  Camera,
  X
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function PhrScreen({ navigation }) {
  // Profiles state
  const [profiles, setProfiles] = useState([
    { 
      id: 1, 
      name: 'Ibtisam Ali', 
      age: '22', 
      conditions: 'Acne',
      relationship: 'Brother',
      gender: 'Male',
      contact: '1234567890',
      dateOfBirth: 'January 15, 2000',
      profileImage: null,
      expanded: false 
    },
    { 
      id: 2, 
      name: 'Ahsan Ali', 
      age: '26', 
      conditions: 'Kidney Stone',
      relationship: 'Brother',
      gender: 'Male',
      contact: '0987654321',
      dateOfBirth: 'March 20, 1995',
      profileImage: null,
      expanded: false 
    },
    { 
      id: 3, 
      name: 'Umer Bashir', 
      age: '22', 
      conditions: 'Non',
      relationship: 'Myself',
      gender: 'Male',
      contact: '1122334455',
      dateOfBirth: 'July 10, 2000',
      profileImage: null,
      expanded: false 
    },
  ]);

  // Modal states
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Edit form state - Like Addnewmember
  const [editFullName, setEditFullName] = useState('');
  const [editDateOfBirth, setEditDateOfBirth] = useState('');
  const [editRelationship, setEditRelationship] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [editConditions, setEditConditions] = useState('');

  // Modal states for dropdowns
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const relationships = ['Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter', 'Husband', 'Wife', 'Friend', 'Other'];
  const genders = ['Male', 'Female', 'Other'];

  // Toggle profile expansion
  const toggleExpand = (id) => {
    setProfiles(profiles.map(profile => 
      profile.id === id 
        ? { ...profile, expanded: !profile.expanded }
        : profile
    ));
  };

  // Delete profile
  const deleteProfile = (id) => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete this profile?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            setProfiles(profiles.filter(profile => profile.id !== id));
            setShowOptionsModal(false);
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Edit profile - Load data into edit form
  const editProfile = () => {
    if (selectedProfile) {
      setEditFullName(selectedProfile.name);
      setEditDateOfBirth(selectedProfile.dateOfBirth);
      setEditRelationship(selectedProfile.relationship);
      setEditGender(selectedProfile.gender);
      setEditContact(selectedProfile.contact);
      setEditProfileImage(selectedProfile.profileImage);
      setEditConditions(selectedProfile.conditions);
      setShowOptionsModal(false);
      setShowEditModal(true);
    }
  };

  // Date picker handler
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setEditDateOfBirth(formattedDate);
    }
    setShowDatePicker(false);
  };

  // Image picker functions
  const openGallery = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setEditProfileImage(response.assets[0].uri);
        Alert.alert('Success', 'Profile picture selected!');
      }
    });
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchCamera(options, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setEditProfileImage(response.assets[0].uri);
        Alert.alert('Success', 'Photo captured!');
      }
    });
  };

  const handleProfileUpload = () => {
    Alert.alert('Upload Profile Picture', 'Choose an option', [
      { text: '📸 Take Photo', onPress: openCamera },
      { text: '🖼️ Choose from Gallery', onPress: openGallery },
      { text: '🗑️ Remove', onPress: () => setEditProfileImage(null) },
      { text: '❌ Cancel', style: 'cancel' }
    ]);
  };

  // Save edited profile
  const saveEdit = () => {
    if (editFullName && editDateOfBirth && editRelationship && editGender && editContact) {
      setProfiles(profiles.map(profile =>
        profile.id === selectedProfile.id
          ? {
              ...profile,
              name: editFullName,
              age: calculateAge(editDateOfBirth),
              dateOfBirth: editDateOfBirth,
              relationship: editRelationship,
              gender: editGender,
              contact: editContact,
              profileImage: editProfileImage,
              conditions: editConditions || 'Non'
            }
          : profile
      ));
      setShowEditModal(false);
      setSelectedProfile(null);
      resetEditForm();
    } else {
      Alert.alert('Error', 'Please fill all required fields');
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  // Reset edit form
  const resetEditForm = () => {
    setEditFullName('');
    setEditDateOfBirth('');
    setEditRelationship('');
    setEditGender('');
    setEditContact('');
    setEditProfileImage(null);
    setEditConditions('');
  };

  // Navigate to Addrx
  const goToAddRx = () => {
    navigation.navigate('Addrx');
  };

  // Navigate to Addnewmember
  const goToAddNewMember = () => {
    navigation.navigate('AddNewMember');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PHR</Text>
        <TouchableOpacity style={styles.addButton} onPress={goToAddNewMember}>
          <Plus color="#00C874" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.profileCard}>
            {/* Main profile row */}
            <TouchableOpacity 
              style={styles.profileRow}
              onPress={() => toggleExpand(profile.id)}
              activeOpacity={0.7}
            >
              <View style={styles.profileInfo}>
                <View style={styles.avatar}>
                  {profile.profileImage ? (
                    <Image source={{ uri: profile.profileImage }} style={styles.avatarImage} />
                  ) : (
                    <User color="#00C874" size={24} />
                  )}
                </View>
                <View style={styles.profileDetails}>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <Text style={styles.profileMeta}>
                    Age: {profile.age} • {profile.relationship}
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.moreButton}
                onPress={() => {
                  setSelectedProfile(profile);
                  setShowOptionsModal(true);
                }}
              >
                <MoreVertical color="#666" size={20} />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Expanded details */}
            {profile.expanded && (
              <View style={styles.expandedDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Conditions:</Text>
                  <Text style={styles.detailValue}>{profile.conditions}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Age:</Text>
                  <Text style={styles.detailValue}>{profile.age} years</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date of Birth:</Text>
                  <Text style={styles.detailValue}>{profile.dateOfBirth}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gender:</Text>
                  <Text style={styles.detailValue}>{profile.gender}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Contact:</Text>
                  <Text style={styles.detailValue}>{profile.contact}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Relationship:</Text>
                  <Text style={styles.detailValue}>{profile.relationship}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Options Modal (Delete/Edit) */}
      <Modal visible={showOptionsModal} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptionsModal(false)}
        >
          <View style={styles.optionsModal}>
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={editProfile}
            >
              <Edit2 color="#00C874" size={20} />
              <Text style={styles.optionText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionItem, styles.deleteOption]}
              onPress={() => deleteProfile(selectedProfile?.id)}
            >
              <Trash2 color="#ff4444" size={20} />
              <Text style={styles.deleteText}>Delete Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Edit Profile Modal - Like Addnewmember */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <View style={styles.editHeader}>
              <Text style={styles.editTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <ChevronLeft color="#666" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.editForm}>
              {/* Profile Picture */}
              <View style={styles.profileSection}>
                <TouchableOpacity style={styles.profileCircle} onPress={handleProfileUpload}>
                  {editProfileImage ? (
                    <Image source={{ uri: editProfileImage }} style={styles.profileImage} />
                  ) : (
                    <User color="#00C874" size={40} />
                  )}
                  <View style={styles.cameraIcon}>
                    <Camera color="white" size={14} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.uploadText}>Tap to upload photo</Text>
              </View>

              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Enter Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={editFullName}
                  onChangeText={setEditFullName}
                />
              </View>

              {/* Date of Birth */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date of Birth *</Text>
                <TouchableOpacity 
                  style={styles.inputWithIcon}
                  onPress={() => setShowDatePicker(true)}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Select Date"
                    value={editDateOfBirth}
                    editable={false}
                  />
                  <Calendar color="#00C874" size={20} />
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}

              {/* Relationship */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select Relationship *</Text>
                <TouchableOpacity 
                  style={styles.inputWithIcon}
                  onPress={() => setShowRelationshipModal(true)}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Relationship"
                    value={editRelationship}
                    editable={false}
                  />
                  <ChevronDown color="#00C874" size={20} />
                </TouchableOpacity>
              </View>

              {/* Gender */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select Gender *</Text>
                <TouchableOpacity 
                  style={styles.inputWithIcon}
                  onPress={() => setShowGenderModal(true)}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    value={editGender}
                    editable={false}
                  />
                  <ChevronDown color="#00C874" size={20} />
                </TouchableOpacity>
              </View>

              {/* Conditions */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Medical Conditions</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Acne, Kidney Stone"
                  value={editConditions}
                  onChangeText={setEditConditions}
                />
              </View>

              {/* Contact */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contact *</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={editContact}
                    onChangeText={setEditContact}
                    keyboardType="phone-pad"
                  />
                  <Phone color="#00C874" size={20} />
                </View>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
              {relationships.map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.modalItem}
                  onPress={() => {
                    setEditRelationship(item);
                    setShowRelationshipModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
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
                    setEditGender(item);
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
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 14,
    color: '#666',
  },
  moreButton: {
    padding: 8,
  },
  expandedDetails: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    width: 90,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    width: '60%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  deleteOption: {
    borderBottomWidth: 0,
  },
  deleteText: {
    fontSize: 16,
    color: '#ff4444',
  },
  editModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '90%',
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editForm: {
    flexGrow: 1,
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
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: '80%',
    maxHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
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
  saveButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});