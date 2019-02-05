import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, Text, TextInput} from 'react-native';


export default class Likes extends Component {

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    render() {
        const { foto, likeCallBack } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={likeCallBack}>
                    <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
                </TouchableOpacity>
                <Text style={styles.likes}> {foto.likers.length} curtidas</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botaoDeLike: {
        width: 40,
        height: 40, 
        marginBottom: 10
      },
      likes: {
        fontWeight: 'bold'
      }    
});                    