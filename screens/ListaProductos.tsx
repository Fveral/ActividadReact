import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { ref, set, push, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { db } from '../config/Config';

export default function ListaProductos() {
  const [publicaciones, setpublicaciones] = useState([]);
  const [opinion, setopinion] = useState('');
  const [useremail, setuseremail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setuseremail(user.email);
    } else {
      Alert.alert('Error', 'No hay un usuario autenticado.');
    }
    leerPublicaciones();
  }, []);

  function leerPublicaciones() {
    const publicacionesRef = ref(db, 'publicaciones/');
    onValue(publicacionesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaTemp = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setpublicaciones(listaTemp);
      }
    });
  };

  function agregarPublicacion() {
    if (!opinion) {
      Alert.alert('Error', 'Por favor, ingrese una opinión.');
      return;
    }

    const publicacionesRef = ref(db, 'publicaciones/');
    const nuevaPublicacionRef = push(publicacionesRef);

    set(nuevaPublicacionRef, {
      email: useremail,
      opinion,
    }).then(() => {
      Alert.alert('Éxito', 'Publicación agregada correctamente');
      setopinion('');
    }).catch((error) => {
      Alert.alert('Error', 'No se pudo agregar la publicación: ' + error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Publicaciones</Text>

      <TextInput
        value={useremail}
        editable={false}
        style={styles.input}
        placeholder="Correo electrónico"
      />

      <TextInput
        value={opinion}
        onChangeText={(texto) => setopinion(texto)}
        style={styles.input}
        placeholder="Escribe tu opinión sobre el ITSQMET"
      />

      <Button title="Agregar Publicación" onPress={agregarPublicacion} />

      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.publicacionContainer}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.opinion}>{item.opinion}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  publicacionContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  email: {
    fontWeight: 'bold',
  },
  opinion: {
    marginTop: 5,
  },
});
