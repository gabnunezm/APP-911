// Gabirel Nuñez Medina 2023-1871

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function AddEventScreen({ navigation, route }) {
  const eventoEditar = route.params?.evento;
  const indexEditar = route.params?.index;

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (eventoEditar) {
      setTitulo(eventoEditar.titulo);
      setDescripcion(eventoEditar.descripcion);
      setFoto(eventoEditar.foto);
    }
  }, []);

  const guardarEvento = async () => {
    if (!titulo.trim()) {
      Alert.alert('Campo requerido', 'Debes ingresar un título para el evento.');
      return;
    }

    const nuevoEvento = {
      titulo,
      descripcion,
      fecha: new Date().toLocaleDateString(),
      foto,
    };

    const data = await AsyncStorage.getItem('eventos');
    let eventos = data ? JSON.parse(data) : [];

    if (eventoEditar) {
      eventos[indexEditar] = nuevoEvento; // editar
    } else {
      eventos.push(nuevoEvento); // nuevo
    }

    await AsyncStorage.setItem('eventos', JSON.stringify(eventos));
    navigation.goBack();
  };

  const tomarFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      allowsEditing: true,
      base64: false,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Escribe el título del evento"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Detalles del evento..."
        />

        <TouchableOpacity style={styles.fotoBtn} onPress={tomarFoto}>
          <Text style={styles.fotoBtnText}>📸 Tomar Foto</Text>
        </TouchableOpacity>

        {foto && (
          <Image source={{ uri: foto }} style={styles.image} />
        )}

        <TouchableOpacity style={styles.guardarBtn} onPress={guardarEvento}>
          <Text style={styles.guardarBtnText}>
            {eventoEditar ? '💾 Guardar Cambios' : '💾 Guardar Evento'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: -8,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fotoBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  fotoBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  guardarBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  guardarBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});