// UserSearchbr.js
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';

export default function UserSearchbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ 
      paddingHorizontal: 6, 
      paddingVertical: 8,
      backgroundColor: 'white',
    }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F3F4F6',
          borderRadius: 28,
          paddingHorizontal: 16,
          paddingVertical: 8,
          height: 48,
        }}
      >
        <Search size={18} color="#9CA3AF" />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 15,
            color: '#1F2937',
            paddingVertical: 4,
          }}
          placeholder="Search Medicine,Store"
          placeholderTextColor="#D1D5DB"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
}