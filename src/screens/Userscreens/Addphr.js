import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, User, Minus, ChevronDown } from 'lucide-react-native';

export default function PhrScreen({ navigation }) {
  // ALL HOOKS AT THE TOP
  const [selectedProfile, setSelectedProfile] = useState('Ahsan Ali');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Allergies state
  const [allergies, setAllergies] = useState([
    { id: 1, name: 'Acne' },
  ]);
  
  // Medical history state
  const [medicalHistory, setMedicalHistory] = useState([
    { id: 1, name: 'BP' },
  ]);
  
  // Medicines state
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Proponol' },
  ]);

  // UI state
  const [showAllergyInput, setShowAllergyInput] = useState(false);
  const [showMedicalInput, setShowMedicalInput] = useState(false);
  const [showMedicineInput, setShowMedicineInput] = useState(false);
  
  // Input state
  const [newAllergyName, setNewAllergyName] = useState('');
  const [newMedicalName, setNewMedicalName] = useState('');
  const [newMedicineName, setNewMedicineName] = useState('');

  const profiles = ['Ahsan Ali', 'Sister', 'Brother', 'Mother', 'Father'];

  // Delete functions
  const deleteAllergy = (id) => {
    setAllergies(allergies.filter(item => item.id !== id));
  };

  const deleteMedical = (id) => {
    setMedicalHistory(medicalHistory.filter(item => item.id !== id));
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter(item => item.id !== id));
  };

  // Add functions
  const addAllergy = () => {
    if (newAllergyName) {
      setAllergies([...allergies, {
        id: Date.now(),
        name: newAllergyName
      }]);
      setNewAllergyName('');
      setShowAllergyInput(false);
    }
  };

  const addMedicalHistory = () => {
    if (newMedicalName) {
      setMedicalHistory([...medicalHistory, {
        id: Date.now(),
        name: newMedicalName
      }]);
      setNewMedicalName('');
      setShowMedicalInput(false);
    }
  };

  const addMedicine = () => {
    if (newMedicineName) {
      setMedicines([...medicines, {
        id: Date.now(),
        name: newMedicineName
      }]);
      setNewMedicineName('');
      setShowMedicineInput(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add PHR</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select Profile - Dropdown Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Profile</Text>
          <TouchableOpacity 
            style={styles.profileDropdown}
            onPress={() => setShowProfileDropdown(true)}
          >
            <View style={styles.profileDropdownContent}>
              <User color="#00C874" size={20} />
              <Text style={styles.profileDropdownText}>{selectedProfile}</Text>
            </View>
            <ChevronDown color="#666" size={20} />
          </TouchableOpacity>
        </View>

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

        {/* Allergies Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Allergies, Acne etc.</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAllergyInput(true)}
            >
              <Plus color="#00C874" size={20} />
            </TouchableOpacity>
          </View>

          {showAllergyInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Allergy name"
                placeholderTextColor="#999"
                value={newAllergyName}
                onChangeText={setNewAllergyName}
              />
              <View style={styles.inputButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={addAllergy}>
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setShowAllergyInput(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {allergies.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteAllergy(item.id)}
              >
                <Minus color="#fff" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Medical History Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medical History, Sugar, etc</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowMedicalInput(true)}
            >
              <Plus color="#00C874" size={20} />
            </TouchableOpacity>
          </View>

          {showMedicalInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Medical condition name"
                placeholderTextColor="#999"
                value={newMedicalName}
                onChangeText={setNewMedicalName}
              />
              <View style={styles.inputButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={addMedicalHistory}>
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setShowMedicalInput(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {medicalHistory.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteMedical(item.id)}
              >
                <Minus color="#fff" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Medicines Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Any Already Taking Medicine</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowMedicineInput(true)}
            >
              <Plus color="#00C874" size={20} />
            </TouchableOpacity>
          </View>

          {showMedicineInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Medicine name"
                placeholderTextColor="#999"
                value={newMedicineName}
                onChangeText={setNewMedicineName}
              />
              <View style={styles.inputButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={addMedicine}>
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setShowMedicineInput(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {medicines.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteMedicine(item.id)}
              >
                <Minus color="#fff" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveMainButton}>
          <Text style={styles.saveMainButtonText}>Save</Text>
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
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  profileDropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileDropdownText: {
    fontSize: 16,
    color: '#333',
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
  inputContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  inputButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#00C874',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 15,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveMainButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  saveMainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});