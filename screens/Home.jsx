import { Text, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';


export default function Home({ navigation }){

    const { user } = useAuth();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent:'center'
        
            }}
        >
            <Text>Hey {user ? user.get('firstName'): null}</Text>
        </SafeAreaView>
    );
};