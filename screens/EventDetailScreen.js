// Gabirel Nuñez Medina 2023-1871

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EventDetailScreen({ route, navigation }) {
  const { evento, index } = route.params;

  const eliminarEvento = async () => {
    Alert.alert(
      'Eliminar evento',
      '¿Estás seguro de que deseas eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const data = await AsyncStorage.getItem('eventos');
            let eventos = data ? JSON.parse(data) : [];
            eventos.splice(index, 1);
            await AsyncStorage.setItem('eventos', JSON.stringify(eventos));
            navigation.goBack();
          },
        },
      ]
    );
  };

  const editarEvento = () => {
    navigation.navigate('AddEvent', { evento, index });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{evento.titulo}</Text>
      <Text style={styles.date}>{evento.fecha}</Text>
      <Text style={styles.description}>{evento.descripcion}</Text>

      {evento.foto && (
        <Image source={{ uri: evento.foto }} style={styles.image} />
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editBtn} onPress={editarEvento}>
          <Text style={styles.btnText}>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={eliminarEvento}>
          <Text style={styles.btnText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 30,
    backgroundColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});