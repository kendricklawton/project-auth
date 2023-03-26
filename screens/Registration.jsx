import { useState } from 'react';
import {SafeAreaView, View, Text } from 'react-native';
import { TextInput, Button, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useAuth } from "../contexts/AuthContext";
import Loading from './Loading';

const validationSchema = yup.object().shape({
  email: yup
  .string()
  .email("Please enter valid email")
  .required('Email is required'),
  firstName: yup
  .string()
  .required('Yout first name is required'),
  lastName: yup
  .string(),
  password: yup
  .string()
  .required('Password is required')
  .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
  .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
  .matches(/\d/, "Password must have a number")
  .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
  .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function Registration({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, loading } = useAuth();

  const onSubmit = data => {
    signUp(data.email.toLowerCase(), data.password, data.email);
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
    render={({ field: { onChange, value } }) => (
      <TextInput
      style={{width: 320}}
      color='#246EE9'
      onChangeText={onChange}
      value={value}
      label='Email'
      placeholder='Required'
      autoCapitalize='none'
      />
    )}
    name="email"
    />
    {errors.email && <View style={{ width: 320 }}><Text  style={{color: 'red'}}>{errors.email.message}</Text></View>}

    <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, value } }) => (
      <TextInput
      style={{width: 320}}
      color='#246EE9'
      placeholder='Required'
      label="First name"
      onChangeText={onChange}
      value={value}
      />
    )}
    name="firstName"
    />
    {errors.firstName && <View style={{ width: 320 }}><Text  style={{color: 'red'}}>{errors.firstName.message}</Text></View>}

    <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, value } }) => (
      <TextInput
      style={{width: 320}}
      color='#246EE9'
      placeholder='Optional'
      label="Last name"
      onChangeText={onChange}
      value={value}
      />
    )}
    name="lastName"
    />
    {errors.lastName && <View style={{ width: 320 }}><Text  style={{color: 'red'}}>{errors.lastName.message}</Text></View>}

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
      placeholder='Required'
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
    {errors.password && <View style={{ width: 320 }}><Text  style={{color: 'red'}}>{errors.password.message}</Text></View>}

    <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, value } }) => (
      <TextInput style={{width: 320}} secureTextEntry={!showPassword}
      label="Confirm Password" 
      onChangeText={onChange} 
      value={value} 
      color='#246EE9'
      placeholder='Required'
      trailing={props => (
        <IconButton
        icon={!showConfirmPassword ? <Icon size={30} name="eye-off" /> : <Icon size={30} name="eye"/>}
        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      )}
      />
    )}
    name="confirmPassword"
    />
    {errors.confirmPassword && <View style={{ width: 320 }}><Text  style={{color: 'red'}}>{errors.confirmPassword.message}</Text></View>}


    <Button
    color='#246EE9'
    onPress={() => {
      navigation.navigate('Login');
      }}
    style={{width: 320}}
    title="Already have an account?" />
    <View style={{height: 5}}/>

    <Button onPress={handleSubmit(onSubmit)}
          color='#246EE9'
      style={{width: 320}}
    title="Create account"
    />

    </SafeAreaView>
  );
}