/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Button,
    Platform, Linking,
    StyleSheet, SafeAreaView, ScrollView,
    Text, CheckBox, ToastAndroid,
    View,
    Alert, TouchableHighlight, TouchableOpacity, Image, TextInput
} from 'react-native';

import TextInputMask from 'react-native-text-input-mask';
import {NavigationActions, DrawerActions} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import {styles} from '../styles/styles'
import colors from '../styles/colors'
import metrics from '../styles/metrics'
import fonts from '../styles/fonts'
import globals from '../config/GLOBALS'

// const FBSDK = require('react-native-fbsdk');
// const {
//     LoginButton,
//     AccessToken,
//     GraphRequest,
//     GraphRequestManager
// } = FBSDK;


const instructions = Platform.select({
    ios: 'sadasdasdad to reload,\n' +
        'Cmd+D oasdasdasdasd dev menu',
    android: 'Dsadasdadad,\n' +
        'Shakeaaaahhh mulekeeeeeeee dev menu',
});


type Props = {};
export default class TelaCadastrese extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            email: '',
            name: '',
            celular: '',
            password: '',
            passwordConf: '',

            checkBoxVal: false,
        };
    }

    render() {

        return (
            <KeyboardAwareScrollView contentContainerStyle={styles2.precontainer}>
                <Spinner visible={this.state.isLoading} textContent={"Carregando.."} textStyle={{color: '#FFF'}}/>

                <ScrollView contentContainerStyle={styles2.container}>
                    <Image
                        style={{height: 100, width: 220, marginBottom: metrics.padding}}
                        source={require('../../img/logo.jpg')}
                    />
                    <Text style={styles.text1b}>
                        {`Cadastre-se\n\n`}
                    </Text>

                    <TextInput
                        style={styles.txtInputb}
                        placeholder="Seu Nick"
                        textAlign={'left'}
                        onChangeText={(name) => this.setState({name})}
                        // value={this.state.usuario}
                    />

                    <TextInput
                        style={styles.txtInputb}
                        keyboardType="email-address"
                        placeholder="E-mail"
                        textAlign={'left'}
                        onChangeText={(formatted) => this.setState({email: formatted})}
                    />

                    <TextInput
                        style={styles.txtInputb}
                        placeholder="Senha"
                        textAlign={'left'}
                        secureTextEntry={true}
                        onChangeText={(senha) => {
                            this.setState({password: senha});
                        }}
                        // value={this.state.passw}
                    />

                    <TextInput
                        style={styles.txtInputb}
                        placeholder="Confirmar senha"
                        textAlign={'left'}
                        secureTextEntry={true}
                        onChangeText={(senha) => {
                            this.setState({passwordConf: senha});
                        }}
                        // value={this.state.passw}
                    />


                    <TouchableOpacity
                        disabled={((this.state.email === "") || (this.state.name === "") || (this.state.passwordConf === ""))}
                        style={[styles.button, {backgroundColor: ((this.state.email === "") || (this.state.name === "") || (this.state.passwordConf === "")) ? colors.grey : colors.blue}]}

                        onPress={() => {
                            this.setState({isLoading: true});
                            this.preCadastro();
                        }}>

                        <Text style={styles.buttonTxt}> CADASTRAR </Text>
                    </TouchableOpacity>


                    <View styles={{}}>
                        {/*<TouchableOpacity*/}
                        {/*style={{marginTop: 25 }}*/}
                        {/*onPress={() => {*/}
                        {/*Alert.alert('Ir Para tela de registro ou reaver senha');*/}
                        {/*// this.props.navigation.navigate('CadUsuario');*/}
                        {/*}}>*/}

                        {/*<Text style={styles.text3b}> Condições de serviço </Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

        );
    }


    preCadastro = () => {
        if (this.state.password !== this.state.passwordConf) {
            alert("Passwords não conferem!");
            this.setState({isLoading: false});

            return;
        }

        // console.log("::: satete cadatro ======>");
        // console.log(this.state);

        fetch(globals.BASE_URL + "/auth/register/", {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false});
                console.log("::::: preCadastro :::::");
                console.log(responseJson);

                if (responseJson.error){
                    Alert.alert(
                        'Erro',
                        responseJson.error,
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: true}
                    );
                } else{

                    //SUCESSO!

                    ToastAndroid.showWithGravity(
                        'Cadastrado com sucesso!',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );

                    this.props.navigation.dispatch(NavigationActions.back())
                }


            })
            .catch((error) => {
                this.setState({isLoading: false});
                console.error(error);
            });
    }
}

const styles2 = StyleSheet.create({
    precontainer: {
        backgroundColor: colors.iceBackgr,
        flex: 1,
        alignItems: 'stretch',

        // alignItems: 'center',

        // alignItems: 'flex-end',
        justifyContent: 'center',
    },
    container: {
        flexGrow: 1,
        // width: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.iceBackgr,
        // alignSelf: 'center',
    },
    faceLogin: {
        // flex:1,
        width: 200,
        height: 41,
        marginVertical: metrics.padding,
    },
    googleLogin: {
        // flex:1,
        width: 200,
        height: 42,
        marginVertical: metrics.padding,


    },
});