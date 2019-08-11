import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function AddTodoScreen({ navigation }) {
  const [bodyText, setBodyText] = useState('');
  // const [detailText, setDetailText] = useState('');

  const onAddTodo = () => {
    let newTodo = {
      
      // detail: detailText,
      
      id: 0,
      status: 'Active',
      body: bodyText,
    };
    navigation.getParam('func_AddTodo')(newTodo);
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
      // style={}
      >
        <ScrollView contentContainerStyle={styles.scrollview}>
          <View syle={styles.inputWrapper}>

            <TextInput
              style={styles.todoInput}
              editable={true}
              multiline={true}
              autoFocus={true}
              value={bodyText}
              onChangeText={text => setBodyText(text)}
            />
          </View>
          {/* <View syle={styles.inputWrapper}>
            <TextInput
              style={styles.todoInput}
              editable={true}
              multiline={true}
              autoFocus={true}
              value={detailText}
              onChangeText={text => setDetailText(text)}
            />
          </View> */}
          <TouchableOpacity style={styles.button} onPress={onAddTodo}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

AddTodoScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Add new Todo',
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  todoInput: {
    width: '100%',
    minHeight: 40,
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 22
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
    fontWeight: 'bold'
  }
});
