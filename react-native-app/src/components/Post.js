import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = { foto: this.props.foto };
    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    like(){
        const fotoAtualizada = { ...this.state.foto, likeada: !this.state.foto.likeada };      
        this.setState({foto: fotoAtualizada});
    }

    exibeLegenda(foto) {
        if (foto.comentario === '') return;
        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.usuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        );
    }

    render() {
        const { foto } = this.state;

        return (
            <View>
                <View style={styles.cabecalho} >
                    <Image source={require('../../resources/img/reactnative.png')} style={styles.fotoDePerfil} />
                    <Text>{foto.usuario}</Text>
                </View>
                <Image source={require('../../resources/img/reactnative.png')} style={styles.foto} />
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
                    </TouchableOpacity>
                    <Text style={styles.likes}> {foto.likers.length} curtidas</Text>

                    {this.exibeLegenda(foto)}
                    
                </View>
            </View>
            
        // <ScrollView style={{marginTop: 20}}>
        //   {fotos.map(foto =>
        //       <View key={foto.id}>
        //         <Text>{foto.usuario}</Text>
        //         <Image source={require('./resources/img/reactnative.png')} style={{width:width, height:width}} />
        //       </View>
        //   )}
        // </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10, 
    borderRadius: 20, 
    width:40, height:40
  },
  foto: {
    width:width, 
    height:width
  }, 
  botaoDeLike: {
    width: 40,
    height: 40, 
    marginBottom: 10
  },
  rodape: {
    margin: 10
  }, 
  likes: {
    fontWeight: 'bold'
  }, 
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }
})
