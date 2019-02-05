import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, TextInput} from 'react-native';


export default class inputComentario extends Component {

    constructor() {
        super();
        this.state = { valorComentario: '' };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Adicione um comentário..." 
                        ref={input => this.inputComentario = input} 
                        onChangeText={texto => this.setState({valorComentario: texto})} />
                <TouchableOpacity onPress={() => { 
                            this.props.comentarioCallBack(this.props.idFoto, this.state.valorComentario, this.inputComentario);
                            this.setState({ valorComentario: '' });

                        }} >
                    <Image style={styles.icone} source={ require('../../resources/img/send.png') } />
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40
      }, 
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      icone: {
        width: 30,
        height: 30
      }
});