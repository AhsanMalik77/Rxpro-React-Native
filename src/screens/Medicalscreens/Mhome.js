import React from 'react';
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
  Bell,
  Store,
  Bike
} from 'lucide-react-native';
import Addmedbtn from '../../buttons/Addmedbutton';

export default function Medicalhome({ navigation }) {

  const orders = [
    {
      id: 1,
      orderNo: 'OID-001',
      customerName: 'Ahsan Ali',
      address: 'BIIT,6th Road,Rawalpindi',
      items: 'Nurofen Junior 150ml x1',
      price: '110.80'
    },
    {
      id: 2,
      orderNo: 'OID-002',
      customerName: 'Umer Bashir',
      address: 'House No. 34, Block D, Satellite town',
      items: 'Sofvasc 500mg -1 blister pack',
      price: '180'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.storeNameContainer}>
          <Store color="#00D98E" size={20} />
          <Text style={styles.storeNameText}>
            Kallar Kahar Medical Store
          </Text>
        </View>

        <TouchableOpacity style={styles.notificationButton}>
          <Bell color="#333" size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#999" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Medicine,Store"
          placeholderTextColor="#999"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.actionButtonsContainer}>
        <Text style={styles.actionButtonsLabel}>Quick Actions</Text>

        <View style={styles.actionButtons}>
          <Addmedbtn />

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Addrid')}
          >
            <View style={styles.actionIcon}>
              <Bike color="#00D98E" size={24} />
            </View>
            <Text style={styles.actionText}>Add Rider</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* New Orders Header */}
      <View style={styles.ordersHeader}>
        <Text style={styles.ordersTitle}>New Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MOrders')}>
          <Text style={styles.viewAllText}>view all...</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView
        style={styles.ordersList}
        showsVerticalScrollIndicator={false}
      >
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>

            <Text style={styles.orderNumber}>
              Order # {order.orderNo}
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Customer Name:</Text>
              <Text style={styles.value}>{order.customerName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{order.address}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Items:</Text>
              <Text style={styles.value}>{order.items}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Estimated Price:</Text>
              <Text style={styles.price}>Rs. {order.price}</Text>
            </View>

           

          </View>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  storeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  storeNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  notificationButton: {
    padding: 8,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },

  actionButtonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  actionButtonsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 20,
  },

  actionButton: {
    alignItems: 'center',
  },

  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  actionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },

  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  ordersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  viewAllText: {
    fontSize: 14,
    color: '#00D98E',
    fontWeight: '500',
  },

  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
  },

  orderCard: {
    backgroundColor: '#FFF8F8',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  label: {
    width: 120,
    fontSize: 14,
    color: '#555',
  },

  value: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  assignBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },

  assignText: {
    color: '#00D98E',
    fontWeight: '600',
    fontSize: 14,
  },

});
