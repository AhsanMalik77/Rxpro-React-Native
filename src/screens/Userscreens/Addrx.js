import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Image,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  User, 
  MapPin, 
  Camera,
  Search,
  AlertTriangle,
  X,
  Image as ImageIcon,
  Plus
} from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Addrx({ navigation }) {
  // State
  const [selectedProfile, setSelectedProfile] = useState('Ahsan Ali');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [location, setLocation] = useState('');
  
  // Medicine state
  const [medicineName, setMedicineName] = useState('');
  const [potency, setPotency] = useState('');
  const [medicines, setMedicines] = useState([]);
  
  // Image state
  const [rxImages, setRxImages] = useState([]);
  
  // Search suggestions (dummy medicine list)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const medicineSuggestions = [
    'Paracetamol',
    'Ibuprofen',
    'Amoxicillin',
    'Pantoprazole',
    'Pamidronate',
    'Metformin',
    'Aspirin',
    'Omeprazole'
  ];

  // Filtered suggestions based on input
  const filteredSuggestions = medicineSuggestions.filter(item =>
    item.toLowerCase().includes(medicineName.toLowerCase())
  );

  // Show interactions when search is pressed
  const [showInteractions, setShowInteractions] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const profiles = ['Ahsan Ali', 'Sister', 'Brother', 'Mother', 'Father'];

  // Image picker functions
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 0, // 0 means unlimited
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.error) {
        Alert.alert('Error', response.error);
      } else if (response.assets) {
        const newImages = response.assets.map(asset => asset.uri);
        setRxImages([...rxImages, ...newImages]);
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.error) {
        Alert.alert('Error', response.error);
      } else if (response.assets && response.assets[0]) {
        setRxImages([...rxImages, response.assets[0].uri]);
      }
    });
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Add Prescription Image',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: openCamera },
        { text: 'Choose from Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const removeImage = (index) => {
    setRxImages(rxImages.filter((_, i) => i !== index));
  };

  // Add medicine function
  const addMedicine = () => {
    if (medicineName && potency) {
      setMedicines([...medicines, {
        id: Date.now(),
        name: medicineName,
        dosage: potency,
        quantity: 'x1'
      }]);
      setMedicineName('');
      setPotency('');
      setShowSuggestions(false);
    } else {
      Alert.alert('Error', 'Please enter both medicine name and potency');
    }
  };

  // Remove medicine
  const removeMedicine = (id) => {
    setMedicines(medicines.filter(item => item.id !== id));
  };

  // Handle search
  const handleSearch = () => {
    if (medicines.length > 0) {
      setShowInteractions(true);
    } else {
      Alert.alert('No Medicines', 'Please add at least one medicine');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter Prescription Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select Profile */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Select Profile</Text>
          <TouchableOpacity 
            style={styles.field}
            onPress={() => setShowProfileDropdown(true)}
          >
            <Text style={styles.fieldText}>{selectedProfile}</Text>
            <User color="#00C874" size={20} />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              placeholder="Enter location"
              placeholderTextColor="#999"
              value={location}
              onChangeText={setLocation}
            />
            <MapPin color="#00C874" size={20} />
          </View>
        </View>

        {/* RX Picture - Multiple Images */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>RX Picture</Text>
          <TouchableOpacity style={styles.field} onPress={handleImageUpload}>
            <Text style={styles.fieldText}>
              {rxImages.length > 0 ? `${rxImages.length} image(s) selected` : 'Upload pictures'}
            </Text>
            <Camera color="#00C874" size={20} />
          </TouchableOpacity>
          
          {/* Image Preview */}
          {rxImages.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
              {rxImages.map((uri, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <X color="#fff" size={12} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Medicine Name with Suggestions */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medicine Name</Text>
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              placeholder="Enter medicine name"
              placeholderTextColor="#999"
              value={medicineName}
              onChangeText={(text) => {
                setMedicineName(text);
                setShowSuggestions(text.length > 0);
              }}
            />
          </View>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredSuggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setMedicineName(item);
                    setShowSuggestions(false);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Potency / ml */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Potency / ml</Text>
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              placeholder="e.g., 200mg"
              placeholderTextColor="#999"
              value={potency}
              onChangeText={setPotency}
            />
          </View>
        </View>

        {/* Add Medicine Button */}
        <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
          <Plus color="#fff" size={20} />
          <Text style={styles.addButtonText}>Add Medicine</Text>
        </TouchableOpacity>

        {/* Medicines List */}
        {medicines.length > 0 && (
          <View style={styles.medicinesContainer}>
            <Text style={styles.medicinesTitle}>Added Medicines:</Text>
            {medicines.map((item) => (
              <View key={item.id} style={styles.medicineItem}>
                <Text style={styles.medicineText}>
                  {item.name} {item.dosage} {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => removeMedicine(item.id)}>
                  <X color="#ff4444" size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Search color="#fff" size={20} />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Interactions Section - Shows when search is pressed */}
        {showInteractions && (
          <View style={styles.interactionsSection}>
            <View style={styles.warningHeader}>
              <AlertTriangle color="#ff4444" size={24} />
              <Text style={styles.warningTitle}>High-Risk Interaction Detected!</Text>
            </View>
            <Text style={styles.warningSubtitle}>Based on Your PHR and selected Medicines</Text>

            <View style={styles.warningItem}>
              <Text style={styles.warningNumber}>1.</Text>
              <Text style={styles.warningText}>
                Do not mix Paracetamol + Ibuprofen without doctor advice. Both are painkillers that can harm stomach and kidneys if overdosed.
              </Text>
            </View>

            <View style={styles.warningItem}>
              <Text style={styles.warningNumber}>2.</Text>
              <Text style={styles.warningText}>
                Paracetamol is risky for liver patients. Can cause liver damage. Ask your doctor first.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.understandButton}
              onPress={() => setShowRiskModal(true)}
            >
              <Text style={styles.understandButtonText}>I Understand the Risk (Search)</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Profile Dropdown Modal */}
      <Modal visible={showProfileDropdown} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowProfileDropdown(false)}
        >
          <View style={styles.modalContent}>
            {profiles.map((profile, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalItem,
                  selectedProfile === profile && styles.modalItemActive
                ]}
                onPress={() => {
                  setSelectedProfile(profile);
                  setShowProfileDropdown(false);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  selectedProfile === profile && styles.modalItemTextActive
                ]}>{profile}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Risk Acknowledgement Modal */}
      <Modal visible={showRiskModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.riskModalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowRiskModal(false)}
            >
              <X color="#666" size={24} />
            </TouchableOpacity>
            
            <AlertTriangle color="#ff4444" size={50} />
            <Text style={styles.riskModalTitle}>Risk Acknowledged</Text>
            <Text style={styles.riskModalText}>
              You have acknowledged the risks. Please consult your doctor before taking these medications.
            </Text>
            
            <TouchableOpacity 
              style={styles.riskModalButton}
              onPress={() => {
                setShowRiskModal(false);
                setShowInteractions(false);
              }}
            >
              <Text style={styles.riskModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 0,
  },
  fieldText: {
    fontSize: 16,
    color: '#333',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imagePreviewWrapper: {
    position: 'relative',
    marginRight: 10,
    marginTop:15
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 5,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C874',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  medicinesContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  medicinesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  medicineText: {
    fontSize: 15,
    color: '#333',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C874',
    borderRadius: 25,
    padding: 16,
    gap: 8,
    marginBottom: 25,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  interactionsSection: {
    backgroundColor: '#fff3f3',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4444',
    flex: 1,
  },
  warningSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  warningItem: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  warningNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff4444',
    width: 25,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  understandButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  understandButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: '80%',
    maxHeight: 400,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemActive: {
    backgroundColor: '#E8F5E9',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalItemTextActive: {
    color: '#00C874',
    fontWeight: '600',
  },
  riskModalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  riskModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  riskModalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  riskModalButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  riskModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});