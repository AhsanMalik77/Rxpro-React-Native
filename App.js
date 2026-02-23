import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/Auth/SignInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';

// Users import
import Usertab from './Navigation/Usertab';
import Addnewmember from './src/screens/Userscreens/Addnewmember';
import Addphr from './src/screens/Userscreens/Addphr';
import Addrx from './src/screens/Userscreens/Addrx';
import PhrScreen from './src/screens/Userscreens/PhrScreen';
import Editprofile from './src/screens/Userscreens/EditProfile';
import ChangePassword from './src/screens/Userscreens/Changepass';

// Medical store imports
import Medicaltab from './Navigation/Medicaltab';  // ✅ Medical ka tab navigator import karo
import Medicalhome from './src/screens/Medicalscreens/Mhome';
import Medicalstock from './src/screens/Medicalscreens/Mstock';
import MedicalRider from './src/screens/Medicalscreens/Mrider';
import Medicalprof from './src/screens/Medicalscreens/Mstore';
import AddMedicines from './src/screens/Medicalscreens/AddMedicines'
import Addrider from './src/screens/Medicalscreens/Addrider'
import Medicalorders from './src/screens/Medicalscreens/Medicalorders'
import Orderdetail from './src/screens/Medicalscreens/Orderdetail'
import Editprof from './src/screens/Medicalscreens/Editprof';
import { Screen } from 'react-native-screens';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // 'user' ya 'medical'

  // Function to handle login from SignInScreen
  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Auth Screens
          <>
            <Stack.Screen name="SignIn">
              {props => <SignInScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : userType === 'user' ? (
          // ✅ User Screens - Sirf user ke liye
          <>
            <Stack.Screen name="MainApp" component={Usertab} />
            <Stack.Screen name="AddNewMember" component={Addnewmember} />
            <Stack.Screen name="AddphR" component={Addphr} />
            <Stack.Screen name="AddrX" component={Addrx} />
            <Stack.Screen name="Phr" component={PhrScreen} />
            <Stack.Screen name="Editprofilee" component={Editprofile} />
            <Stack.Screen name="Changep" component={ChangePassword} />
          </>
        ) : (
          // ✅ Medical Screens - Sirf medical ke liye
          <>
            <Stack.Screen name="MedicalApp" component={Medicaltab} />
            <Stack.Screen name="Medhome" component={Medicalhome} />
            <Stack.Screen name="Medrider" component={MedicalRider} />
            <Stack.Screen name="Medstock" component={Medicalstock} />
            <Stack.Screen name="Medprofile" component={Medicalprof} />
            <Stack.Screen name="AddMed" component={AddMedicines} />
            <Stack.Screen name="Addrid" component={Addrider} />
            <Stack.Screen name="MOrders" component={Medicalorders} />
            <Stack.Screen name="MOrderdetail" component={Orderdetail} />
            <Stack.Screen name="EditProfile" component={Editprof} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;