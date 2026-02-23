// UserDashboard.js - Complete with Recent Orders and Medicine Images
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Package, ChevronDown, Home, FileText, ShoppingBag, User } from 'lucide-react-native';
import UserHeader from '../../components/UserHeader';
import UserSearchbr from '../../components/UserSearchbr';
import AddrxButton from '../../buttons/AddrxButton';
import AddPHRButton from '../../buttons/AddPHRButton';
import AddMemButton from '../../buttons/AddMemButton';

const UserDashboard = ({ navigation }) => {
  // Recent orders data with image placeholders
  const recentOrders = [
    {
      id: 1,
      date: '29.06.2025',
      time: '15:18',
      orderNo: 'VSLR-298A',
      items: [
        { 
          name: 'Paracetamol-Ratiopharm 500mg Tab...', 
          qty: '10pcs x5', 
          price: '975 Rs',
          image: 'https://via.placeholder.com/50x50/00C874/ffffff?text=P' // Placeholder image
        },
        { 
          name: 'Gelomyrtol Forte 20 ST', 
          qty: '20pcs x1', 
          price: '1295 Rs',
          image: 'https://via.placeholder.com/50x50/00C874/ffffff?text=G'
        },
        { 
          name: 'Aesop Resurrection', 
          qty: '500ml soap x1', 
          price: '220 Rs',
          image: 'https://via.placeholder.com/50x50/00C874/ffffff?text=A'
        }
      ],
      totalItems: 3,
      totalPrice: 2490
    },
    {
      id: 2,
      date: '16.07.2022',
      time: '20:53',
      orderNo: 'M2Z4-VVVY2',
      items: [
        { 
          name: 'Sample Medicine', 
          qty: '10pcs x1', 
          price: '500 Rs',
          image: 'https://via.placeholder.com/50x50/00C874/ffffff?text=S'
        }
      ],
      totalItems: 1,
      totalPrice: 500
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <UserHeader userName="Ahsan Ali" />

          {/* Search Bar */}
          <UserSearchbr />

          {/* Button Row */}
          <View style={styles.buttonRow}>
            <AddrxButton />
            <AddPHRButton />
            <AddMemButton />
          </View>

          {/* Recent Orders Section */}
          <View style={styles.recentOrdersSection}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>

            {recentOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderDateTime}>
                    <Clock color="#00C874" size={16} />
                    <Text style={styles.orderDateTimeText}>
                      Delivered on {order.date}, {order.time}
                    </Text>
                  </View>
                  <Text style={styles.orderNumber}>{order.orderNo}</Text>
                </View>

                {/* Order Items with Images */}
                {order.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <View style={styles.itemImageContainer}>
                      <Image 
                        source={{ uri: item.image }} 
                        style={styles.itemImage}
                      />
                    </View>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>{item.qty}</Text>
                    </View>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                ))}

                {/* Order Footer */}
                <View style={styles.orderFooter}>
                  <TouchableOpacity style={styles.lessItemsButton}>
                    <Text style={styles.lessItemsText}>— LESS ITEMS</Text>
                  </TouchableOpacity>
                  <Text style={styles.orderTotal}>
                    {order.totalItems} Items | {order.totalPrice} Rs
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 0,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  recentOrdersSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderHeader: {
    marginBottom: 15,
  },
  orderDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  orderDateTimeText: {
    fontSize: 14,
    color: '#666',
  },
  orderNumber: {
    fontSize: 14,
    color: '#00C874',
    fontWeight: '500',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  itemImageContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 5,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#999',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginLeft: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  lessItemsButton: {
    paddingVertical: 5,
  },
  lessItemsText: {
    fontSize: 14,
    color: '#00C874',
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});

export default UserDashboard;