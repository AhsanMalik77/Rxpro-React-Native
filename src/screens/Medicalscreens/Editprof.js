import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Lucide icons
import { ChevronLeft, Edit3, MapPin, FolderOpen } from 'lucide-react-native';

export default function EditProfile({ route, navigation }) {
  // Medicalprof se bheja gaya data nikalna
  const { currentData, onUpdate } = route.params;

  // Local state for editing
  const [name, setName] = useState(currentData.name);
  const [address, setAddress] = useState(currentData.address);

  const handleSave = () => {
    // Wapis data bhejna
    onUpdate({
      ...currentData,
      name: name,
      address: address,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#1A2E44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Store Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentData.image }} style={styles.storeImage} />
        </View>

        <View style={styles.formContainer}>
          {/* Store Name Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Store Name"
            />
            <Edit3 size={20} color="#00D084" />
          </View>

          {/* Location Section */}
          <Text style={styles.label}>Where is Store Located?</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Store Location"
            />
            <MapPin size={20} color="#00D084" />
          </View>

          {/* Browse Images Section */}
          <View style={styles.browseSection}>
            <Text style={styles.label}>Store Images</Text>
            <View style={styles.imagePickerRow}>
              <Image 
                source={{ uri: currentData.image }} 
                style={styles.thumbnail} 
              />
              <TouchableOpacity style={styles.browseBtn}>
                <Text style={styles.browseText}>Browse</Text>
                <FolderOpen size={20} color="#00D084" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A2E44',
  },
  imageContainer: {
    width: '100%',
    height: 220,
  },
  storeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    padding: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  browseSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  imagePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  browseText: {
    fontSize: 16,
    color: '#999',
    marginRight: 10,
  },
  saveBtn: {
    backgroundColor: '#00D084',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00D084',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});