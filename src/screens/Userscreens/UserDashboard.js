import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Plus, 
  FileText, 
  Users, 
} from 'lucide-react-native';

const UserDashboard = ({ navigation, userId,name}) => {
  
 // Testing ke liye 'Ali' likha hai

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          
          {/* --- Header Area --- */}
          <View style={styles.header}>
            <Text style={styles.greetingText}>
              Salam, <Text style={styles.userName}>{name}</Text>
            </Text>
            {/* ID yahan nazar aayegi */}
            <Text style={{color: 'gray', fontSize: 12}}>ID: {userId ? userId : "Not Found"}</Text>
          </View>

          {/* --- Search Bar --- */}
          <View style={styles.searchContainer}>
            <Search color="#999" size={20} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search Medicine, Store" 
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>

          {/* --- Action Buttons --- */}
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.actionBtnWrapper} 
              onPress={() => navigation.navigate('AddrX')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E8F9F1' }]}>
                <Plus color="#00C874" size={24} />
              </View>
              <Text style={styles.btnText}>Add Rx</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionBtnWrapper} 
              onPress={() => navigation.navigate('Phr')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E8F9F1' }]}>
                <FileText color="#00C874" size={24} />
              </View>
              <Text style={styles.btnText}>Add PHR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnWrapper}>
              <View style={[styles.iconCircle, { backgroundColor: '#E8F9F1' }]}>
                <Users color="#00C874" size={24} />
              </View>
              <Text style={styles.btnText}>Add Member</Text>
            </TouchableOpacity>
          </View>

          {/* --- Recent Orders Section --- */}
          <View style={styles.recentOrdersSection}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <View style={styles.orderPlaceholder}>
                <Text style={{color: '#999'}}>No orders for ID: {userId}</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollView: { paddingBottom: 20 },
  container: { paddingHorizontal: 20 },
  header: { marginTop: 20, marginBottom: 15 },
  greetingText: { fontSize: 22, color: '#00C874', fontWeight: '400' },
  userName: { fontWeight: 'bold', color: '#333' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  actionBtnWrapper: { alignItems: 'center', width: '30%' },
  iconCircle: {
    width: 60, height: 60, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  btnText: { fontSize: 13, fontWeight: '600', color: '#333' },
  recentOrdersSection: { marginTop: 10 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 15 },
  orderPlaceholder: { 
    height: 100, backgroundColor: '#f9f9f9', borderRadius: 10, 
    justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' 
  }
});

export default UserDashboard;