import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator, // ✅ Loading spinner ke liye
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginuser } from '../../Services/authservice';

const SignInScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state add ki
  var id=0;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing", "Email aur Password likhen");
      return;
    }

    setLoading(true); // ✅ Loading shuru

    try {
      const userData = await loginuser(email, password);
      
      setLoading(false); // ✅ Data aane par loading band

     if (userData && userData.role) {
    // role 'user' ya 'medical' hoga, aur sath mein ID bhej di
        onLogin(userData.role.toLowerCase(), userData.id,userData.name); 
}       else {
        Alert.alert("Error", "Server se sahi response nahi mila.");
      }
    
    } catch (error) {
      setLoading(false); // ✅ Error aane par bhi loading band
      
      // ✅ Agar API off hai to ye message dikhayega
      if (error.message.includes('Network Error') || error.message.includes('Network request failed')) {
        Alert.alert("Server Offline", "Backend server se rabta nahi ho pa raha. Check karein ke API chal rahi hai?");
      } else {
        Alert.alert("Login Failed", error.message || "Kuch ghalat hua, dobara koshish karein.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
            editable={!loading} // ✅ Loading ke waqt input lock
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading} // ✅ Loading ke waqt input lock
            />
            
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              disabled={loading}
            >
              {showPassword ? (
                <Eye size={24} color="#1a1c1b" strokeWidth={2} />
              ) : (
                <EyeOff size={24} color="#1a1c1b" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity disabled={loading}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* ✅ Login Button ya Loading Spinner */}
          <TouchableOpacity 
            style={[styles.loginButton, loading && { backgroundColor: '#ccc' }]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupPrompt}>
            <Text style={styles.promptText}>Need An Account?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SignUp')}
              disabled={loading}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { paddingHorizontal: 20, paddingVertical: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00C874', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 16, color: '#333' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, paddingRight: 12, marginBottom: 16 },
  passwordInput: { flex: 1, padding: 16, fontSize: 16, color: '#333' },
  eyeButton: { padding: 8, marginRight: 8 },
  forgotText: { color: '#999', fontSize: 14, textAlign: 'right', marginBottom: 24 },
  loginButton: { backgroundColor: '#00C874', borderRadius: 25, paddingVertical: 14, alignItems: 'center', marginBottom: 16, minHeight: 50, justifyContent: 'center' },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signupPrompt: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  promptText: { color: '#666', fontSize: 14, marginRight: 4 },
  signupLink: { color: '#00C874', fontSize: 14, fontWeight: 'bold' },
});

export default SignInScreen;