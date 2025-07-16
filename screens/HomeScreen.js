// Gabirel Nuñez Medina 2023-1871

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
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
      style={styles.card}
      onPress={() => navigation.navigate('EventDetail', { evento: item, index })}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.date}>{item.fecha}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <View style={styles.container}>
        <Text style={styles.header}>📋 Listado de Eventos</Text>

        {eventos.length === 0 ? (
          <Text style={styles.empty}>No hay eventos registrados aún.</Text>
        ) : (
          <FlatList
            data={eventos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddEvent')}
        >
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    color: '#666',
    marginTop: 4,
  },
  empty: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    lineHeight: 34,
    marginTop: -2,
  },
});