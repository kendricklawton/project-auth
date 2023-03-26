import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button ,TextInput, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useAuth } from "../contexts/AuthContext";
import Loading from './Loading';

const validationSchema = yup.object().shape({
  email: yup
  .string()
  .email("Please enter valid email")
  .required('Email is required'),
  password: yup
  .string()
  .required('Password is required'),
});

export default function SignIn({navigation}) {
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loading } = useAuth();

  const onSubmit = data => {
    signIn(data.email.toLowerCase(), data.password)
  }

  const handleForgotPassword = () =>  {
    console.log('Set up forgot password');
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });


  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{   flex: 1, alignItems: 'center', justifyContent: 'center'}}>

    <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, value} }) => (
      <TextInput
      style={{width: 320,}}
      label="Email"
      onChangeText={onChange}
      value={value}
      color='#246EE9'
      autoCapitalize='none'
      />
    )}
    name="email"
    />
    {errors.email && <View style={{ width: 320 }}><Text style={{color: 'red'}}>{errors.email.message}</Text></View>}


    <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, value } }) => (
      <TextInput
      style={{width: 320}}
      secureTextEntry={!showPassword}
      label="Password"
      onChangeText={onChange}
      value={value}
      color='#246EE9'
      trailing={props => (
        <IconButton
        icon={!showPassword ? <Icon size={30} name="eye-off" /> : <Icon size={30} name="eye"/>}
        onPress={() => setShowPassword(!showPassword)}
        />
      )}
      />
    )}
    name="password"
    />
    {errors.password && <View style={{
      width: 320
    }}><Text style={{color: 'red'}}>{errors.password.message}</Text></View>}

    <Button
    onPress={() => {
      navigation.navigate('Registration');
      }}
    color='#246EE9'
    style={{
        width: 320
    }}

    title="Need to create an account?" />
   
   <View style={{ height: 5 }} />
    <Button
    onPress={handleForgotPassword}
    color='#246EE9'
    style={{
        width: 320
    }}
  
    title="Forgot password?"
    />
 

 <View style={{ height: 5 }} />
    <Button
    onPress={handleSubmit(onSubmit)}
    color='#246EE9'
    style={{
        width: 320
    }}
    title="Login"
    />
    
  
    </SafeAreaView>
  );
}
