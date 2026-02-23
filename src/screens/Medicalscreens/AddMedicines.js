import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronDown, Calendar, Beaker, Plus, Minus } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddMedicines({ navigation }) {
  // ✅ ALL HOOKS AT THE TOP - SAME ORDER EVERY RENDER
  const [medicineName, setMedicineName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [formula, setFormula] = useState('');
  const [type, setType] = useState('Syrup');
  const [dosage, setDosage] = useState('250');
  const [quantity, setQuantity] = useState('250');
  const [price, setPrice] = useState('230');

  // UI state hooks
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMedicineOptions, setShowMedicineOptions] = useState(false);
  const [showFormulaOptions, setShowFormulaOptions] = useState(false);
  
  // Date state
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ CONSTANTS - Not hooks, safe anywhere
  const medicineOptions = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Metformin'];
  const formulaOptions = ['C8H9NO2', 'C13H18O2', 'C16H19N3O5S'];

  // ✅ ALL FUNCTIONS AFTER HOOKS
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setExpiryDate(formattedDate);
      setSelectedDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleAdd = () => {
    alert('Medicine Added Successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Medicine</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medicine Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medicine Name</Text>
          <TouchableOpacity 
            style={styles.inputWrapper}
            onPress={() => setShowMedicineOptions(!showMedicineOptions)}
          >
            <TextInput
              style={styles.input}
              placeholder="Select medicine"
              placeholderTextColor="#999"
              value={medicineName}
              editable={false}
            />
            <ChevronDown color="#00D98E" size={20} />
          </TouchableOpacity>
          
          {showMedicineOptions && (
            <View style={styles.optionsContainer}>
              {medicineOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    setMedicineName(item);
                    setShowMedicineOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date of Expiry */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Expiry</Text>
          <TouchableOpacity 
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <Calendar color="#00D98E" size={20} />
            <TextInput
              style={[styles.input, { marginLeft: 10 }]}
              placeholder="Select expiry date"
              placeholderTextColor="#999"
              value={expiryDate}
              editable={false}
            />
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Formula */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Formula</Text>
          <TouchableOpacity 
            style={styles.inputWrapper}
            onPress={() => setShowFormulaOptions(!showFormulaOptions)}
          >
            <Beaker color="#00D98E" size={20} />
            <TextInput
              style={[styles.input, { marginLeft: 10 }]}
              placeholder="Select formula"
              placeholderTextColor="#999"
              value={formula}
              editable={false}
            />
            <ChevronDown color="#00D98E" size={20} />
          </TouchableOpacity>
          
          {showFormulaOptions && (
            <View style={styles.optionsContainer}>
              {formulaOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    setFormula(item);
                    setShowFormulaOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Type - Radio Buttons */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeOptions}>
            <TouchableOpacity 
              style={styles.typeOption}
              onPress={() => setType('Syrup')}
            >
              <View style={[styles.radio, type === 'Syrup' && styles.radioSelected]}>
                {type === 'Syrup' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.typeOptionText, type === 'Syrup' && styles.typeOptionTextSelected]}>Syrup</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.typeOption}
              onPress={() => setType('Pill')}
            >
              <View style={[styles.radio, type === 'Pill' && styles.radioSelected]}>
                {type === 'Pill' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.typeOptionText, type === 'Pill' && styles.typeOptionTextSelected]}>Pill</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.typeOption}
              onPress={() => setType('Other')}
            >
              <View style={[styles.radio, type === 'Other' && styles.radioSelected]}>
                {type === 'Other' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.typeOptionText, type === 'Other' && styles.typeOptionTextSelected]}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dosage */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Dosage (mg if applicable)</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setDosage((parseInt(dosage) - 10).toString())}
            >
              <Minus color="#00D98E" size={20} />
            </TouchableOpacity>
            <TextInput
              style={styles.counterInput}
              value={dosage}
              onChangeText={setDosage}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setDosage((parseInt(dosage) + 10).toString())}
            >
              <Plus color="#00D98E" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Quantity</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setQuantity((parseInt(quantity) - 10).toString())}
            >
              <Minus color="#00D98E" size={20} />
            </TouchableOpacity>
            <TextInput
              style={styles.counterInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setQuantity((parseInt(quantity) + 10).toString())}
            >
              <Plus color="#00D98E" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Price */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Price (Rs/Piece)</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setPrice((parseInt(price) - 10).toString())}
            >
              <Minus color="#00D98E" size={20} />
            </TouchableOpacity>
            <TextInput
              style={styles.counterInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setPrice((parseInt(price) + 10).toString())}
            >
              <Plus color="#00D98E" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
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
    borderRadius: 8,
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
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 5,
    maxHeight: 200,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  typeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#00D98E',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00D98E',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#666',
  },
  typeOptionTextSelected: {
    color: '#00D98E',
    fontWeight: '500',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  counterButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#00D98E',
    borderRadius: 8,
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