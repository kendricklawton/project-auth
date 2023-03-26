import { View, Text, SafeAreaView } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useAuth } from "../contexts/AuthContext";
import Loading from './Loading';

const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
});

export default function Name({navigation }) {
    const { updateName, loading } = useAuth();

    async function onSubmit(data) {
        updateName(data.firstName, data.lastName)
        navigation.navigate('Profile');
    };

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '300' }}>Update Name</Text>
            <View style={{height: 5}}/>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={{ width: 320 }}
                        label="First Name"
                        onChangeText={onChange}
                        value={value}
                        color='#246EE9'
                    />
                )}
                name="firstName"
            />
            {errors.firstName && <View style={{ width: 320 }}><Text style={{ color: 'red' }}>{errors.firstName.message}</Text></View>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={{ width: 320 }}
                        label="Last Name"
                        onChangeText={onChange}
                        value={value}
                        color='#246EE9'
                    />
                )}
                name="lastName"
            />
            {errors.lastName && <View style={{ width: 320 }}><Text style={{ color: 'red' }}>{errors.lastName.message}</Text></View>}
  
            <Button
                onPress={handleSubmit(onSubmit)}
                color='#246EE9'
                style={{
                    width: 320
                }}
                title="Submit"
            />
            <View style={{ height: 5 }} />
            <Button
                onPress={() => {
                    navigation.navigate('Profile');
                    }}
                    color='#246EE9'
                    style={{
                        width: 320
                    }}
                title="Cancel"
            />
        </SafeAreaView>
    );

}