/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet, ToastAndroid,
    Text, Modal, DatePickerAndroid, TimePickerAndroid,
    View, Dimensions,
    TouchableOpacity, DeviceEventEmitter,
    Alert, TextInput, TouchableHighlight, Image, ScrollView, WebView, AsyncStorage
} from 'react-native';
import {Tile, List, Icon, ListItem, Button, ButtonGroup} from 'react-native-elements';
import moment from 'moment';
import {NavigationActions} from 'react-navigation';
import Dialog from "react-native-dialog";

import {TextMask, TextInputMask, MaskService} from "react-native-masked-text";
import Spinner from 'react-native-loading-spinner-overlay';

import {styles} from '../styles/styles'
import colors from '../styles/colors'
import metrics from '../styles/metrics'
import fonts from '../styles/fonts'
import globals from '../config/GLOBALS'


const instructions = Platform.select({
    ios: 'ola,\n' +
        'voce esta usando IOS',
    android: 'oi,\n' +
        'voce esta usando ANDROID',
});

const fonteNORMAL = {};
const fonteMAIOR = {widthtimes: 1, heigthtimes: 1,};
const fonteMaiorVertical = {widthtimes: 0, heigthtimes: 1};
const fonteMaiorHorzontal = {widthtimes: 1, heigthtimes: 0};


type Props = {};
export default class TelaMain extends Component<Props> {

    state = {
        user: {},

        listaTasks: [],
        visible: true,
        modalVisible: false,
        redefinirSenha_visible: false,
        novaTarefa: "",
    };

    constructor(props) {
        super(props);
        console.log(":::::: constructor MainTela :L::::::: ");

        //linha original::::::
        //linha para teste::::
        // const params = {user: {usuario: 'teste',nome: 'Thiago C L da Silva',  id: 83, email: 'a@a.com', avatar: '83_avatar.jpg'}};
        const params = this.props.navigation.state.params;
        this.state = {
            user: params.user,
            listaTasks: [],
            visible: true,
            modalVisible: false,
            redefinirSenha_visible: false,
            novaTarefa: "",

        };

    }


    componentDidMount() {
        console.log(":::::: componentDidMount MainTela :L::::::: ");
        console.log(this.state.user);

        this.consultaLista();
        this.setState({visible: false});
    }

    consultaLista = async (  ) => {
        fetch(globals.BASE_URL + "/select/lista/user_id/", {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.user.id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false});
                console.log("::::: lista consultada!! :::::");
                console.log(responseJson);

                if (responseJson.error){
                    //SUCESSO!
                    ToastAndroid.showWithGravity(
                        responseJson.error,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                } else{
                    this.setState({listaTasks: responseJson})
                }
            })
            .catch((error) => {
                this.setState({isLoading: false});
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            });
    }

    salvaLista = ( lista ) => {
        if (lista.length < 1){
            return
        }

        // console.log("::: satete cadatro ======>");
        // console.log(this.state);

        fetch(globals.BASE_URL + "/save/lista_user/", {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.user.id,
                lista: lista,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false});
                console.log("::::: salvaLista :::::");
                console.log(responseJson);

                if (responseJson.error){
                    //SUCESSO!
                    ToastAndroid.showWithGravity(
                        responseJson.error,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                } else{
                    //SUCESSO!
                    ToastAndroid.showWithGravity(
                        'Lista salva!',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
            })
            .catch((error) => {
                this.setState({isLoading: false});
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            });
    }


    render() {
        return (
            <View style={styles2.precontainer}>
                <Spinner visible={this.state.visible} textContent={"Carregando.."} textStyle={{color: '#FFF'}}/>

                {/*DIALOG ADD TASK*/}
                {/*DIALOG ADD TASK*/}
                {/*DIALOG ADD TASK*/}
                <Dialog.Container visible={this.state.redefinirSenha_visible}>
                    <Dialog.Title>Nova tarefa</Dialog.Title>
                    <Dialog.Input
                        // label={'oi'}
                        //keyboardType={'email-address'}
                        onChangeText={(text) => {
                            console.log(text);
                            this.setState({novaTarefa: text})


                        }}
                    />
                    <Dialog.Button label="Cancelar" onPress={() => {
                        this.setState({redefinirSenha_visible: false})
                    }}/>
                    <Dialog.Button
                        label="Adicionar"
                        onPress={() => {
                            this.setState({
                                redefinirSenha_visible: false
                            });
                            this.addTarefa();
                        }}
                    />
                </Dialog.Container>

                {/*HEADER*/}
                {/*HEADER*/}
                {/*HEADER*/}

                <View style={{
                    height: 50,
                    borderBottomWidth: 1, borderBottomColor: colors.lightgrafit,
                    // backgroundColor: colors.iceBegeBackgr,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                }}
                >
                    <TouchableHighlight
                        style={{height: 45, width: 45, alignItems: 'center', justifyContent: 'center'}}

                        underlayColor={colors.alphaGrey}
                        onPress={() => {
                            this.props.navigation.dispatch(NavigationActions.back())
                        }}
                    >
                        <Icon
                            type='material-community'
                            name='arrow-left'
                            size={fonts.bigger}
                            color={colors.grafit}/>
                    </TouchableHighlight>
                    {/*<Image*/}
                    {/*style={{maxHeight: 70, maxWidth: 20}}*/}
                    {/*source={require('../../img/logo.jpg')}*/}
                    {/*/>*/}
                    <Text
                        style={{fontSize: fonts.big, color: colors.black, fontWeight: 'bold'}}
                    >
                        {"Tarefas de " + this.state.user.nome}
                    </Text>

                    <TouchableHighlight
                        style={{height: 45, width: 45, alignItems: 'center', justifyContent: 'center'}}

                        underlayColor={colors.alphaGrey}
                        onPress={() => {
                            this.setState({
                                redefinirSenha_visible: true
                            });
                        }}
                    >
                        <Icon
                            type='material-community'
                            name='plus-circle'
                            size={fonts.bigger}
                            color={colors.grafit}/>
                    </TouchableHighlight>
                </View>

                {/*TAREFAS*/}
                {/*TAREFAS*/}
                {/*TAREFAS*/}
                <ScrollView
                    contentContainerStyle={styles2.container}
                >
                    {
                        (this.state.listaTasks.length === 0) && (
                            <View>
                                <Text>
                                    Cadastre alguma tarefa
                                </Text>
                            </View>
                        )
                    }
                    {
                        (this.state.listaTasks.length > 0) && (
                            this.renderLista()
                        )
                    }


                </ScrollView>

            </View>


        );
    }


    renderLista() {
        console.log("::::::::::::entreou renderT ::::::::::");
        // console.log(this.state.listaTickets);
        return (
            this.state.listaTasks.map(
                (task, key) => (
                    <View
                        key={key} style={[styles2.viewLista,
                        {marginTop: metrics.margin}]}
                    >

                        {/*check btrn*/}
                        {/*check btrn*/}
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width:30,
                                height:30,
                                backgroundColor:(task.checked==='1' ? '#000':'#fff' ),
                                borderRadius:50,
                            }}

                            onPress={() => {
                                let lista = this.state.listaTasks;

                                if (lista[key].checked === '1'){
                                    lista[key].checked = '0';
                                } else{
                                    lista[key].checked = '1';
                                }

                                this.salvaLista(lista);
                                this.setState({listaTasks: lista })
                            }}
                        >
                            <Icon
                                type='material-community'
                                name={'check-all'}
                                size={fonts.bigger}
                                color={"#01a699"}/>
                        </TouchableOpacity>


                        {/*desc*/}
                        {/*desc*/}
                        <View style={{width: '70%'}}>
                            <Text style={{flexWrap: 'wrap'}}>
                                {task.desc}
                            </Text>
                        </View>




                        {/*delete btrn*/}
                        {/*delete btrn*/}
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width:30,
                                height:30,
                                backgroundColor:( '#fff'  ),
                                borderRadius:50,
                            }}

                            onPress={() => {
                                let lista = this.state.listaTasks;

                                lista.splice(key, 1);
                                this.salvaLista(lista);
                                this.setState({listaTasks: lista })
                            }}
                        >
                            <Icon
                                type='material-community'
                                name='delete'
                                size={fonts.bigger}
                                color={colors.grafit}/>
                        </TouchableOpacity>
                    </View>


                ))
        )
    }

    addTarefa() {

        let lista = this.state.listaTasks;

        lista.unshift({
            desc: this.state.novaTarefa,
            checked : false,
        });

        this.salvaLista(lista);
    }
}

const styles2 = StyleSheet.create({
    precontainer: {
        backgroundColor: colors.iceBackgr,
        flex: 1,
        // height: 90,
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },
    container: {
        backgroundColor: colors.white,
        // flex:1,
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    viewTitulo: {
        marginHorizontal: metrics.margin2,

    },
    titulo: {
        paddingVertical: metrics.margin2,
        // paddingHorizontal: metrics.margin2,
        fontSize: fonts.bigbigger,
        color: colors.grafit,
    },
    local: {
        // height: 50,
        // marginHorizontal: metrics.padding2,
        // paddingHorizontal: metrics.margin2,

        color: colors.grafit,
        fontSize: fonts.regular

    },
    data: {
        marginHorizontal: metrics.padding2,
        color: colors.grafit,

    },
    viewTotal: {
        height: 45,
        marginTop: metrics.margin3,
        marginHorizontal: metrics.padding2,
        backgroundColor: colors.grafit,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    total: {
        marginHorizontal: metrics.padding2,
        color: colors.white,
        fontSize: fonts.big,
        // fontWeight: "bold",
    },
    viewLista: {
        margin: metrics.padding,
        padding: metrics.padding0,
        // borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.grafit,
        paddingBottom: metrics.padding0,
        flexDirection: 'row',
        // padding: metrics.padding,
        alignItems: 'stretch',
        justifyContent: "space-between",

    },
    viewItem: {
        // minHeight: 50,
        // padding: metrics.padding,
        // borderRadius: 4,
        // borderWidth: 1.5,
        borderColor: colors.grafit,
        // borderBottomWidth: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginHorizontal: metrics.margin0,

    },
    ticketName: {

        color: colors.grafit,
        fontSize: fonts.regular,
        fontWeight: 'bold',
    },
    ticketPrice: {
        color: colors.grafit,
        fontSize: fonts.small,

    },

    viewBotaoComprar: {
        justifyContent: "center",
        alignItems: 'stretch',
        marginHorizontal: metrics.padding2,
        // padding: metrics.padding,
        // borderRadius: 4,
        borderWidth: 1.5,
        borderColor: colors.grafit,
        // borderTopWidth: 0.5,
        borderTopColor: colors.lightgrafit,

    },
    plus: {
        height: 36,
        width: 36

    },

    /*
    styles modal
     */

    vwList: {},
    txTitulo: {
        fontWeight: 'bold',
        fontSize: fonts.big,
        color: colors.black,

    },
    txTituloTicket: {
        fontWeight: 'bold',
        fontSize: fonts.regular,
        color: colors.black,
    },


});
