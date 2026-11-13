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
        <View>
            <Text>{user?.email}</Text>
            <Text>{user?.uid}</Text>

            <Button
                title="Ir a Home"
                onPress={() => navigation.navigate('Home')}
            />

            <Button
                title="Ir a Ubicación"
                onPress={() => navigation.navigate('Location')}
            />

            <Button
                title="ir a mapa"
                onPress={() => navigation.navigate('Mapa')}
            />

            <Button
                title="ir a publicaciones"
                onPress={() => navigation.navigate('posts')}
            />

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
            />

            <Button title="Elegir imagen" onPress={pickImage} />

            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}

            <Button title="Guardar perfil" onPress={guardarPerfil} />
        </View>
    );
}