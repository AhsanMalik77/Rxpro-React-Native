import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
// SafeAreaView ke liye ye library use karein (FYP ke liye yahi best hai)
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit3, Trash2, Plus, Home, User, Store, Package } from 'lucide-react-native';

const RIDERS_DATA = [
  {
    id: '1',
    name: 'Ahsan Ali',
    age: '22 years old',
    vehicle: 'AK-47',
    address: 'Street 295, kalma chowk, Kalar Kahar',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Taha Sohail',
    age: '23 years old',
    vehicle: 'AEA-757',
    address: 'Street 4, Kiyani Road, Tench bhatta, Rawalpindi',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Umer Bashir',
    age: '23 years old',
    vehicle: 'SOS-1122',
    address: 'Street 999, Mushtaq chowk, Ishtiyar Colony, Kahuta',
    image: 'https://via.placeholder.com/150',
  },
];

export default function MedicalRider({ navigation }) {
  
  const renderRiderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity><Edit3 size={20} color="#00D084" style={styles.icon} /></TouchableOpacity>
              <TouchableOpacity><Trash2 size={20} color="#FF6B6B" style={styles.icon} /></TouchableOpacity>
            </View>
          </View>
          <Text style={styles.detailText}>{item.age}</Text>
          <Text style={styles.detailText}>Vehicle no <Text style={styles.vehicleText}>{item.vehicle}</Text></Text>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ChevronLeft size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riders</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={RIDERS_DATA}
        renderItem={renderRiderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
        <Plus size={35} color="white" strokeWidth={3} />
      </TouchableOpacity>


       
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
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A2E44',
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFF9F9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  detailText: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  vehicleText: {
    color: '#00D084',
    fontWeight: 'bold',
  },
  addressText: {
    color: '#777',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 90,
    backgroundColor: '#00D084',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  bottomTab: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
});