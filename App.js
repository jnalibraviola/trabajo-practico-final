import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen'
import LocationScreen from './screens/LocationScreen';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>

      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Iniciar sesión' }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Crear cuenta' }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Perfil' }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home'}}
          />

          <Stack.Screen
            name="Location"
            component={LocationScreen}
            options={{ title: 'Ubicación'}}
          />



        </Stack.Navigator>

      </NavigationContainer>

    </AuthProvider>
  );
}