import {FlatList, StyleSheet,Text, View } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react'

const DATA =[
    {
        id:'',
        votetype:'',
        votecount:0,
        voteflag:0,
    },
]

const Item = ({id, votetype, votecount}) => {
    return(
        <View>

        </View>
    );  
  };

  const renderItem = ({ item }) => <Item 
    id={item.id}
    votetype={item.votetype}
    votecount={item.votecount}/>;

export class Notice extends Component {
  render() {
    return (
      <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Notice" 
        onLeftPress={()=>this.props.navigation.navigate('Group')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View>
            <FlatList 
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}/>
        </View>

        <Text>Notice</Text>
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
    },
  )

export default Notice