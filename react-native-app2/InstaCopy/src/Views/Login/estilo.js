import {StyleSheet, Dimensions} from 'react-native';

const largura = Dimensions.get("screen").width;


const estilo = StyleSheet.create({
    container: {
        //flexGrow: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    inputs: {
        width: largura * 0.8
    }
});


export default estilo;