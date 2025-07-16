import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarEventos);
    return unsubscribe;
  }, [navigation]);

  const cargarEventos = async () => {
    const data = await AsyncStorage.getItem('eventos');
    if (data) setEventos(JSON.parse(data));
  };

  const renderItem = ({ item, index }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate('EventDetail', { evento: item, index })}
  >
    <Text style={styles.title}>{item.titulo}</Text>
    <Text>{item.fecha}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Button title="Agregar Evento" onPress={() => navigation.navigate('AddEvent')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1 },
  title: { fontWeight: 'bold' },
});