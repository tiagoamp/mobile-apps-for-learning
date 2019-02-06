/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList} from 'react-native';
import Post from './Post'; 

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

type Props = {};
export default class Feed extends Component<Props> {

  constructor() {
    super();
    this.state = { fotos: [] };
  }

  componentDidMount() {
    this.setState( { fotos: [ {id: 1, usuario: 'tiagoamp', likeada: false, likers: [], comentario: 'comentario 01', comentarios: [{id: '1', login: 'login', texto: 'texto'}]}, 
                              {id: 2, usuario: 'ozzy', likeada: true, likers: ['tiagoamp', 'max'], comentario: 'comentario 02', comentarios: [{id: '2', login: 'login2', texto: 'texto2'}]}, 
                              {id: 3, usuario: 'max', likeada: false, likers: [], comentario: '', comentarios: []} 
                            ] } );    
  }

  like(idFoto){
    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    let novaLista = [];      
    
    if(!foto.likeada){
      novaLista = [...foto.likers, {usuario: 'tiagoamp'}];
    } else{
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'tiagoamp';
      });
    }

    const fotoAtualizada = { ...foto, likeada: !foto.likeada, likers: novaLista };
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada:foto);
    this.setState({fotos: fotos});
  }

  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if(valorComentario === '') return;
    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    const novaLista = [ ...foto.comentarios, { id: valorComentario, login: 'meuUsuario', usuario: 'meuUsuario', texto: valorComentario } ];
    const fotoAtualizada = { ...foto, comentarios: novaLista };
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    this.setState({fotos});
    inputComentario.clear();
  }

  render() {

    return (
      <FlatList style={styles.container} data={this.state.fotos} keyExtractor={item => item.id}
          renderItem={ ({item}) => 
              <Post foto={item} likeCallBack={this.like.bind(this)} comentarioCallBack={this.adicionaComentario.bind(this)} /> 
          }
        />

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

const margem = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margem
  }
})
