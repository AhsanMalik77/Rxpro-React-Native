import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft,
  User,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Edit
} from 'lucide-react-native';

export default function ProfileScreen({ navigation }) {
  // User data
  const userData = {
    name: 'Ibtisam Ali',
    age: '21',
    email: 'alibtisam28@gmail.com',
    contact: '+92 3345133424',
    address: 'Sixth Road, Rawalpindi'
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
            navigation.navigate('SignIn');
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleChangePassword = () => {
    navigation.navigate('Changep')
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutHeaderButton}>
          <LogOut color="#ff4444" size={22} />
          <Text style={styles.logoutHeaderText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Avatar and Name */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="#00C874" size={50} />
            </View>
          </View>
          <View style={{flexDirection:'row', alignItems:'center',margin:1}}>
           <Text style={[styles.userName, { marginRight: 8 }]}>{userData.name}</Text>
           <TouchableOpacity onPress={()=>navigation.navigate('Editprofilee')}>
         <Edit color="#00C874" size={22} />
         </TouchableOpacity>
          </View>
         
        </View>

        {/* Info Sections */}
        <View style={styles.infoSection}>
          {/* Age */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Calendar color="#00C874" size={22} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{userData.age}</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Mail color="#00C874" size={22} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
          </View>

          {/* Contact */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Phone color="#00C874" size={22} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Contact</Text>
              <Text style={styles.infoValue}>{userData.contact}</Text>
            </View>
          </View>

          {/* Address */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MapPin color="#00C874" size={22} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{userData.address}</Text>
            </View>
          </View>
        </View>

        {/* Change Password Button */}
        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Lock color="#00C874" size={22} />
          <Text style={styles.changePasswordText}>Change Password</Text>
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
  logoutHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 8,
  },
  logoutHeaderText: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: '500',
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
  avatarContainer: {
    marginBottom: 12,
    
      
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
   
    
  },
  infoSection: {
    gap: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 25,
    padding: 16,
    marginTop: 10,
  },
  changePasswordText: {
    fontSize: 16,
    color: '#00C874',
    fontWeight: '600',
  },
});