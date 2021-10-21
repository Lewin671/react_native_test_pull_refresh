import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  ToastAndroid,
  Button,
} from 'react-native';
import Constants from 'expo-constants';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log('start refreshing');
    let startTime = Date.parse(new Date());
    await wait(1000);
    const timeCost = Date.parse(new Date()) - startTime;
    const msg = 'finish refreshing, cost ' + timeCost + ' ms';
    console.log(msg);
    ToastAndroid.show(msg, 1000);
    setRefreshing(false);
  }, []);

  const onPress = React.useCallback(async () => {
    let startTime = Date.parse(new Date());
    setTimeout(() => {
      const timeCost = Date.parse(new Date()) - startTime;
      const msg = 'promise ' + timeCost + ' ms';
      console.log(msg);
      ToastAndroid.show(msg, 1000);
    }, 1000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text>Pull down to see RefreshControl indicator</Text>
        <Button title="test promise" onPress={onPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
