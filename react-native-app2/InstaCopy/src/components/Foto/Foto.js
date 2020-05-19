import React, {Fragment, useState} from 'react';
import { Text, Image, TouchableOpacity, TextInput } from 'react-native';
import estilo from './estilo';

const Foto = () => {

  const [curtiu, setCurtiu] = useState(false);

  const handleImgCurtiu = () => {
    if (!curtiu) 
      return require("../../../res/img/s2.png");
    return require("../../../res/img/s2-checked.png");
  }

  const curtirFoto = () => {
    setCurtiu(!curtiu);
  }

  return (
    <Fragment>
      <Image source={require("../../../res/img/caveira.jpg")} style={estilo.imagem} />
      <Text>Descrição</Text>
      <TouchableOpacity onPress={curtirFoto}>
        <Image source={handleImgCurtiu()} style={estilo.like} />
      </TouchableOpacity>
    </Fragment>
  );
};

export default Foto;
