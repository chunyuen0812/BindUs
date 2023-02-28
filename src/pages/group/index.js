import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export class GroupPage extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Group</Text>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  header:{
    marginTop: 25,
    backgroundColor:'lightgrey',
    alignItems:'center',
  },
  title:{
    fontSize: 32,
    fontWeight:'bold'
  },
})

export default GroupPage