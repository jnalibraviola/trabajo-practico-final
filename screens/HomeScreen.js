
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert
} from 'react-native';

import { getAuth } from 'firebase/auth';

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../services/taskService';

export default function HomeScreen() {
  const [titulo, setTitulo] = useState('');
  const [tareas, setTareas] = useState([]);

  // Obtener las tareas al abrir la pantalla
  useEffect(() => {
    cargarTareas();
  }, []);

  // Leer las tareas de Firebase
  const cargarTareas = async () => {
    try {
      const resultado = await getTasks();
      setTareas(resultado);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar las tareas');
    }
  };

  // Crear una tarea
  const agregarTarea = async () => {
    if (titulo.trim() === '') {
      Alert.alert('Aviso', 'Escribí el título de la tarea');
      return;
    }

    try {
      const user = getAuth().currentUser;

      if (!user) {
        Alert.alert('Error', 'Tenés que iniciar sesión');
        return;
      }

      await createTask({
        titulo: titulo.trim(),
        completada: false,
        userId: user.uid
      });

      setTitulo('');

      await cargarTareas();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear la tarea');
    }
  };

  // Marcar una tarea como completada o pendiente
  const cambiarEstado = async (tarea) => {
    try {
      await updateTask(tarea.id, {
        completada: !tarea.completada
      });

      await cargarTareas();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  // Eliminar una tarea
  const eliminarTarea = async (id) => {
    try {
      await deleteTask(id);
      await cargarTareas();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar la tarea');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Mis tareas
      </Text>

      <TextInput
        placeholder="Escribí una tarea"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          borderColor: '#999',
          padding: 10,
          marginBottom: 10
        }}
      />

      <Button
        title="Agregar tarea"
        onPress={agregarTarea}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={tareas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text>No hay tareas para mostrar.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textDecorationLine: item.completada
                  ? 'line-through'
                  : 'none'
              }}
            >
              {item.titulo}
            </Text>

            <Text>
              {item.completada ? 'Completada' : 'Pendiente'}
            </Text>

            <Button
              title={
                item.completada
                  ? 'Marcar como pendiente'
                  : 'Completar'
              }
              onPress={() => cambiarEstado(item)}
            />

            <Button
              title="Eliminar"
              color="red"
              onPress={() => eliminarTarea(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}