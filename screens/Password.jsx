import { View, Text, SafeAreaView } from 'react-native';
import { Button, TextInput } from "@react-native-material/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useAuth } from "../contexts/AuthContext";
import Loading from './Loading';

const validationSchema = yup.object().shape({
    emailPassword: yup
    .string()
    .email()
    .required('Email is required'),
  });
export default function Password({navigation }) {
    const { upodatePassword, loading} = useAuth();

    const onSubmit = data => {
        upodatePassword(data.emailPassword)
        navigation.navigate('Profile');
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '300' }}>Enter Email To Update Password</Text>
            <View style={{height: 5}}/>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                    style={{ width: 320 }}
                        label="Email"
                        onChangeText={onChange}
                        value={value}
                        color='#246EE9'
                        autoCapitalize='none'
                    />
                )}
                name="emailPassword"
            />
            {errors.emailPassword && <View style={{ width: 320 }}><Text style={{ color: 'red' }}>{errors.emailPassword.message}</Text></View>}

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