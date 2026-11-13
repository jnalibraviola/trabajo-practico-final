import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import {
    signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../firebase/firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const handleSignIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    navigation.navigate('Profile');

  } catch (error) {
    console.log("ERROR FIREBASE:", error);
    
    Alert.alert(
      "Error",
      "El email o la contraseña son incorrectos"
    );
  }
};

 
return (
  <View style={{
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    padding: 25
  }}>

    <View style={{
      backgroundColor: '#ffffff',
      padding: 25,
      borderRadius: 15,
      elevation: 4,
      gap: 15
    }}>

      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center'
      }}>
        Bienvenido
      </Text>

      <Text style={{
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 10
      }}>
        Ingresá a tu cuenta para continuar
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: '#f8fafc',
          borderWidth: 1,
          borderColor: '#cbd5e1',
          borderRadius: 8,
          padding: 12
        }}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{
          backgroundColor: '#f8fafc',
          borderWidth: 1,
          borderColor: '#cbd5e1',
          borderRadius: 8,
          padding: 12
        }}
      />

      <Button
        title="Iniciar sesión"
        onPress={handleSignIn}
        color="#2563eb"
      />

      <Button
        title="Crear una cuenta"
        onPress={() => navigation.navigate('Register')}
        color="#64748b"
      />

    </View>

  </View>
);


}
