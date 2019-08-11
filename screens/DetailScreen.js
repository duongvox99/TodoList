import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function DetailScreen({ navigation }) {
  return (
    <View style={styles.container}>

    </View>
  );
}

DetailScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Detail',
    headerRight: <TouchableOpacity
      onPress={() => onPress_DeleteItemInDetail(navigation)}>
      <AntDesign name={'delete'} size={26} style={{ marginRight: 10 }}></AntDesign>
    </TouchableOpacity>,
  }
};

const onPress_DeleteItemInDetail = (navigation) => {
  let id = navigation.getParam('id');
  navigation.getParam('func_DeleteItem')(id);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
