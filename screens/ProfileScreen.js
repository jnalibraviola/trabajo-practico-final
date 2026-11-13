import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }


        const permission = ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted) {
        Alert.alert(
            'permiso necesario',
            'necesitamos acceso a tus imagenes'
        );

        return;
        }

        console.log(result);
    };

    const guardarPerfil = async () => {
        if (!nombre.trim() || !edad.trim()) {
            Alert.alert('Error', 'Completá el nombre y la edad');
            return;
        }

        try {
            await addDoc(collection(db, 'perfiles'), {
                nombre: nombre.trim(),
                edad: Number(edad),
                uid: user?.uid,
                image: image,
                creadoEn: serverTimestamp(),
            });

            Alert.alert('Éxito', 'Perfil guardado');

            setNombre('');
            setEdad('');
            setImage(null);
        } catch (error) {
            console.error('Error al guardar:', error);
            Alert.alert('Error', 'No se pudo guardar el perfil');
        }
    };

   
return (
    <View style={{
        flex: 1,
        backgroundColor: '#f1f5f9',
        padding: 20
    }}>

        <View style={{
            backgroundColor: '#ffffff',
            padding: 20,
            borderRadius: 15,
            elevation: 4,
            marginBottom: 15
        }}>

            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: 10,
                textAlign: 'center'
            }}>
                Mi perfil
            </Text>

            <Text style={{
                fontSize: 14,
                color: '#64748b',
                marginBottom: 5
            }}>
                Correo: {user?.email}
            </Text>

            <Text style={{
                fontSize: 12,
                color: '#94a3b8'
            }}>
                ID: {user?.uid}
            </Text>

        </View>

        <View style={{
            backgroundColor: '#ffffff',
            padding: 20,
            borderRadius: 15,
            elevation: 4,
            marginBottom: 15,
            gap: 10
        }}>

            <Text style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: 5
            }}>
                Navegación
            </Text>

            <Button
                title="Ir a Home"
                onPress={() => navigation.navigate('Home')}
                color="#2563eb"
            />

            <Button
                title="Ir a Ubicación"
                onPress={() => navigation.navigate('Location')}
                color="#2563eb"
            />


        </View>

        <View style={{
            backgroundColor: '#ffffff',
            padding: 20,
            borderRadius: 15,
            elevation: 4,
            gap: 12
        }}>

            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: 5
            }}>
                Completar perfil
            </Text>

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={{
                    backgroundColor: '#f8fafc',
                    borderWidth: 1,
                    borderColor: '#cbd5e1',
                    borderRadius: 8,
                    padding: 12
                }}
            />

            <TextInput
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
                style={{
                    backgroundColor: '#f8fafc',
                    borderWidth: 1,
                    borderColor: '#cbd5e1',
                    borderRadius: 8,
                    padding: 12
                }}
            />

            <Button
                title="Elegir imagen"
                onPress={pickImage}
                color="#64748b"
            />

            {image && (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 180,
                        height: 180,
                        borderRadius: 12,
                        alignSelf: 'center',
                        marginVertical: 10
                    }}
                />
            )}

            <Button
                title="Guardar perfil"
                onPress={guardarPerfil}
                color="#2563eb"
            />

        </View>

    </View>
);

}