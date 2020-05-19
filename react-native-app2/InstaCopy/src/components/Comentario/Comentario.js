import React, {Fragment, useState} from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import estilo from './estilo';

const Comentario = () => {

    const [estComentarios, setEstComentarios] = useState([]);

    let conteudoInput = "";
    let campoInput;

    const adicionarComentario = () => {
        console.warn(conteudoInput);
        campoInput.clear();
    }

  return (
    <View style={estilo.inline}>
        <TextInput placeholder={"Deixe seu comentário..."} style={{flex:1}} 
            ref={textInput => campoInput = textInput}
            onChangeText={texto => conteudoInput = texto }
        />
        <TouchableOpacity onPress={adicionarComentario}>
            <Image source={require("../../../res/img/send.png")} style={estilo.imgSend} />
        </TouchableOpacity>
    </View>
  );
};

export default Comentario;
