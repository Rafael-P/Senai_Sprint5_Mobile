import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import api from './src/services/api';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      listaConsultas : []
    };
  }

  buscarConsultas = async () => {
    const resposta = await api.get ('/Consultas');

    const dadosDaApi = resposta.data;
    this.setState({ listaConsultas : dadosDaApi });
  };

  componentDidMount(){
    this.buscarConsultas();
  }

  render () {
  return(
    <View style={styles.container}>
      <Text>{'Consultas'.toUpperCase()}</Text>

    <View>
      <FLatList
      contentContainerStyle={styles.mainBodyConteudo}
      data={this.state.listaConsultas}
      keyExtractor={this.renderizaItem}
      />
    </View>
    </View>
  );
  }

  renderizaItem = ({item}) => (
    <View style={styles.flatItemLinha}>
      <View>
        <Text>{item.idConsulta}</Text>
        <Text>{item.idPaciente}</Text>
        <Text>{item.idMedico}</Text>
        <Text>{item.idStatusConsulta}</Text>
        <Text>{item.DataConsulta}</Text>
        <Text>{item.HorarioConsulta}</Text>
        <Text>{item.DescricaoAtendimento}</Text>
      </View>
    </View>
  );

}//fim

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //conteudo da lista 

  mainBodyConteudo : {
    paddingTop : 30,
    paddingRight : 50,
    paddingLeft : 50
  },

  flatItemLinha : {
    flexDirection : 'row',
    borderBottomWidth : 0.9,
    borderBottomColor : 'blue'
  }

});
