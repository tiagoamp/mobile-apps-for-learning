import React, {Fragment, useState} from 'react';
import { View, Image, TextInput, FlatList } from 'react-native';
import Cabecalho from './src/components/Cabecalho/Cabecalho';
import Foto from './src/components/Foto/Foto';
import Comentario from './src/components/Comentario/Comentario';


const App = () => {

  const [fotos, setFotos] = useState([
    { id:1, usuario: "Ozzy Osbourne" },
    { id:2, usuario: "Max Cavalera" },
    { id:3, usuario: "Tom Araya" }
  ]);

  return (
    <View>
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

export default App;
