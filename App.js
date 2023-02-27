import React, {Component} from 'react';
import {View} from 'react-native';
import Nav from './src/nav'

class Index extends Component {
  state = {  } 
  render() { 
    return (
      <View style={{flex:1}}>
        <Nav/>
      </View>
    );
  }
}
 
export default Index;