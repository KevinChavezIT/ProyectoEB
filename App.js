import React, { useState } from 'react';

import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps'; // Importar react-native-maps

// Pantalla principal (Inicio de sesión y registro)
function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor ingresa un usuario y una contraseña.');
    } else {
      Alert.alert('Bienvenido', `Has iniciado sesión con el usuario: ${username}`, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Reciclaje');
            setUsername('');
            setPassword('');
          },
        },
      ]);
    }
  };

  const handleRegister = async () => {
    if (username === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Por favor completa todos los campos.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
    } else {
      try {
        const response = await axios.post('http://192.168.100.95:5000/register', { username, password });
        Alert.alert('Registrado', response.data.message, [
          {
            text: 'OK',
            onPress: () => {
              setUsername('');
              setPassword('');
              setConfirmPassword('');
            },
          },
        ]);
      } catch (error) {
        Alert.alert('Error', error.response ? error.response.data.message : 'Hubo un error al registrar el usuario.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECOBOT</Text>

      <Image
        source={require('./assets/1.png')} 
        style={styles.image}
      />

      <Text style={styles.header}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Pantalla "Reciclaje"
function RecyclingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECOBOT</Text>
      <Text style={styles.header}>¿Qué es el reciclaje?</Text>
      <Text style={styles.smallText}>
        El reciclaje es el proceso de recolectar y procesar materiales que de otro modo serían desechados como basura y convertirlos en nuevos productos.
      </Text>

      {/* Contenedor de botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.fullButton}
          onPress={() => navigation.navigate('Categorías')}
        >
          <Text style={styles.buttonText}>Categorías</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fullButton}
          onPress={() => navigation.navigate('Puntos de Reciclaje')}
        >
          <Text style={styles.buttonText}>Puntos de Reciclaje</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CategoriesScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Categorías</Text>
      <Image
        source={require('./assets/cate.png')}
        style={styles.categoryImage}
        resizeMode="contain"
      />
      <Text style={styles.smallText}>
        Aquí puedes aprender sobre las diferentes categorías de reciclaje, como plástico, vidrio, papel, y más.
      </Text>

      {/* Botones de categorías */}
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => navigation.navigate('Plástico')}
      >
        <Text style={styles.buttonText}>Plástico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => navigation.navigate('Vidrio')}
      >
        <Text style={styles.buttonText}>Vidrio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => navigation.navigate('Papel')}
      >
        <Text style={styles.buttonText}>Papel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => navigation.navigate('Metales')}
      >
        <Text style={styles.buttonText}>Metales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => navigation.navigate('Electrónicos')}
      >
        <Text style={styles.buttonText}>Electrónicos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PlasticScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plástico</Text>
      <Text style={styles.smallText}>Información sobre reciclaje de plástico.</Text>
    </View>
  );
}

function GlassScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vidrio</Text>
      <Text style={styles.smallText}>Información sobre reciclaje de vidrio.</Text>
    </View>
  );
}

function PaperScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Papel</Text>
      <Text style={styles.smallText}>Información sobre reciclaje de papel.</Text>
    </View>
  );
}

function MetalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metales</Text>
      <Text style={styles.smallText}>Información sobre reciclaje de metales.</Text>
    </View>
  );
}

function ElectronicsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Electrónicos</Text>
      <Text style={styles.smallText}>Información sobre reciclaje de electrónicos.</Text>
    </View>
  );
}
// Pantalla "Puntos de Reciclaje"
function RecyclingPointsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntos de Reciclaje</Text>
      <Text style={styles.smallText}>
        Encuentra los puntos de reciclaje más cercanos a tu ubicación para contribuir al cuidado del medio ambiente.
      </Text>

      <MapView
        provider="google" 
        style={styles.map}
        initialRegion={{
          latitude: -0.1630, 
          longitude: -78.4558,
          latitudeDelta: 0.02, 
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: -0.1630, longitude: -78.4558 }}
          title="Punto de Reciclaje Zámbiza"
          description="Reciclaje de plástico, vidrio y papel."
        />
        <Marker
          coordinate={{ latitude: -0.1600, longitude: -78.4530 }}
          title="Punto de Reciclaje Cercano"
          description="Reciclaje de metales y electrónicos."
        />
      </MapView>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Reciclaje" component={RecyclingScreen} />
        <Stack.Screen name="Categorías" component={CategoriesScreen} />
        <Stack.Screen name="Plástico" component={PlasticScreen} />
        <Stack.Screen name="Vidrio" component={GlassScreen} />
        <Stack.Screen name="Papel" component={PaperScreen} />
        <Stack.Screen name="Metales" component={MetalScreen} />
        <Stack.Screen name="Electrónicos" component={ElectronicsScreen} />
        <Stack.Screen name="Puntos de Reciclaje" component={RecyclingPointsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color: '#4CAF50',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    letterSpacing: 4, 
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  smallText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 400,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  toggleText: {
    marginTop: 20,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  fullButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%', 
    height: 250, 
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%', // Ajusta el ancho del botón si lo necesitas
  },
});