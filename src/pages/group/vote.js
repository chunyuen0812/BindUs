import {StyleSheet,Text, View } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react'

class Vote extends Component {
  render() {
    return (
      <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Vote" 
        onLeftPress={()=>this.props.navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
    header:{
      marginTop:25,
      backgroundColor:'lightgrey',
    },
    title:{
      fontSize: 32,
      color:'black',
      fontWeight:'bold'
    },
    name:{
      fontSize:18,
    },
    subtitle:{
      fontsize:18,
    },
    },)

export default Vote