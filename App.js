import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  Alert,
} from "react-native";

const API_KEY = "6c33244c";

const App = () => {
  const [titulo, setTitulo] = useState("");
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState("");

  const buscarPelicula = async () => {
    if (!titulo) {
      Alert.alert("Error", "Por favor, ingresa un título de película.");
      return;
    }

    try {
      const respuesta = await fetch(
        `https://www.omdbapi.com/?t=${titulo}&apikey=${API_KEY}`
      );
      const info = await respuesta.json();

      if (info.Response === "True") {
        setPelicula(info);
        setError("");
      } else {
        setError(info.Error);
        setPelicula(null);
      }
    } catch (error) {
      console.error(error);
      setError(
        "Algo fallo al conectar a la API, posiblemente camilo le erró a la key"
      );
      setPelicula(null);
    }
  };

  return (
    <View style={estilos.contenedor}>
      <TextInput
        style={estilos.campoTexto}
        placeholder="Ingrese el título de la película"
        value={titulo}
        onChangeText={setTitulo}
      />
      <Button title="Buscar" onPress={buscarPelicula} color="#61dafb" />

      {error ? (
        <Text style={estilos.error}>{error}</Text>
      ) : (
        pelicula && (
          <View style={estilos.resultado}>
            <Image source={{ uri: pelicula.Poster }} style={estilos.poster} />
            <Text style={estilos.titulo}>{pelicula.Title}</Text>
            <Text style={estilos.sinopsis}>{pelicula.Plot}</Text>
          </View>
        )
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 20,
    justifyContent: "center",
  },
  campoTexto: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    marginBottom: 10,
    color: "#ffffff",
  },
  resultado: {
    marginTop: 20,
    alignItems: "center",
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  sinopsis: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },
});

export default App;
