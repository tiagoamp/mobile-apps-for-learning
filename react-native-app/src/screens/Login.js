import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View styles={styles.form}>
                    <Text styles={styles.titulo}>Test React Native App</Text>
                    <TextInput styles={styles.input} placeholder="Usuário..." onChangeText={texto => this.setState({usuario: texto})}/>
                    <TextInput styles={styles.input} placeholder="Senha..." onChangeText={texto => this.setState({senha: texto})}/>
                    <Button title="Login" onPress={() => console.warn("Login")} />
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
    }
});