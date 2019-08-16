import React from 'react';
import {createAppContainer, createStackNavigator, createDrawerNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import {Text, TouchableOpacity, YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import TelaLogin from '../telas/TelaLogin';
import TelaCadastrese from "../telas/TelaCadastrese";
import TelaMain from "../telas/TelaMain";

export const RootStack = createStackNavigator({
    Login: {
        screen: TelaLogin,
    },
    Cadastrese: {
        screen: TelaCadastrese,
    },
    TelaMain: {
        screen: TelaMain,
    },
},
{
    initialRouteName: 'Login',
     headerMode: 'none',
});

const ROUTER = createAppContainer(RootStack);

export default ROUTER;




