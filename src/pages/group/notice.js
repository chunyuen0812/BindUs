import {FlatList, StyleSheet,Text, View } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native';

var DATA =[
]

const Item = ({id, initiate,votetype, info, votecount, voteflag}) => {
      return(
        <View style={styles.votecontainer}>
          <Text style= {styles.votetitle}>{info}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between', marginHorizontal:10}}>
            <Text style= {styles.name}>Initiator : {initiate}</Text>
            <Text style={styles.subtitle}>Current vote count: {votecount}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            {voteflag==0?<Button size={'small'} style={{height:30, width:80}} round color='#2bc700'onPress={()=>{votecount+=1;voteflag=1; console.log(voteflag)}}>YES</Button>:null}
            {voteflag==0?<Button size={'small'} style={{height:30, width:80}}round color='#ff2a00'onPress={()=>{voteflag=1; console.log(voteflag)}}>NO</Button>:null}
          </View>
        </View>
    );
  };

  const renderItem = ({ item }) => <Item 
    initiate={item.initiate}
    id={item.id}
    votetype={item.votetype}
    info={item.info}
    votecount={item.votecount}
    voteflag={item.voteflag}
    />;

const Notice=({route})=> {
  const navigation=useNavigation();
  if (route.params){
  const votedetail=route.params.votedetail;
  const votetype=route.params.votetype;
  const inituser=route.params.inituser;
  DATA.push({id:DATA.length+1, votetype:votetype,info:votedetail,initiate:inituser,votecount:0,voteflag:0})
  }
  
    return (
      <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Notice" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
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
      marginHorizontal:10,
      marginBottom:5,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    votetitle:{
      marginHorizontal:10,
      fontWeight:'bold',
      fontSize:20,
    },
    name:{
      fontSize:18,
    },
    subtitle:{
      alignSelf:'center',
      fontsize:18,
    },
    },
  )

export default Notice