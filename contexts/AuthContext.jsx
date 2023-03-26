import { createContext, useContext, useState } from "react";
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

const { PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, PARSE_SERVER_URL } = Constants.manifest.extra;

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

const authContext = createContext();

export function AuthContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function updateAccount(type, accounts) {
    setLoading(true);
    user.set(type, accounts);
    return await user.save()
      .then(() => {
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      }).finally(() => {
      setLoading(false);
      });
  }

  async function signIn(username, password) {
    setLoading(true);
    return await Parse.User.logIn(username, password)
    .then(async (loggedInUser) => {
      const currentUser = await Parse.User.currentAsync();
      setUser(currentUser);
      return true;
    })
    .catch((error) => {
      Alert.alert('Error!', error.message);
      return false;
    }).finally(() => {
    setLoading(false);
    });
  }

  async function signOut() {
    setLoading(true);
    return await Parse.User.logOut()
    .then(async () => {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser === null) {
        setUser(currentUser);
      }
      return true;
    })
    .catch((error) => {
      Alert.alert('Error!', error.message);
      return false;
    }).finally(() => {
    setLoading(false);
    });
  }

  async function signUp(username, password, email) {
    setLoading(true);
    return await Parse.User.signUp(username, password, {
      email: email,
    })
    .then(async (createdUser) => {
      Alert.alert(
        'Success!',
        `User ${createdUser.get(
          'username',
        )} was successfully created! Verify your email to login`,
      );
      await Parse.User.logOut();
      return true;
    })
    .catch((error) => {
      Alert.alert('Error!', error.message);
      return false;
    }).finally(() => {
    setLoading(false);
    });
  };

  async function updateName(firstName, lastName) {
    setLoading(true);
    user.set('firstName', firstName);
    user.set('lastName', lastName);
    return await user.save()
      .then(() => {
        Alert.alert(
          'Success!',
          `Your name has been updated.`,
        );
        signOut();
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      }).finally(() => {
      setLoading(false);
      });
  };


  async function updateEmail(email) {
    setLoading(true);
    user.set('email', email);
    user.set('username', email);
    return await user.save()
      .then(() => {
        Alert.alert(
          'Success!',
          `Please check ${email} to proceed with updating email.`,
        );
        signOut();
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      }).finally(() => {
      setLoading(false);
      });
  };

  async function updatePassword(email) {
    setLoading(true);
    return await Parse.User.requestPasswordReset(email)
      .then(() => {
        Alert.alert(
          'Success!',
          `Please check ${email} to proceed with password reset.`,
        );
        signOut();
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      }).finally(() => {
      setLoading(false);
      });
  };

  return (
    <authContext.Provider
      value={{
        loading,
        signIn,
        signOut,
        signUp,
        updateEmail,
        updateName,
        updatePassword,
        user,
      }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
