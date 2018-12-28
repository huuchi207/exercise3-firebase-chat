/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import LoginScreen from "./screen/LoginScreen";
import ConversationScreen from "./screen/ConversationScreen";
import store from './redux/store';
import {Provider} from 'react-redux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Provider store = {store}>
            <MainView/>
        </Provider>
    );
  }
}
const AppNavigator = createStackNavigator(
    {
        LoginScreen,
        ConversationScreen
    },
    {
        initialRouteName: "LoginScreen",
        defaultNavigationOptions: {

        }
    }
    )
;

const MainView = createAppContainer(AppNavigator);