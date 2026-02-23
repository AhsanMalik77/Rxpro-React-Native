import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { MapPin, Eye, EyeOff, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreSignUpForm = () => {
  const [storeName, setStoreName] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [storeImages, setStoreImages] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets[0]) {
        setStoreImages([...storeImages, response.assets[0]]);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Store Name */}
        <TextInput
          style={styles.input}
          placeholder="Store Name"
          placeholderTextColor="#BDBDBD"
          value={storeName}
          onChangeText={setStoreName}
        />

        {/* Store Location */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.flexInput}
            placeholder="Store Location"
            placeholderTextColor="#BDBDBD"
            value={storeLocation}
            onChangeText={setStoreLocation}
          />
          <MapPin size={22} color="#00D98E" style={styles.icon} />
        </View>

        {/* Store Images Selection */}
        <View style={styles.imageSection}>
          <View style={[styles.inputContainer, { flex: 1, marginBottom: 0 }]}>
            <Text style={styles.placeholderText}>
              {storeImages.length > 0 ? "" : "Store Images"}
            </Text>
            {storeImages.length > 0 && (
              <Image 
                source={{ uri: storeImages[storeImages.length - 1].uri }} 
                style={styles.inlinePreview} 
              />
            )}
          </View>
          <TouchableOpacity style={styles.plusButton} onPress={handlePickImage}>
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Password */}
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

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>

      </View>
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
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 60,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
  },
  inputContainer: {
    height: 60,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  flexInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  placeholderText: {
    flex: 1,
    color: '#BDBDBD',
    fontSize: 16,
  },
  inlinePreview: {
    width: 50,
    height: 40,
    borderRadius: 6,
  },
  plusButton: {
    width: 60,
    height: 60,
    backgroundColor: '#00C874',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  submitButton: {
    backgroundColor: '#00C874',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  }
});

export default StoreSignUpForm;