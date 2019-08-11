import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import TodoScreen from '../screens/TodoScreen';
import ActiveScreen from '../screens/ActiveScreen';
import CompleteScreen from '../screens/CompleteScreen';
import DetailScreen from '../screens/DetailScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

const TodoStack = createStackNavigator(
  {
    Todo: TodoScreen,
    Detail: DetailScreen,
    Add: AddTodoScreen,
  },
  {
    initialRouteName: "Todo"
  }
);

TodoStack.navigationOptions = {
  tabBarLabel: 'All Todo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={{ focused } ? 'md-add-circle' : 'md-add-circle-outline'}
    />
  ),
};

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
  }
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={{ focused } ? 'md-list-box' : 'md-list'} />
  ),
};

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
  }
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={{ focused } ? 'md-checkmark-circle' : 'md-checkmark-circle-outline'} />
  ),
};


const tabNavigator = createBottomTabNavigator(
  {
    ActiveStack,
    TodoStack,
    CompleteStack,
  },

  {
    initialRouteName: 'TodoStack',
  }
);

tabNavigator.path = '';

export default tabNavigator;
