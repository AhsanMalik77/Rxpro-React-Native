import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

export default function Orderdetail({ route, navigation }) {

  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Order Card */}
        <View style={styles.orderCard}>
          <Text style={styles.orderNumber}>
            Order # {order.orderNo}
          </Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Customer:</Text>
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
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.price}>Rs. {order.price}</Text>
          </View>
        </View>

        {/* Temporary Map Box */}
        <View style={styles.mapBox}>
          <Text style={styles.mapText}>Map Preview (Temporary)</Text>
        </View>

        {/* Rider Info */}
        <View style={styles.riderBox}>
          <Text style={styles.riderTitle}>Assigned Rider</Text>
          <Text style={styles.riderName}>Ahsan Ali</Text>
        </View>

        {/* Order Status Timeline */}
        <View style={styles.statusContainer}>

          <Text style={styles.statusTitle}>Order Status</Text>

          <View style={styles.statusItem}>
            <View style={styles.activeDot} />
            <Text style={styles.statusText}>Order Confirmed</Text>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.activeDot} />
            <Text style={styles.statusText}>Picked by Rider</Text>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.inactiveDot} />
            <Text style={styles.statusText}>On the Way</Text>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.inactiveDot} />
            <Text style={styles.statusText}>Delivered</Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  orderCard: {
    backgroundColor: '#FFF',
    margin: 15,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
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
    width: 90,
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
    color: '#00B37E',
  },

  /* Temporary Map Box */
  mapBox: {
    height: 200,
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#DDE3EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  mapText: {
    color: '#555',
    fontSize: 14,
  },

  /* Rider Box */
  riderBox: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },

  riderTitle: {
    fontSize: 14,
    color: '#777',
  },

  riderName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: '#00D98E',
  },

  /* Status Section */
  statusContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 14,
    marginBottom: 30,
    elevation: 2,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00D98E',
    marginRight: 10,
  },

  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 10,
  },

  statusText: {
    fontSize: 14,
    color: '#333',
  },

});
