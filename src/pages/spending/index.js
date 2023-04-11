import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavBar } from 'galio-framework'
import { useNavigation } from '@react-navigation/native';

const Spending = () => {
    const navigation=useNavigation();
  return (
    <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Spend" 
        onLeftPress={()=>navigation.navigate('Assign')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
      <Text>Spending</Text>
    </View>
  )
}

export default Spending

const styles = StyleSheet.create({
    header:{
        marginTop:25,
        backgroundColor:'lightgrey',
    },
    title:{
        fontSize: 32,
        color:'black',
        fontWeight:'bold'
    },
})