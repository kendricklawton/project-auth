# React Native Authentication Template
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
3. To use this app with Back4App, you'll need to set up a Back4App account and create a new app. Follow these steps:
    1. Sign up for a Back4App account and create a new app.
    2. Navigate to the "Dashboard" of your app.
    3. Under "Core Settings," click on "Security & Keys."
    4. Copy the "Application ID," "Javascript Key," and "Server URL."
    5. Add the following `extra` JSON object to the `app.json` file with your Parse details like below.
```
{
"expo": {
  "extra": {
    "PARSE_APP_ID": "YOUR_PARSE_APP_ID",
    "PARSE_JAVASCRIPT_KEY": "YOUR_PARSE_JAVASCRIPT_KEY",
    "PARSE_SERVER_URL": "YOUR_PARSE_SERVER_URL"
    }
  }
}
```
4. Start the Expo development server:
```
npm start
```
5. Use a mobile device or emulator to run the app.



## Usage
The app has six screens:
* Login: Allows existing users to log in.
* Registration: Allows new users to create an account.
* Profile: Allows a logged in user to view and edit account details.
* Name: Allows a logged in user to edit thier name. 
* Email: Allows a logged in user to edit their email.
* Password: Allows a logged in user to edit the password.

## Navigation
The app uses a native stack navigator to handle navigation between screens. The `Navigation` component is responsible for rendering the appropriate screens based on the user's authentication state.

## Authentication
The app uses a custom AuthContext to manage authentication state. The `AuthContext`component is responsible for handling authentication and creating users. The `useAuth` hook is used to access the authentication context.

## Credits
* [Back4App](https://www.back4app.com/)
* [Expo](https://expo.io/)
* [React Hook Form](https://react-hook-form.com/)
* [React Native](https://reactnative.dev/)
* [React Native Material](https://www.react-native-material.com/)
* [React Navigation](https://reactnavigation.org/)
