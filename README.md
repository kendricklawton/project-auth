# React Native Auth App
This is a sample authentication app built with React Native. It uses a native stack navigator for navigation and a custom `AuthContext` for managing authentication state.

## Prerequisites
* Node.js (v12 or later)
* React Native
* Expo CLI
* Back4App

## Installation
1. Clone the repository:
```
git clone https://github.com/kendricklawton/react-native-auth.git
```
2. Install dependencies:
```
cd react-native-auth
npm install
```
3. Start the Expo development server:
```
npm start
```
4. Use a mobile device or emulator to run the app.

## Usage
The app has six screens:
* Login Screen: Allows existing users to log in.
* Registration Screen: Allows new users to create an account.
* Profile Screen: Allows a logged in user to view and edit account details.
* Name Screen: Allows a logged in user to edit thier name. 
* Email Screen: Allows a logged in user to edit their email.
* Password Screen: Allows a logged in user to edit the password.

## Navigation
The app uses a native stack navigator to handle navigation between screens. The `Navigation` component in `Navigation.js` is responsible for rendering the appropriate screens based on the user's authentication state.

## Authentication
The app uses a custom AuthContext to manage authentication state. The `AuthContext` is created in `AuthContext.js` and used throughout the app to check if the user is logged in.

The useAuth hook can be used to access the authentication state and update it when necessary.

## Credits
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [React Navigation](https://reactnavigation.org/)
* [Back4App](https://www.back4app.com/)
* [React Hook Form](https://react-hook-form.com/)
* [React Native Material](https://www.react-native-material.com/)
