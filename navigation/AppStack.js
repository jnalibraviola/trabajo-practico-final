import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LocationScreen from '../screens/LocationScreen';
import MapsScreen from '../screens/MapScreen';
import PostsScreen from '../screens/PostsScreen';

const Stack = createNativeStackNavigator();


export default function AppStack() {


    return (


        <Stack.Navigator>


            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />


            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />

            <Stack.Screen
                name="Location"
                component={LocationScreen}
            />

            <Stack.Screen
                name="Maps"
                component={MapsScreen}
            />
            
          <Stack.Screen
            name="posts"
            component={PostsScreen}
          />

        </Stack.Navigator>


    );


}
