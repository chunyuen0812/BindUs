import {FlatList, StyleSheet,Text, View } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react'

var DATA =[
    {
        id:'1',
        votetype:'New Member',
        info:'John',
        initiate:'User 1',
        votecount:0,
        voteflag:0,
    },
]

const Item = ({id, initiate,votetype, info, votecount, voteflag}) => {
    if(voteflag!=1){
      return(
        <View style={styles.votecontainer}>
          <Text style= {styles.votetitle}>{votetype} : {info}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between', marginHorizontal:10}}>
            <Text style= {styles.name}>Initiator : {initiate}</Text>
            <Text style={styles.subtitle}>Current vote count: {votecount}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
            <Button size={'small'} round color='#2bc700'onPress={()=>{votecount+=1;voteflag=1; console.log(voteflag)}}>YES</Button>
            <Button size={'small'} round color='#ff2a00'onPress={()=>{voteflag=1; console.log(voteflag)}}>NO</Button>
          </View>
        </View>
    );
    }  
  };

  const renderItem = ({ item }) => <Item 
    initiate={item.initiate}
    id={item.id}
    votetype={item.votetype}
    info={item.info}
    votecount={item.votecount}
    voteflag={item.voteflag}
    />;

export class Notice extends Component {
  render() {
    return (
      <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Notice" 
        onLeftPress={()=>this.props.navigation.navigate('Grouplong')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View>
            <FlatList 
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}/>
        </View>
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
    votecontainer:{
      margin:5,
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    votetitle:{
      flex:1,
      fontWeight:'bold',
      fontSize:20,
    },
    name:{
      fontSize:18,
    },
    subtitle:{
      fontsize:18,
    },
    },
  )

export default Notice