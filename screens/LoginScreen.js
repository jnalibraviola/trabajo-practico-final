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
    <View>

      <Text>Iniciar sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button
        title="Iniciar sesión"
        onPress={handleSignIn}
      />

      <Button
        title="Crear una cuenta"
        onPress={() => navigation.navigate('Register')}
      />

    </View>
  );

}
