import React from 'react';
import { View, Text } from 'react-native';
import AddrxButton from '../buttons/AddrxButton';
import AddPHRButton from '../buttons/AddPHRButton';
import AddMemButton from '../buttons/AddMemButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserHomeButton() {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{flexDirection:'row' }}>
        <View style={{marginBottom:12}}>
              <AddrxButton/>
        </View>
       
        <AddPHRButton/>
        <AddMemButton/>
      </View>
    </SafeAreaView>
  );
}