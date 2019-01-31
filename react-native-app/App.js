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
import Post from './src/components/Post'; 

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = { fotos: [] };
  }

  componentDidMount() {
    this.setState( { fotos: [ {id: 1, usuario: 'tiagoamp', likeada: false}, 
                              {id: 2, usuario: 'ozzy', likeada: true}, 
                              {id: 3, usuario: 'max', likeada: false} 
                            ] } );    
  }

  render() {

    return (
      <FlatList style={styles.container} data={this.state.fotos} keyExtractor={item => item.id}
          renderItem={ ({item}) => 
              <Post foto={item} /> 
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})
