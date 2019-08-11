import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Alert, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TodoItem from '../components/TodoItem';

import TODOS from '../utils/data';

export default function TodoScreen({ navigation }) {

  const [todoList, setTodoList] = useState(TODOS);
  const [numOfActive, setNumOfActive] = useState(TODOS.filter(item => item.status === 'Active').length);
  const [numOfCompleted, setNumOfCompleted] = useState(TODOS.filter(item => item.status === 'Done').length);

  // navigation.setParams({ data: 'abc' });
  
  const onPress_CompletedOrActive_OpenDetail = (id) => {
    const foundIndex = todoList.findIndex(item => item.id === id);

    setTodoItemData(id, (todoList[foundIndex].status === 'Done' ? 'Active' : 'Done'), todoList[foundIndex].body, todoList[foundIndex].detail);
  };

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
            setTodoItemData(id, "", "", "");

            // in case delete in detail screen, after accept to delete, it will go back todo screen
            navigation.navigate("Todo");
            ;
          }
        },
      ],
      { cancelable: true },
    );
  };

  const onPress_OpenDetail = (dataTodoItem) => {
    const { id, status, body, detail } = dataTodoItem;
    navigation.navigate("Detail", {
      dataTodoItem: dataTodoItem,
      func_DeleteItem: (() => onPress_DeleteItem(id)),
      funcSaveEdittedTodoItem: ((id, status, body, detail) => onPress_EditTodoItem(id, status, body, detail))
    });
  };

  const onPress_AddTodoScreen = () => {
    navigation.navigate("Add", { funcCreateNewTodoItem: ((body, detail) => onPress_CreateNewTodoItem(body, detail)) });
  }

  const onPress_CreateNewTodoItem = (body, detail) => {
    setTodoItemData(todoList[0].id - 1, 'Active', body, detail) ? navigation.navigate("Todo") : null;
  };

  const onPress_EditTodoItem = (id, status, body, detail) => {
    setTodoItemData(id, status, body, detail) ? navigation.navigate("Todo") : null;
  };

  const setTodoItemData = (id, status, body, detail) => {
    // status = "" -> delete this item with this is

    const foundIndex = todoList.findIndex(item => item.id === id);
    if (foundIndex === -1) {
      if (body == "") {
        Alert.alert(
          'Warning',
          'Invalid input! Please check again...',
          [
            {
              text: 'OK', onPress: () => {
                return false;
              }
            },
          ],
        );
      }
      else {
        let newItem = {
          id: todoList[0].id - 1,
          status: 'Active',
          body: body,
          detail: detail
        };
        let newTodoList = Array.from(todoList);
        newTodoList.unshift(newItem);

        setTodoList(newTodoList);
        setNumOfActive(newTodoList.filter(item => item.status === 'Active').length);
        setNumOfCompleted(newTodoList.filter(item => item.status === 'Done').length);

        return true;
      }

    }
    else {
      let newTodoList = Array.from(todoList);

      if (status == "") {
        newTodoList.splice(foundIndex, 1);
      }
      else {
        if (body == "") {
          Alert.alert(
            'Warning',
            'Invalid input! Please check again...',
            [
              {
                text: 'OK', onPress: () => {
                  return false;
                }
              },
            ],
          );
        }
        else {
          newTodoList[foundIndex].status = status;
          newTodoList[foundIndex].body = body;
          newTodoList[foundIndex].detail = detail;

          setTodoList(newTodoList);
          setNumOfActive(newTodoList.filter(item => item.status === 'Active').length);
          setNumOfCompleted(newTodoList.filter(item => item.status === 'Done').length);

          return true;
        }
      }
    }
  }

  return (

    <View style={styles.container}>
      <ImageBackground source={require('../utils/background.jpg')} style={{ width: '100%', height: '100%' }}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <View style={styles.activeWrapper}>
            <Text style={styles.text}>Active ({numOfActive})</Text>
          </View>

          {todoList.map(item => {
            return (item.status === 'Active'
              ? (<TodoItem
                key={item.id}
                dataTodoItem={item}
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
                dataTodoItem={item}
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
          <Ionicons name={'md-add'} size={50} ></Ionicons>
        </TouchableOpacity>

      </ImageBackground>
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
    paddingTop: Dimensions.get('window').height,
    // backgroundColor: 'transparent'
  },
  activeWrapper: {
    borderWidth: 2,
    borderRadius: 10,

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
    borderRadius: 10,

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
    padding: 10,
    fontSize: 25,
    fontWeight: '700'
  },
  addTouchable: {
    borderWidth: 2,
    borderColor: '#3f7312',
    width: 70,
    height: 70,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: 10,
    right: 10,

    backgroundColor: '#89eb34',
    borderRadius: 35,
  },
});