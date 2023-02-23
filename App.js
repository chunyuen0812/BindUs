import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Nav from './src/nav'

class Index extends Component {
  state = {  } 
  render() { 
    return (
      <View style={{flex:1}}>
        <Nav></Nav>
      </View>
    );
  }
}
 
export default Index;