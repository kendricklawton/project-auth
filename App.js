import { NavigationContainer } from '@react-navigation/native';
import { Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContextProvider } from './contexts/AuthContext';
import { useAuth } from "./contexts/AuthContext";

import Profile from './screens/Profile';
import Login from './screens/Login';
import Registration from './screens/Registration';
import Name from "./screens/Name";
import Email from "./screens/Email";
import Password from "./screens/Password";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home =()=> {
  return (
    <Text>
      Home
    </Text>
  );
}

const Tabs =()=> {
  return (
    <Tab.Navigator   
    screenOptions={{headerShown: false}}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


const Navigation = () => {

  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user
            ?
            <>
              <Stack.Screen name='Tabs' component={Tabs}
                options={{
                  title: '',
                  }}
              />
              <Stack.Screen name='Name' component={Name} />
              <Stack.Screen name='Email' component={Email} />
              <Stack.Screen name='Password' component={Password} />
            </>
            :
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Registration' component={Registration} />
              <Stack.Screen name='Password' component={Password} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {

  return ( 
    <AuthContextProvider>
      <Navigation/>
    </AuthContextProvider>
  );
}