import { Text, View, SafeAreaView } from "react-native";
import { Button } from '@react-native-material/core';
import { useAuth } from "../contexts/AuthContext";

import Loading from './Loading';

export default function Profile({ navigation }) {
    const { user, signOut, loading } = useAuth();

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                color='#246EE9'
                style={{
                    width: 320
                }}
                onPress={() => {
                    navigation.navigate('Name');
                }}
                title={user ? 'Name: ' + user.get('firstName') + ' ' + user.get('lastName') : 'Name: No User'}
            />

            <View style={{ height: 5 }} />

            <Button
                color='#246EE9'
                style={{
                    width: 320
                }}
                onPress={() => {
                    navigation.navigate('Email');
                }}
                title={user ? 'Email: ' + user.get('email') : 'Email: No User'}
            />

            <View style={{ height: 5 }} />

            <Button
                color='#246EE9'
                style={{
                    width: 320
                }}
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Password', {
                      isForgotPassword: false,
                    });
                  }}
                title='Password'
            />

            <View style={{ height: 5 }} />

            <Button
                color='#246EE9'
                style={{
                    width: 320
                }}
                onPress={() => {
                    signOut();
                }}
                title='Sign Out'
            />

        </SafeAreaView>
    );
}