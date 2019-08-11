import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Header, HeaderBackButton } from 'react-navigation';

export default function DetailScreen({ navigation }) {
  const dataTodoItem = navigation.getParam('dataTodoItem');
  const { id, status, body, detail } = dataTodoItem;

  const funcSaveEdittedTodoItem = navigation.getParam('funcSaveEdittedTodoItem');

  const [bodyText, setBodyText] = useState(body);
  const [detailText, setDetailText] = useState(detail);

  // const isChangedTodoItemData = () => {
  //   if (body === bodyText && detail === detailText) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled keyboardVerticalOffset={Header.HEIGHT + 20} behavior="padding" style={styles.form} >
        <ScrollView>
          <View style={styles.bodyWrapper}>
            <View style={styles.statusWrapper}>
              <AntDesign name={status == 'Active' ? 'star' : 'checkcircle'} size={30} color={status === 'Active' ? 'green' : 'blue'} style={{ textAlign: 'center' }}></AntDesign>
            </View>
            <View style={styles.bodyTextWrapper}>
              <TextInput
                style={styles.bodyTextInput}
                editable={true}
                multiline={true}
                value={bodyText}
                placeholder="What is your todo?"
                blurOnSubmit={true}
                returnKeyType="done"
                onChangeText={text => setBodyText(text)}
              />
            </View>
          </View>
          <View style={styles.detailWrapper}>
            <View style={styles.iconDetailWrapper}>
              <AntDesign name={'menuunfold'} size={26} style={{ textAlign: 'center' }}></AntDesign>
            </View>
            <View style={styles.detailTextWrapper}>
              <TextInput
                style={styles.detailTextInput}
                editable={true}
                multiline={true}
                value={detailText}
                placeholder="More detail"
                returnKeyType="done"
                onChangeText={text => setDetailText(text)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => funcSaveEdittedTodoItem(id, status, bodyText, detailText)}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

DetailScreen.navigationOptions = ({ navigation}) => {
  return {
    title: 'Detail',
    headerRight: <TouchableOpacity
      onPress={() => onPress_DeleteItemInDetail(navigation)}>
      <AntDesign name={'delete'} size={26} style={{ marginRight: 10 }}></AntDesign>
    </TouchableOpacity>,

    headerLeft: <HeaderBackButton onPress={() => {
      // if (DetailScreen.isChangedTodoItemData()) {
        navigation.goBack();
      // }
      // else {
      //   Alert.alert(
      //     'Warning',
      //     'Do you want to save your changes?',
      //     [
      //       {
      //         text: 'No'
      //       },
      //       {
      //         text: 'Yes', onPress: () => {
      //           navigation.getParam('funcSaveEdittedTodoItem')(DetailScreen.id, DetailScreen.status, DetailScreen.bodyText, DetailScreen.detailText);
      //           ;
      //         }
      //       },
      //     ],
      //   );
      // }
    }} />,
  }
};

const onPress_DeleteItemInDetail = (navigation) => {
  let id = navigation.getParam('id');
  navigation.getParam('func_DeleteItem')(id);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyWrapper: {
    flexDirection: 'row',
  },
  statusWrapper: {
    flex: 0.1,
    padding: 10
  },
  bodyTextWrapper: {
    flex: 0.9,
    paddingTop: 10,
    paddingRight: 10
  },
  bodyTextInput: {
    width: '100%',
    minHeight: 40,
    fontSize: 22,
    fontWeight: '700'
  },
  detailWrapper: {
    flexDirection: 'row',
  },
  iconDetailWrapper: {
    flex: 0.2,
    paddingTop: 20,
    paddingLeft: 10,
  },
  detailTextWrapper: {
    flex: 0.8,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  detailTextInput: {
    width: '100%',
    minHeight: 40,
    fontSize: 20,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 30
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },

});
