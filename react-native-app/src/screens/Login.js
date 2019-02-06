import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, TextInput, Button, AsyncStorage} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor() {
        super();
        this.state = { usuario: '', senha: '', mensagem: '' };
    }

    efetuaLogin() {
        const fakeToken = 'f@keT0ken';
        AsyncStorage.setItem('token', fakeToken);
        AsyncStorage.setItem('usuario', this.state.usuario);
        //return AsyncStorage.getItem('token');
    }

    render() {
        return (
            <View style={styles.container}>
                <View styles={styles.form}>
                    <Text styles={styles.titulo}>Test React Native App</Text>
                    <TextInput styles={styles.input} placeholder="Usuário..." onChangeText={texto => this.setState({usuario: texto})} autoCapitalize="none" />
                    <TextInput styles={styles.input} placeholder="Senha..." onChangeText={texto => this.setState({senha: texto})} secureTextEntry={true} />
                    <Button title="Login" onPress={this.efetuaLogin.bind(this)} />
                    <Text style={styles.mensagem}>
                        {this.state.mensagem}
                    </Text>
                </View>                
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }, 
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
});