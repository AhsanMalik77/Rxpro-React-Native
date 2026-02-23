import React, { useState } from 'react'; // useState add kiya
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search, Plus, Minus } from 'lucide-react-native';

export default function Medicalstock({ navigation }) {
  // Initial Data State mein rakha hai taake update ho sakay
  const [stockList, setStockList] = useState([
    {
      id: '1',
      name: 'Paracetamol - 500mg',
      type: 'Pill',
      expiry: '24-02-25',
      count: 150, // Number mein rakha hai
      unit: 'Blister packs',
      price: '150 Rs',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Amoxicillin - 250mg',
      type: 'Syrup',
      expiry: '24-03-25',
      count: 150,
      unit: 'Bottles',
      price: '130 Rs',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      name: 'Insulin glargine pen',
      type: 'Refrigerated biological drug',
      expiry: '01-01-26',
      count: 5,
      unit: 'units',
      price: '450',
      image: 'https://via.placeholder.com/100',
    },
  ]);

  // Function: Stock Barhanay ke liye
  const incrementStock = (id) => {
    setStockList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Function: Stock Kam karnay ke liye
  const decrementStock = (id) => {
    setStockList(prevList =>
      prevList.map(item =>
        item.id === id && item.count > 0 
          ? { ...item, count: item.count - 1 } 
          : item
      )
    );
  };

  const renderStockItem = ({ item }) => {
    // Dynamic Status check
    const isLow = item.count < 10;

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Image source={{ uri: item.image }} style={styles.medicineImage} />
          
          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.medicineName}>{item.name}</Text>
              <View style={styles.counterContainer}>
                {/* Plus Button */}
                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => incrementStock(item.id)}
                >
                  <Plus size={18} color="white" />
                </TouchableOpacity>
                
                {/* Minus Button */}
                <TouchableOpacity 
                  style={[styles.counterBtn, { backgroundColor: '#00D084' }]} 
                  onPress={() => decrementStock(item.id)}
                >
                  <Minus size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.infoLabel}>Type: <Text style={styles.infoValue}>{item.type}</Text></Text>
            <Text style={styles.infoLabel}>Expiry: <Text style={styles.infoValue}>{item.expiry}</Text></Text>
            {/* Updated Count Display */}
            <Text style={styles.infoLabel}>Current Stock: <Text style={styles.infoValue}>{item.count} {item.unit}</Text></Text>
            <Text style={styles.infoLabel}>Price/Piece: <Text style={styles.infoValue}>{item.price}</Text></Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statusRow}>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: isLow ? '#FFEBEB' : '#E6F9F2' }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: isLow ? '#FF6B6B' : '#00D084' }
            ]}>
              {isLow ? 'Low Stock' : 'In Stock'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ChevronLeft size={28} color="#1A2E44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stock Management</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search Medicine" 
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={stockList}
        renderItem={renderStockItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A2E44' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F5', marginHorizontal: 20, borderRadius: 25, paddingHorizontal: 15, height: 50, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
  cardTopRow: { flexDirection: 'row' },
  medicineImage: { width: 80, height: 60, borderRadius: 8, backgroundColor: '#f9f9f9', resizeMode: 'contain' },
  detailsContainer: { flex: 1, marginLeft: 15 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  medicineName: { fontSize: 16, fontWeight: 'bold', color: '#1A2E44', flex: 1 },
  counterContainer: { flexDirection: 'row' },
  counterBtn: { backgroundColor: '#00D084', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  infoLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
  infoValue: { color: '#555', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12, width: '100%' },
  statusRow: { alignItems: 'flex-end' },
  statusBadge: { paddingHorizontal: 25, paddingVertical: 8, borderRadius: 20 },
  statusText: { fontSize: 14, fontWeight: 'bold' },
});