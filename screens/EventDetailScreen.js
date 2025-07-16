import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
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
      <Text style={styles.desc}>{evento.descripcion}</Text>
      {evento.foto && <Image source={{ uri: evento.foto }} style={styles.image} />}
      <View style={styles.buttonGroup}>
        <Button title="✏️ Editar" onPress={editarEvento} />
        <Button title="🗑️ Eliminar" onPress={eliminarEvento} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  date: { color: 'gray', marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 20 },
  image: { width: '100%', height: 250, borderRadius: 10 },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 10,
  },
});