import { StyleSheet, Text, View } from 'react-native'
import {Button} from 'galio-framework';
import React from 'react'
import{useNavigation}from '@react-navigation/native'


const Editprofilepage = () => {
  return (
    <View style={{margin:10, marginTop:10, flexDirection: 'row'}}>
        <Button 
        style={{alignSelf:'flex-start', backgroundColor: 'lightblue'}}
        onlyIcon icon="back" iconFamily="antdesign" iconSize={20} iconColor="#000"
        round
        size={'small'}
        title='Back' onPress={()=> {console.log('back')} }>
        Back
        </Button>
      <Text style={styles.title}>Edit Profile</Text>
    </View>
  )
}

export default Editprofilepage

const styles = StyleSheet.create({
title:{
    flex:2,
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold'
}
})