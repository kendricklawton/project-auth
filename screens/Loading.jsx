import { View, ActivityIndicator, Text } from 'react-native';

const Loading = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator size="large" />
    <Text style={{ fontSize: 20, marginTop: 10}}>Loading...</Text>
    </View>
  );
};

export default Loading;
