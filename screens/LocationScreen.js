
import { useState, useRef } from 'react';

import {
    View,
    Text,
    Button,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';

import * as Location from 'expo-location';

import MapView, {
    Marker,
    Polyline
} from 'react-native-maps';

export default function LocationScreen() {

    const [location, setLocation] = useState(null);
    const [destino, setDestino] = useState(null);
    const [loading, setLoading] = useState(false);

    const mapRef = useRef(null);

    // Obtener ubicación actual
    const obtenerUbicacion = async () => {
        try {
            setLoading(true);

            const permiso =
                await Location.requestForegroundPermissionsAsync();

            if (permiso.status !== 'granted') {
                Alert.alert(
                    'Permiso denegado',
                    'Necesitamos permiso para obtener tu ubicación.'
                );
                return;
            }

            const resultado =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced
                });

            const coordenadas = resultado.coords;

            setLocation(coordenadas);

            // Centrar el mapa en la ubicación actual
            mapRef.current?.animateToRegion({
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });

        } catch (error) {
            console.log(error);

            Alert.alert(
                'Error',
                'No fue posible obtener la ubicación.'
            );

        } finally {
            setLoading(false);
        }
    };

    // Marcar destino al tocar el mapa
    const marcarDestino = (evento) => {

        const coordenadas = evento.nativeEvent.coordinate;

        setDestino(coordenadas);

    };

    // Eliminar destino seleccionado
    const eliminarDestino = () => {
        setDestino(null);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Mi ubicación
            </Text>

            <Button
                title="Obtener ubicación"
                onPress={obtenerUbicacion}
                disabled={loading}
            />

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="blue"
                />
            )}

            {/* MAPA */}
            <MapView
                ref={mapRef}
                style={styles.map}

                initialRegion={{
                    latitude: -34.6037,
                    longitude: -58.3816,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}

                onPress={marcarDestino}

                showsUserLocation={true}
                showsMyLocationButton={true}
            >

                {/* Marcador de ubicación actual */}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        title="Mi ubicación"
                        description="Estás aquí"
                        pinColor="blue"
                    />
                )}

                {/* Marcador del destino */}
                {destino && (
                    <Marker
                        coordinate={destino}
                        title="Destino seleccionado"
                        description="Lugar que seleccionaste"
                        pinColor="red"
                    />
                )}

                {/* Línea entre ubicación y destino */}
                {location && destino && (
                    <Polyline
                        coordinates={[
                            {
                                latitude: location.latitude,
                                longitude: location.longitude
                            },
                            destino
                        ]}
                        strokeColor="blue"
                        strokeWidth={4}
                    />
                )}

            </MapView>

            {/* INFORMACIÓN DE UBICACIÓN */}
            {location && (
                <View style={styles.info}>

                    <Text style={styles.subtitle}>
                        Mi posición actual
                    </Text>

                    <Text>
                        Latitud: {location.latitude}
                    </Text>

                    <Text>
                        Longitud: {location.longitude}
                    </Text>

                    <Text>
                        Precisión: {location.accuracy} metros
                    </Text>

                </View>
            )}

            {/* INFORMACIÓN DEL DESTINO */}
            {destino && (
                <View style={styles.info}>

                    <Text style={styles.subtitle}>
                        Destino seleccionado
                    </Text>

                    <Text>
                        Latitud: {destino.latitude}
                    </Text>

                    <Text>
                        Longitud: {destino.longitude}
                    </Text>

                    <Button
                        title="Eliminar destino"
                        color="red"
                        onPress={eliminarDestino}
                    />

                </View>
            )}

            {!destino && (
                <Text style={styles.help}>
                    Tocá un lugar del mapa para marcar un destino.
                </Text>
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        gap: 12
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    map: {
        flex: 1,
        width: '100%',
        minHeight: 300
    },

    info: {
        gap: 5,
        padding: 10,
        backgroundColor: '#eeeeee',
        borderRadius: 8
    },

    subtitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    help: {
        textAlign: 'center',
        color: '#666666'
    }

});
