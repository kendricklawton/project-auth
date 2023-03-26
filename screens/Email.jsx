import { View, Text, SafeAreaView } from 'react-native';
import { Button, TextInput } from "@react-native-material/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useAuth } from "../contexts/AuthContext";
import Loading from './Loading';

const validationSchema = yup.object().shape({
    email: yup
    .string()
    .email()
    .required('Email is required'),
  });

export default function Email({navigation }) {
    const { updateEmail, loading } = useAuth();

    const onSubmit = data => {
        updateEmail(data.email)
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
            <Text style={{ fontSize: 18, fontWeight: '300' }}>Update Email</Text>
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
                name="email"
            />
            {errors.email && <View style={{ width: 380 }}><Text style={{ color: 'red' }}>{errors.email.message}</Text></View>}

            <Button
             onPress={handleSubmit(onSubmit)}
             color='#246EE9'
             style={{
                 width: 320
             }}
                title="Submit"
            />
  <View style={{height: 5}}/>
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