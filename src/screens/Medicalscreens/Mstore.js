import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, LogOut, Edit3, Star, Home, Lock } from 'lucide-react-native';

export default function Medicalprof({ navigation }) {
  // State banayi hai taake EditProfile se data yaha update ho sakay
  const [profileData, setProfileData] = useState({
    name: 'Mb-Meds',
    address: 'g/6-2, Islamabad',
    image: 'https://images.adsttc.com/media/images/5e1d/02c3/3312/fd58/9c00/06e9/large_jpg/002.jpg',
    rating: '4.9',
    reviews: '103'
  });

  // Ye function EditProfile se naya data laaye ga
  const handleUpdate = (updatedData) => {
    setProfileData(updatedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ChevronLeft size={28} color="#1A2E44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut size={20} color="#E74C3C" style={{ marginRight: 5 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Single Image Section (No Slider) */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: profileData.image }} style={styles.storeImage} />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.storeName}>{profileData.name}</Text>
            {/* Pencil icon par navigation aur data passing */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('EditProfile', { 
                currentData: profileData,
                onUpdate: handleUpdate // Callback function
              })}
            >
              <Edit3 size={24} color="#00D084" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>{profileData.rating}</Text>
            <Star size={16} color="#F1C40F" fill="#F1C40F" style={{ marginHorizontal: 4 }} />
            <Text style={styles.reviewText}>({profileData.reviews})  •  {profileData.address}  •</Text>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.iconCircle}><Home size={22} color="#00D084" /></View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Address</Text>
                <Text style={styles.menuSubtitle}>{profileData.address}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.iconCircle}><Lock size={22} color="#00D084" /></View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitleTextOnly}>Change Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1A2E44' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center' },
  logoutText: { fontSize: 16, color: '#333' },
  imageContainer: { width: '100%', height: 250 },
  storeImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  infoSection: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { fontSize: 32, fontWeight: 'bold', color: '#1A2E44' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { fontSize: 18, fontWeight: 'bold', color: '#F1C40F' },
  reviewText: { fontSize: 14, color: '#999', marginLeft: 5 },
  menuContainer: { marginTop: 40 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  iconCircle: { width: 45, height: 45, borderRadius: 12, borderWidth: 1.5, borderColor: '#00D084', justifyContent: 'center', alignItems: 'center' },
  menuTextContainer: { marginLeft: 15 },
  menuTitle: { fontSize: 18, fontWeight: 'bold' },
  menuSubtitle: { fontSize: 14, color: '#666' },
  menuTitleTextOnly: { fontSize: 18, fontWeight: '600' }
});