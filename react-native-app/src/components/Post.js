import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = { foto: this.props.foto }
    }
    
    like(){
        const { foto } = this.state;
        let novaLista = [];      
        if(!foto.likeada){
          novaLista = [...foto.likers, {usuario: 'tiagoamp'}];
        } else{
          novaLista = foto.likers.filter(liker => {
            return liker.login !== 'tiagoamp';
          });
        }
        const fotoAtualizada = { ...foto, likeada: !foto.likeada, likers: novaLista }      
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

    adicionaComentario(valorComentario, inputComentario) {
        if(valorComentario === '') return;

        const novaLista = [ ...this.state.foto.comentarios, { id: valorComentario, 
            login: 'meuUsuario', usuario: 'meuUsuario', texto: valorComentario } ];
        
        const fotoAtualizada = { ...this.state.foto, comentarios: novaLista };
        
        this.setState({foto: fotoAtualizada});
        inputComentario.clear();
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

                    <Likes foto={foto} likeCallBack={this.like.bind(this)} />

                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario => 
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    
                    <InputComentario comentarioCallback={this.adicionaComentario.bind(this)} />

                </View>
            </View>
            
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
  rodape: {
    margin: 10
  }, 
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }, 
  input: {
    flex: 1,
    height: 40
  }, 
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icone: {
    width: 30,
    height: 30
  }
})
