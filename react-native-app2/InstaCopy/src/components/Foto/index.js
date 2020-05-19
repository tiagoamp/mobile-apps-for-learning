import React, {Fragment} from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import estilo from './estilo';

const Foto = () => {
  return (
    <Image source={require("../../../res/img/caveira.jpg")} style={estilo.imagem} />
  );
};

export default Foto;
