import { Alert, Image,FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
//npm install react-native-swiper-flatlist --save
//npm install react-native-progress --save
// fetch group info from db

const db = SQLite.openDatabase('maindb.db');
var groupname='group name'
var memberlist=[];
var votelist=[];
var gid='4'

const STAGE=[
{
    id:'1',
    goal: 8000,
    date:'10/02/2023',
},
{
    id:'2',
    goal: 6000,
    date:'20/02/2023',
},
{
    id:'3',
    goal: 4000,
    date:'07/03/2023',
},
{
    id:'4',
    goal: 2000,
    date:'20/03/2023',
},
];

const ItemA = ({id, name, profpic, vote}) => {
  return(
  <View style={{margin:5, flexDirection:'column', width:70}}>
      {vote==0?<Image source={require('../../res/icon.jpeg')} style={styles.image}/>:null}
      {vote==1?<Image source={require('../../res/icon.jpeg')} style={styles.imageyes}/>:null}
      {vote==2?<Image source={require('../../res/icon.jpeg')} style={styles.imageno}/>:null}
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
  </View>
  );
  
};

const windowWidth = Dimensions.get('window').width-20;

const renderStage=({item, index})=> {
    return(
        <View height={50}>
            <View style={{flexDirection:'row', margin:5}}>
              <Text style={styles.subtitle1}> Stage: {item.id}</Text>
              <Text style={styles.subtitle2}>{item.id}/{STAGE.length}</Text>
            </View>
            <View style={{flexDirection:'row', margin:5}}>
              <Text style={styles.subtitle1}> $0/ ${item.goal}</Text>
              <Text style={styles.subtitle2}> 0%</Text>
            </View>
            <View style={{margin:5,marginBottom:10, borderBottomWidth:StyleSheet.hairlineWidth}}>
                <ProgressBar style={{margin:5, alignSelf:'center'}} color={'lightblue'} progress={0/item.goal} width={windowWidth}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.subtitle1}> End Date:</Text>
                    <Text style={styles.subtitle2}>{item.date}</Text>
                </View>
            </View>
        </View>
    );
}

const renderItemA = ({ item,index }) => <ItemA 
  id={item.aid}
  name={item.name}
  vote={votelist[index].is_vote}
  />;

const windowHeight = Dimensions.get('window').height; 

function insertVote(vote){
  db.transaction(tx=>{
    tx.executeSql(
      'UPDATE Vote SET is_vote=? WHERE Goal_ID=? AND Vote_ID=0 AND Account_ID=1',
      [vote, gid],
      (tx, result)=>{
        console.log(result.rows.item(0));
      },
      (tx, error)=>{
        console.log(error)
      });
  })
}

const Pending=({route})=> { //main -------------------------------------------------------------------------------------------------------------------------
 const navigation=useNavigation();
 var goaltype=route.params.goaltype;
  var histheight='27%'
  if (goaltype=='short'){
    histheight='41%'
  }
  if (route.params.gid){
    gid=route.params.gid;
  }

  const [target, setTarget]=useState(20000)
  const [uservote, setUservote]=useState(0);
  const [memberno, setMemberno]=useState(1);
  var memberlist=[];
  useEffect(()=>{
    db.transaction(tx=>{
      tx.executeSql(
        'SELECT Goal_Group.Account_ID AS aid, name FROM Goal_Group INNER JOIN Account on Goal_Group.Account_ID=Account.Account_ID WHERE Goal_Group.Goal_ID=?',
        [gid],
        (tx, result)=>{
         for(i=0;i<result.rows.length;i++){
          memberlist.push(result.rows.item(i))
         }
         console.log(memberlist);
         setMemberno(result.rows.length);
        },
        (tx, error)=>{
          console.log(error)
        });
        tx.executeSql(
          'SELECT is_vote, Account_ID FROM Vote WHERE Goal_ID=? AND Vote_ID="0"',
          [gid],
          (tx, result)=>{
           for(i=0;i<result.rows.length;i++){
            votelist.push(result.rows.item(i))
           }
           console.log(votelist);
           setUservote(votelist[0].is_vote);
          },
          (tx, error)=>{
            console.log(error)
          });
          tx.executeSql(
            'SELECT Goal_amount FROM Goal WHERE Goal_ID=?',
            [gid],
            (tx, result)=>{
              setTarget(result.rows.item(0).Goal_amount);
              console.log(target);
            },
            (tx, error)=>{
              console.log(error)
            });
    })
  },[])
  
    return (
      <View style={{flexDirection:'column', height:windowHeight}}>
        <View>
          <NavBar style={styles.header} titleStyle={styles.title} back 
          title={route.params.groupname}  
          onLeftPress={()=>navigation.goBack()} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
        </View>
        <View style={{height:65, borderBottomWidth:StyleSheet.hairlineWidth}}>
          <Text style={styles.subtitleb}> Goal Progress:</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subtitle1}> $0/ ${target}</Text>
            <Text style={styles.subtitle2}> 0%</Text>
          </View>
          <ProgressBar style={{margin:5, alignSelf:'center'}} progress={0} width={windowWidth}/>
        </View>
        <View>
          {goaltype=='long'?<SwiperFlatList
            index={0}
            data={STAGE}
            renderItem={renderStage}
          />:null}
        </View>
        <View style={{flexDirection:'row',borderTopWidth:StyleSheet.hairlineWidth, height:30,margin:5}}>
          <Text style={styles.subtitlea}>Members:</Text>
        </View>
        <View>
          <FlatList
          style={{marginHorizontal:10, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey'}}
          horizontal
          data={memberlist}
          renderItem={renderItemA}
          keyExtractor={item => item.aid}/>
        </View>        
          <View style={styles.container}>
            <Text style={{fontSize:18}}>Each member is responsible for: ${target/memberno}</Text>
          </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly', marginVertical:10, position:'absolute', bottom:10, alignSelf:'center'}}>
          {uservote==0?<Button 
            size={'small'} color={'success'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>{setUservote(1); insertVote(1);console.log(vote); Alert.alert('You have accepted the invitation of '+groupname+'.');navigation.goBack()}}>
            Yes
            </Button>:null}
          {uservote==0?<Button 
            size={'small'} color="red" round style={{alignSelf:'center', margin:10}}
            onPress={()=>{setUservote(2);insertVote(2);console.log(vote); Alert.alert('You have declined the invitation of '+groupname+'.');navigation.goBack()}}>
            No
            </Button>:null}
          {uservote==1?<Text style={styles.subtitle3}>You have accepted the invitation, now waiting...</Text>:null}
          {uservote==2?<Text style={styles.subtitle3}>You have declined the invitation.</Text>:null}     
        </View>
      </View>
    )
  }


const styles= StyleSheet.create({
  header:{
    flexDirection:'row',
    marginTop:25,
    backgroundColor:'lightgrey',},
  title:{
    alignSelf:'center',
    fontSize: 32,
    fontWeight:'bold'
  },
  subtitlea:{
    flex:1,
    fontSize: 20,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitleb:{
    fontSize: 20,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitle1:{
    flex:1,
    fontSize: 16,
    marginHorizontal:10
  },
  subtitle2:{
    fontSize: 16,
    marginHorizontal:10
  },
  subtitle3:{
    fontSize: 26,
    marginHorizontal:10
  },
  image:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: 2,
    borderColor:"gray",
    resizeMode: "center",
  },
  imageyes:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: 2,
    borderColor:"green",
    resizeMode: "center",
  },
  imageno:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: 2,
    borderColor:"red",
    resizeMode: "center",
  },
  name:{
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 12,
  },
  name2:{
    width:'30%',
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 14,
  },
  container:{
    justifyContent:'center',
    marginHorizontal:5,
    marginBottom:5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomWidth:StyleSheet.hairlineWidth,
  },
})

export default Pending