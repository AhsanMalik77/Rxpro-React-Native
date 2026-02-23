import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function MedicalOrders({ navigation }) {

  const orders = [
    {
      id: 1,
      orderNo: 'OID-001',
      customerName: 'Jason Statham',
      address: 'House No. 34, Block D, Satellite town',
      items: 'Panadol - 1 Strip',
      price: '60'
    },
    {
      id: 2,
      orderNo: 'OID-002',
      customerName: 'Aurthur Morgan',
      address: 'House No. 34, Block D, Satellite town',
      items: 'Sofvasc 500mg - 1 blister pack',
      price: '180'
    },
    {
      id: 3,
      orderNo: 'OID-003',
      customerName: 'Nathan Drake',
      address: 'House No. 531, St-12, Musliamabad town',
      items: 'Luprin 50mg - 2 Strips',
      price: '120'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MOrderdetail', { order })}
          >

            <Text style={styles.orderNumber}>
              Order # {order.orderNo}
            </Text>

            <View style={styles.line} />

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

            <View style={styles.arrow}>
              <ChevronRight size={20} color="#00D98E" />
            </View>

          </TouchableOpacity>
        ))}

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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 10,
  },

  line: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  label: {
    width: 100,
    fontSize: 14,
    color: '#475569',
  },

  value: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
  },

  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00D98E',
  },

  arrow: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },

});
