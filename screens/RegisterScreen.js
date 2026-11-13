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
                Crear cuenta
            </Text>

            <Text style={{
                fontSize: 15,
                color: '#64748b',
                textAlign: 'center',
                marginBottom: 10
            }}>
                Registrate para comenzar
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
                title="Crear usuario"
                onPress={handleCreateUser}
                color="#2563eb"
            />

            <Button
                title="Ya tengo una cuenta"
                onPress={() => navigation.navigate('Login')}
                color="#64748b"
            />

        </View>

    </View>
);
}