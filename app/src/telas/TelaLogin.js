/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, AsyncStorage,
    Alert, TextInput, TouchableHighlight, Image, ScrollView
} from 'react-native';
import {CheckBox} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import {NavigationActions, DrawerActions, StackActions} from 'react-navigation';


import {styles} from '../styles/styles'
import colors from '../styles/colors'
import metrics from '../styles/metrics'
import fonts from '../styles/fonts'


import globals from '../config/GLOBALS'
import DeviceInfo from "react-native-device-info";


type Props = {};
export default class TelaLogin extends Component<Props> {

    state = {
        //desablitar quando finalizar testes
        // login: 'teste@datacase.br',
        // passw: '2018',
        login: 'a@a.com',
        passw: '111',

        visible: false,
        redefinirSenha_visible: false,
        emailEsquecido: ''
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
    }

    render() {
        return (
            <View style={styles2.precontainer}>
                <Spinner visible={this.state.visible} textContent={"Carregando.."} textStyle={{color: '#FFF'}}/>
                {/*dialog esqueceu senha*/}
                <Dialog.Container visible={this.state.redefinirSenha_visible}>
                    <Dialog.Title>Redefinir senha</Dialog.Title>
                    <Dialog.Description>
                        Favor digite seu email de cadastro. Enviaremos instruções para redefinir a senha.
                    </Dialog.Description>
                    <Dialog.Input
                        // label={'oi'}
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{
                            // console.log(text);
                            this.setState({emailEsquecido: text})
                        }}
                    />
                    <Dialog.Button label="Cancela" onPress={() => {
                        this.setState({redefinirSenha_visible: false})
                    }}/>
                    <Dialog.Button
                        label="Enviar"
                        onPress={() => {
                            this.setState({
                                redefinirSenha_visible: false
                            });
                            this.negocioEsqueciSenha();
                        }}
                    />
                </Dialog.Container>



                <ScrollView
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                >
                    <View
                        style={styles2.container}>

                        {/*{instructions}*/}
                        <Image
                            style={{height: 100, width: 220, marginBottom: metrics.padding}}
                            source={require('../../img/logo.jpg')}
                        />

                        <Text style={[styles.text2, {marginHorizontal: metrics.padding}]}>
                            {`\n\n\nENTRAR:\n\n`}
                        </Text>

                        <TextInput
                            style={styles.txtInput}
                            keyboardType="email-address"
                            placeholder="Email / Usuário"
                            onChangeText={(login) => this.setState({login: login})}
                            value={this.state.login.trim().toLowerCase()}
                            underlineColorAndroid={colors.black}
                            placeholderTextColor={colors.black}
                        />

                        <TextInput
                            style={styles.txtInput}
                            placeholder="Senha"
                            secureTextEntry={true}
                            onChangeText={(passw) => this.setState({passw})}
                            value={this.state.passw.trim().toLowerCase()}
                            underlineColorAndroid={colors.black}
                            placeholderTextColor={colors.black}
                        />


                        <TouchableOpacity
                            //todo testeee
                            // disabled={( (this.state.login==="") || (this.state.passw==="") )}
                            style={[styles.button, {backgroundColor: ((this.state.login === "") || (this.state.passw === "")) ? colors.grey : colors.blue}]}
                            onPress={() => {
                                this.negocioLogin();
                            }}>

                            <Text style={styles.buttonTxt}> ENTRAR </Text>
                        </TouchableOpacity>

                        <View styles={{}}>
                            <TouchableOpacity
                                style={{marginTop: 25}}
                                onPress={() => {
                                    this.setState({redefinirSenha_visible: true})
                                }}>
                                <Text style={styles.text3}> Esqueceu a senha? </Text>
                            </TouchableOpacity>

                        </View>

                        <View styles={{}}>
                            <TouchableOpacity
                                style={{marginTop: 25}}
                                onPress={() => {
                                    // Alert.alert('Ir Para tela de registro ou reaver senha');
                                    this.props.navigation.navigate('Cadastrese', {negocioLogin: this.negocioLoginFromCad});
                                }}>

                                <Text style={styles.text3}> Cadastre-se </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>

            </View>

        );
    }




    negocioLogin = () => {
        const nav = this.props.navigation.navigate;
        this.setState({visible: true});
        fetch(globals.BASE_URL + "/auth/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.login,
                password: this.state.passw
            }),
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log(":::: resp negocioLogin ::::");
                console.log(responseJson);
                this.setState({visible: false});

                if (responseJson !== null){
                    if (responseJson.error !== undefined) {
                        console.warn(responseJson.error);
                        Alert.alert(
                            'Atenção erro',
                            responseJson.error,
                            [
                                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: true}
                        );

                        return responseJson;
                    } else {
                        if (responseJson.id){
                            let user = responseJson;
                            this.props.navigation.navigate('TelaMain', {user: user});
                        }

                        return responseJson;
                    }
                } else{
                    Alert.alert(
                        'Atenção',
                        "Usuario nao encontrao..",
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: true}
                    );
                }
            })
            .catch((error) => {
                console.warn(error);
                this.setState({visible: false});
                Alert.alert(
                    'Atenção erro',
                    error,
                    [
                        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: true}
                );
            });
    };


    negocioEsqueciSenha() {
        Alert.alert(
            'Atenção',
            "Redefinição de senha enviada com sucesso!",
            [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true}
        );
    }


}

const styles2 = StyleSheet.create({
    precontainer: {
        backgroundColor: colors.iceBackgr,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    container: {
        flex: 1,
        // width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.iceBackgr,
        // alignSelf: 'center',
    },
    faceLogin: {
        // flex:1,
        width: 200,
        height: 42,
        marginVertical: metrics.padding,
    },
    googleLogin: {
        // flex:1,
        width: 200,
        height: 41,
        marginVertical: metrics.padding,


    },
});
