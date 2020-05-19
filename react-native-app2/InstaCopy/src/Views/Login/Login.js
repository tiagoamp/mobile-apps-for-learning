import React, {Fragment, useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import estilo from './estilo';


const Login = ({ navigation }) => {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const logar = async () => {
        if (usuario === 'tiagoamp' && senha === '1234') {
            console.warn('Yeah!!! Should navigate!');
            await AsyncStorage.setItem("user",usuario);
            navigation.navigate('Feed')
        } else { 
            console.warn('Fail!');
        }
    } 

  return (
    <Fragment>
        <View style={estilo.container}>
            <TextInput placeholder="User" style={estilo.inputs} 
                onChangeText={texto => setUsuario(texto)} />
            <TextInput placeholder="password" style={estilo.inputs} secureTextEntry={true} 
                onChangeText={texto => setSenha(texto)} />
        </View>
        <Button title="Login" onPress={logar} />
    </Fragment>
  );

};

export default Login;
