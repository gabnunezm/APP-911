import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
    <View style={styles.container}>
      <Text>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
      <Text>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Tomar Foto" onPress={tomarFoto} />
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <Button title={eventoEditar ? 'Guardar Cambios' : 'Guardar Evento'} onPress={guardarEvento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
  input: { borderWidth: 1, padding: 8, borderRadius: 5 },
  image: { width: '100%', height: 200, marginTop: 10 },
});