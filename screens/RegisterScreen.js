import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { saveUser } from '../services/userService';

export default function RegisterScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateUser = async () => {
        try {
        const resultado = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await saveUser(resultado.user.uid, {
            nombre: nombre,
            email: resultado.user.email
        });

        alert('Usuario registrado correctamente');
    } catch (error) {
        alert(error.message);
    }
    };

  
  return (
    <View>

      <Text>Crear cuenta</Text>

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
        title="Crear usuario"
        onPress={handleCreateUser}
      />

      <Button
        title="Ya tengo una cuenta"
        onPress={() => navigation.navigate('Login')}
      />

    </View>
  );
}