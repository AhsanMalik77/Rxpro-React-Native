import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginuser } from '../../Services/authservice';

const SignInScreen = ({ navigation, onLogin }) => {  // ✅ onLogin prop yahan add karo
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

 const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Missing", "Email aur Password likhen");
    return;
  }

  try {
    const userData = await loginuser(email, password);
    
    // Backend code ke mutabiq:
    // Response mein 'role' aa raha hai (e.g., "customer", "Rider", "Store")
    
    if (userData && userData.role) {
      // Agar role "customer" hai to usey "user" mein convert karein 
      // kyunki aapke App.js mein shayad 'user' condition lagi hogi
      let roleToPath = userData.role;
      
      onLogin(roleToPath); 
    } else {
      Alert.alert("Error", "Role not found in response");
    }
  
  } catch (error) {
    Alert.alert("Login Failed", error.message);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      {/* Rest of your JSX remains exactly the same */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Sign In</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <Eye size={24} color="#1a1c1b" strokeWidth={2} />
              ) : (
                <EyeOff size={24} color="#1a1c1b" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>

       

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupPrompt}>
            <Text style={styles.promptText}>Need An Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain exactly the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00C874',
    textAlign: 'center',
    marginBottom: 40,
  },

  hintText: {
    fontSize: 14,
    color: '#00D98E',
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 2,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingRight: 12,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 8,
    marginRight: 8,
  },
  forgotText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#00C874',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    color: '#666',
    fontSize: 14,
    marginRight: 4,
  },
  signupLink: {
    color: '#00C874',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignInScreen;