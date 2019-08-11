import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Header } from 'react-navigation';

export default function AddTodoScreen({ navigation }) {
  const funcCreateNewTodoItem = navigation.getParam('funcCreateNewTodoItem');

  const [bodyText, setBodyText] = useState("");
  const [detailText, setDetailText] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled keyboardVerticalOffset={Header.HEIGHT + 20} behavior="padding" style={styles.form} >
        <ScrollView>
          <View style={styles.bodyWrapper}>
            <View style={styles.statusWrapper}>
              <AntDesign name={'star'} size={30} color={'green'} style={{ textAlign: 'center' }}></AntDesign>
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
          <TouchableOpacity style={styles.button} onPress={() => funcCreateNewTodoItem(bodyText, detailText)}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

AddTodoScreen.navigationOptions = ({ navigation}) => {
  return {
    title: 'Add new todo',
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
