import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Alert, TouchableOpacity, Dimensions } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import TodoItem from '../components/TodoItem';

import TODOS from '../utils/data';

export default function TodoScreen({ navigation }) {

  const [todoList, setTodoList] = useState(TODOS);
  const [numOfActive, setNumOfActive] = useState(TODOS.filter(item => item.status === 'Active').length);
  const [numOfCompleted, setNumOfCompleted] = useState(TODOS.filter(item => item.status === 'Done').length);

  const onPress_CompletedOrActive_OpenDetail = (id) => {
    const foundIndex = todoList.findIndex(item => item.id === id);

    let newTodoList = Array.from(todoList);
    newTodoList[foundIndex].status = (newTodoList[foundIndex].status === 'Done' ? 'Active' : 'Done');

    setTodoList(newTodoList);
    setNumOfActive(newTodoList.filter(item => item.status === 'Active').length);
    setNumOfCompleted(newTodoList.filter(item => item.status === 'Done').length);
  };

  const onPress_AddTodo = (newTodo) => {
    let newTodoList = todoList.unshift(newTodo);
    
    setTodoList(newTodoList);
    setNumOfActive(newTodoList.filter(item => item.status === 'Active').length);
    setNumOfCompleted(newTodoList.filter(item => item.status === 'Done').length);
  };

  const onPress_AddTodoScreen = () => {
    navigation.navigate("Add", { func_AddTodo: (() => onPress_AddTodo()) });
  }

  const onPress_DeleteItem = (id) => {
    Alert.alert(
      'Warning',
      'Do you want to remove this todo?',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'OK', onPress: () => {
            const foundIndex = todoList.findIndex(item => item.id === id);

            let newTodoList = Array.from(todoList);
            newTodoList.splice(foundIndex, 1);

            setTodoList(newTodoList);
            setNumOfActive(newTodoList.filter(item => item.status === 'Active').length);
            setNumOfCompleted(newTodoList.filter(item => item.status === 'Done').length);

            // in case delete in detail screen, after accept to delete, it will go back todo screen
            navigation.navigate("Todo");
            ;
          }
        },
      ],
      { cancelable: true },
    );
  };

  const onPress_OpenDetail = (id) => {
    navigation.navigate("Detail", { func_DeleteItem: (() => onPress_DeleteItem(id)), id: id });
  };

  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.activeWrapper}>
          <Text style={styles.text}>Active ({numOfActive})</Text>
        </View>

        {todoList.map(item => {
          return (item.status === 'Active'
            ? (<TodoItem
              key={item.id}
              data={item}
              func_CompletedOrActive_OpenDetail={onPress_CompletedOrActive_OpenDetail}
              func_DeleteItem={onPress_DeleteItem}
              func_OpenDetail={onPress_OpenDetail} />)
            : null)
        })}

        <View style={styles.completedWrapper}>
          <Text style={styles.text}>Completed ({numOfCompleted})</Text>
        </View>

        {todoList.map(item => {
          return (item.status === 'Done'
            ? (<TodoItem
              key={item.id}
              data={item}
              func_CompletedOrActive_OpenDetail={onPress_CompletedOrActive_OpenDetail}
              func_DeleteItem={onPress_DeleteItem}
              func_OpenDetail={onPress_OpenDetail} />)
            : null)
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.addTouchable}
        onPress={() => onPress_AddTodoScreen()}
      >
        <MaterialCommunityIcons name={'checkbox-blank-outline'} size={25} ></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
}

TodoScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  scrollview: {
    paddingTop: Dimensions.get('window').height
  },
  activeWrapper: {
    borderWidth: 2,

    shadowRadius: 5,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
    backgroundColor: '#E1E1E1',
  },
  completedWrapper: {
    borderWidth: 2,

    shadowRadius: 5,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
    backgroundColor: '#E1E1E1',

    marginTop: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: '700'
  },
  addTouchable: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 70,
    height: 70,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: 10,
    right: 10,

    backgroundColor: '#fff',
    borderRadius: 35,
  }
});