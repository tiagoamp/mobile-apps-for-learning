import React, {Fragment, useState} from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Foto from '../../components/Foto/Foto';
import Comentario from '../../components/Comentario/Comentario';


const Feed = () => {

  const [fotos, setFotos] = useState([
    { id:1, usuario: "Ozzy Osbourne" },
    { id:2, usuario: "Max Cavalera" },
    { id:3, usuario: "Tom Araya" }
  ]);

  return (
    <View style={{marginTop: 5}}>
      <StatusBar backgroundColor="grey" barStyle="light-content" />
      {
        <FlatList 
          data={fotos}
          keyExtractor={item => item.id.toString()}
          renderItem={ ( { item } ) => 
            <Fragment>
              <Cabecalho nomeUsuario={item.usuario} />
              <Foto />
              <Comentario />
            </Fragment>
          } 
        />       
      }           
    </View>
  );
};

export default Feed;
