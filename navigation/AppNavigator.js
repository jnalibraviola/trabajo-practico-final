import {useEffect,useState} from 'react';


import {ActivityIndicator,View} from 'react-native';


import {onAuthStateChanged} from 'firebase/auth';


import { auth } from '../firebase/firebaseConfig';


import AuthStack from './AuthStack';
import AppStack from './AppStack';


export default function AppNavigator() {


    const [user, setUser] = useState(null);


    const [loading, setLoading] = useState(true);


    useEffect(() => {


        const unsubscribe =
            onAuthStateChanged(auth,
                (currentUser) => {


                    setUser(currentUser);


                    setLoading(false);


                }
            );


        return unsubscribe;


    }, []);


    if (loading) {


        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        );


    }


    return user
        ? <AppStack />
        : <AuthStack />;


}
