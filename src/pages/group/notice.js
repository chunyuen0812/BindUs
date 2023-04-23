import {FlatList, StyleSheet,Text, View } from 'react-native'
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

const db = SQLite.openDatabase('maindb.db');
var gid='1';

function updateVote(voteflag,voteid,gid){
  db.transaction(tx=>{
    tx.executeSql(
      'UPDATE Vote SET is_vote=? WHERE Vote_ID=? AND Goal_ID=? AND Account_ID=?',
      [voteflag,voteid,gid,'1'],
      (tx, result)=>{
        console.log('update success', result.rows)
      })
  })
}

const Notice=({route})=> {//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const navigation=useNavigation();
   
  const [votelist,setVotelist]=useState([]);
  const [votecount,setVotecount]=useState([]);

useEffect(()=>{
  console.log('sql')
  if (route.params){
    gid=route.params.gid
    }
  db.transaction(tx=>{
    tx.executeSql(
      'SELECT Vote_ID, Vote_type, Vote_detail, is_vote FROM Vote WHERE Goal_ID=? AND Account_ID=?',
      [gid, '1'],
      (tx,result)=>{
        var temp=[]
        for(i=0;i<result.rows.length;i++)
          temp.push(result.rows.item(i));
        setVotelist(temp);
        console.log('votelist: ',votelist);
    },
    (tx, error)=>{
      console.log(error)
    });  
    tx.executeSql(
      'SELECT Vote_ID, SUM(is_vote) AS v_count FROM Vote WHERE Goal_ID=? AND is_vote!=0 GROUP BY vote_type',
      [gid],
      (tx,result)=>{
        var temp=[]
        for(i=0;i<result.rows.length;i++)
          temp.push(result.rows.item(i));
        setVotecount(temp);
        console.log('votecount: ',votecount);
    },
    (tx, error)=>{
      console.log(error)
    })
  })
},[])

const renderItem = (votecount, item, index) => {
  return(
    <View style={styles.votecontainer}>
      <Text style= {styles.votetitle}>{item.vote_detail}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between', marginHorizontal:10}}>
        <Text style={styles.subtitle}>Current vote count: {votecount[index]==null?0:votecount[index].v_count}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        {item.is_vote==0?<Button size={'small'} style={{height:30, width:80}} round color='#2bc700'onPress={()=>{updateVote('1', item.Vote_ID, gid);}}>YES</Button>:null}
        {item.is_vote==0?<Button size={'small'} style={{height:30, width:80}}round color='#ff2a00'onPress={()=>{updateVote('2', item.Vote_ID, gid);}}>NO</Button>:null}
      </View>
    </View>
);
};

    return (
      <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Notice" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View>
            <FlatList 
              data={votelist}
              extraData={votecount}
              renderItem={({item, index})=>renderItem(votecount, item, index)}
              keyExtractor={item => item.Vote_ID}/>
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
      fontSize:18,
    },
    },
  )

export default Notice