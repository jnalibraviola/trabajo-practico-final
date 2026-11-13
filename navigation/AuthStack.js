import {createNativeStackNavigator} from '@react-navigation/native-stack';

import loginScreen from '../screens/LoginScreen';
import registerScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {

    return ( 

        <Stack.Navigator initialRouteName='Login'>

            
            <Stack.Screen 
            name='Login' 
            component={loginScreen} 
            />


            <Stack.Screen 
            name='Register' 
            component={registerScreen} 
            />


        </Stack.Navigator>

    );

}