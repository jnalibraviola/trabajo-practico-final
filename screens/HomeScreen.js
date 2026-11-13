
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
  const [descripcion, setDescripcion] = useState('');
  const [tareas, setTareas] = useState([]);

  // Identifica si estamos editando una tarea
  const [tareaEditando, setTareaEditando] = useState(null);

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

  // Limpiar los campos
  const limpiarFormulario = () => {
    setTitulo('');
    setDescripcion('');
    setTareaEditando(null);
  };

  // Crear o modificar una tarea
  const guardarTarea = async () => {
    if (titulo.trim() === '') {
      Alert.alert('Aviso', 'Escribí el título de la tarea');
      return;
    }

    try {
      // Si existe un ID, modificamos la tarea
      if (tareaEditando !== null) {
        await updateTask(tareaEditando, {
          titulo: titulo.trim(),
          descripcion: descripcion.trim()
        });

        Alert.alert('Éxito', 'Tarea modificada correctamente');
      } else {
        // Si no existe un ID, creamos una tarea
        const user = getAuth().currentUser;

        if (!user) {
          Alert.alert('Error', 'Tenés que iniciar sesión');
          return;
        }

        await createTask({
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          completada: false,
          userId: user.uid
        });

        Alert.alert('Éxito', 'Tarea creada correctamente');
      }

      limpiarFormulario();
      await cargarTareas();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la tarea');
    }
  };

  // Cargar los datos de una tarea en el formulario
  const editarTarea = (tarea) => {
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion || '');
    setTareaEditando(tarea.id);
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

      {/* Campo para el título */}
      <TextInput
        placeholder="Nombre de la tarea"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          borderColor: '#999',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5
        }}
      />

      {/* Campo para la descripción */}
      <TextInput
        placeholder="Descripción de la tarea"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#999',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          minHeight: 80,
          textAlignVertical: 'top'
        }}
      />

      {/* Botón para guardar */}
      <Button
        title={
          tareaEditando !== null
            ? 'Guardar cambios'
            : 'Agregar tarea'
        }
        onPress={guardarTarea}
      />

      {/* Botón para cancelar edición */}
      {tareaEditando !== null && (
        <Button
          title="Cancelar edición"
          color="gray"
          onPress={limpiarFormulario}
        />
      )}

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

            {/* Nombre de la tarea */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textDecorationLine: item.completada
                  ? 'line-through'
                  : 'none'
              }}
            >
              {item.titulo}
            </Text>

            {/* Descripción */}
            <Text style={{ marginTop: 5, marginBottom: 8 }}>
              {item.descripcion || 'Sin descripción'}
            </Text>

            {/* Estado */}
            <Text style={{ marginBottom: 8 }}>
              {item.completada ? 'Completada' : 'Pendiente'}
            </Text>

            {/* Completar o dejar pendiente */}
            <Button
              title={
                item.completada
                  ? 'Marcar como pendiente'
                  : 'Completar'
              }
              onPress={() => cambiarEstado(item)}
            />

            {/* Editar tarea */}
            <Button
              title="Editar tarea"
              color="blue"
              onPress={() => editarTarea(item)}
            />

            {/* Eliminar tarea */}
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
