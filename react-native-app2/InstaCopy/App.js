/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import { ScrollView, View, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import Cabecalho from './src/components/Cabecalho';
import Foto from './src/components/Foto';

const informacoes = [
  { id:1, usuario: "Ozzy Osbourne" },
  { id:2, usuario: "Max Cavalera" },
  { id:3, usuario: "Tom Araya" }
];

const App = () => {
  return (
    <View>
      {
        <FlatList 
          data={informacoes}
          keyExtractor={item => item.id.toString()}
          renderItem={ ( { item } ) => 
            <Fragment>
              <Cabecalho nomeUsuario={item.usuario} />
              <Foto />
            </Fragment>
          } 
        />       
      }           
    </View>
  );
};

export default App;
