import { Image,FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import{ NavBar, Button} from 'galio-framework';
import React, { Component, useEffect, useState } from 'react';
import ProgressBar from 'react-native-progress/Bar'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
//npm install react-native-swiper-flatlist --save
//npm install react-native-progress --save
// fetch group info from db

var gid='1';
const db = SQLite.openDatabase('maindb.db');
let n=0;
const windowHeight = Dimensions.get('window').height;
const STAGE=[
{
    id:'1',
    goal: 8000,
    date:'30/11/2023',
},
{
    id:'2',
    goal: 6000,
    date:'30/01/2024',
},
{
    id:'3',
    goal: 4000,
    date:'01/04/2024',
},
{
    id:'4',
    goal: 2000,
    date:'30/04/2024',
},
];

const windowWidth = Dimensions.get('window').width-20;

const GroupPage=({route})=> {//main program---------------------------------------------------------------------
  var goaltype=route.params.goaltype;
  var histheight='35%'
  if (goaltype=='short'){
    histheight='50%'
  }
  const navigation=useNavigation();   
  if(route.params){
    gid=route.params.gid;
  }

  function stageprogress(n){
    var x= goalprogress;
    for (let i = 0; i <= n; i++) {
        x-=STAGE[i].goal;
      }
    x = x+STAGE[n].goal;
    if(x>=STAGE[n].goal){
        return STAGE[n].goal;
    } else if (x>=0){
        return x
    } else{
      return 0
    }
}
const renderStage=({item, index})=> {
  return(
      <View>
          <View style={{flexDirection:'row', margin:5}}>
            <Text style={styles.subtitle1}> Stage: {item.id}</Text>
            <Text style={styles.subtitle2}>{item.id}/{STAGE.length}</Text>
          </View>
          <View style={{flexDirection:'row', margin:5}}>
            <Text style={styles.subtitle1}> ${stageprogress(index)}/ ${item.goal}</Text>
            <Text style={styles.subtitle2}> {Math.round(stageprogress(index)/item.goal*100)}%</Text>
          </View>
          <View style={{margin:5,marginBottom:10, borderBottomWidth:StyleSheet.hairlineWidth}}>
              <ProgressBar style={{margin:5, alignSelf:'center'}} color={'lightblue'} progress={stageprogress(index)/item.goal} width={windowWidth}/>
              <View style={{flexDirection:'row'}}>
                  <Text style={styles.subtitle1}> End Date:</Text>
                  <Text style={styles.subtitle2}>{item.date}</Text>
              </View>
          </View>
      </View>
  );
}

  const [contribute,setContribute]=useState([]);
  const [deposithist,setDeposithist]=useState([]);
  const [target, setTarget]=useState(20000);
  const [memberno, setMemberno]=useState(1);
  const [goalinfo,setGoalinfo]=useState({});
  const [goalprogress, setGoalprogress]=useState(0);

  useEffect(()=>{
    if(route.params){
      gid=route.params.gid;
      updateprogress
    }
    db.transaction(tx=>{
      tx.executeSql(
        'SELECT Goal.Goal_ID AS gid, Goal_name, SUM(Deposit_amount)AS GoalProgress, end_time, Goal_amount FROM Goal INNER JOIN Deposit ON Goal.Goal_ID=Deposit.Goal_ID WHERE Goal.Goal_ID=?',
        [gid],
        (tx, result)=>{
          setGoalinfo(result.rows.item(0))
          console.log(goalinfo);
        },
        (tx, error)=>{
          console.log(error)
        });
      tx.executeSql(
        'SELECT Deposit.Account_ID AS aid, SUM(Deposit_amount)AS membercontrib, name FROM Account INNER JOIN Deposit ON Account.Account_ID=Deposit.Account_ID WHERE Deposit.Goal_ID=? GROUP BY Deposit.Account_ID',
        [gid],
        (tx, result)=>{
          var temp=[];
          for(i=0;i<result.rows.length;i++)
            temp.push(result.rows.item(i));
          if (contribute.length<=1)
            setContribute(temp);
          setMemberno(result.rows.length);
          console.log(contribute, memberno)
        },
        (tx, error)=>{
          console.log(error)
        });
      tx.executeSql(
        'SELECT Deposit_ID AS did, Deposit.Account_ID AS aid, Deposit_amount, name, Deposit_time FROM Account INNER JOIN Deposit ON Account.Account_ID=Deposit.Account_ID WHERE Deposit.Goal_ID=? ORDER BY Deposit_time DESC',
        [gid],
        (tx, result)=>{
          var temp= []
          for(i=0;i<result.rows.length;i++)
            temp.push(result.rows.item(i));
          if (deposithist.length<=1)
            setDeposithist(temp);
          console.log(deposithist);
        },
        (tx, error)=>{
          console.log(error)
        });
    })
  },[])

  function updateprogress(){
    setGoalprogress(goalinfo.GoalProgress)
    setTarget(goalinfo.Goal_amount)
  }

  const ItemA = ({id, Amount, name ,index}) => {
    return(
    <View style={{margin:5, flexDirection:'column',height:70, width:70}}>
        <Image source={require('../../res/icon.jpeg')} style={styles.image}/>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text numberOfLines={1} style={{color:'green', alignSelf:'center', fontSize:12, margin:1}}>{Math.round(Amount/target*100)}%</Text>
    </View>
    );
  };
  const renderItemA = ({ item, index }) => <ItemA 
    id={item.aid}
    Amount={item.membercontrib}
    name={item.name}
    index={index}
    />;

  const ItemB = ({id, name, payment, date, time }) => {
    return(
    <View style={{margin:5, flexDirection:'row', borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'lightgrey', justifyContent:'space-around'}}>
        <Image source={require('../../res/icon.jpeg')} style={styles.image}/>
        <View style={{margin:5, flexDirection:'row', justifyContent:'space-around'}}>
          <Text numberOfLines={1} style={styles.name2}>{name}</Text>
          <Text numberOfLines={1} style={{color:'green', alignSelf:'center', fontSize:16, margin:10}}>+{payment}</Text>
        </View>
        <View style={{flexDirection:'column', justifyContent:'center'}}>
          <Text style={{fontSize:12,color:'grey'}}>{date}</Text>
          <Text style={{fontSize:12,color:'grey',alignSelf:'flex-end'}}>{time}</Text>
        </View>
    </View>
    ); 
  };

  const renderItemB = ({ item }) => <ItemB 
    id={item.did} 
    name={item.name}
    payment={item.Deposit_amount}
    date={JSON.stringify(item.Deposit_time).slice(1,11)}
    time={JSON.stringify(item.Deposit_time).slice(12,20)}
    />;

    return (
      <View style={{flexDirection:'column', height:windowHeight}}>
        <View>
          <NavBar style={styles.header} titleStyle={styles.title} back 
          right={
          <Button onlyIcon icon="exclamationcircleo" iconFamily="antdesign" iconSize={40} color="warning" iconColor="#fff" style={{ width: 45, height: 45 }} onPress={()=>{console.log('Notice'); navigation.navigate('Notice')}}/>
          } 
          title={goalinfo.Goal_name} 
          onLeftPress={()=>navigation.navigate('Home')} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.subtitlea}> Goal Progress:</Text>
          {/*Button to prevent render error */}
          <Button round style={{fontSize:12, height:20, justifyContent:'center', width:150}} color='success' onPress={updateprogress}>Update progress</Button>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.subtitle1}> ${goalinfo.GoalProgress}/ ${goalinfo.Goal_amount}</Text>
          <Text style={styles.subtitle2}> {Math.round(goalinfo.GoalProgress/goalinfo.Goal_amount*100)}%</Text>
        </View>
        <ProgressBar style={{margin:5, alignSelf:'center'}} progress={goalprogress/target} width={windowWidth}/>
        <View style={{flexDirection:'row', borderBottomWidth:StyleSheet.hairlineWidth}}>
            <Text style={styles.subtitle1}> End Date:</Text>
            <Text style={styles.subtitle2}>{goalinfo.end_time}</Text>
        </View>
        <View>
        {goaltype=='long'?<SwiperFlatList
            index={0}
            data={STAGE}
            renderItem={renderStage}
        />:null}
        </View>
        <View style={{height:'20%'}}>
          <View style={{flexDirection:'row', height:24,margin:5}}>
            <Text style={styles.subtitlea}>Contribution:</Text>
            <Button onlyIcon icon="plus" iconFamily="antdesign" iconSize={25} color="lightgreen" iconColor="#fff" style={{ width: 30, height: 30, right: 10 }} onPress={()=>console.log('To contact list')}/>
          </View>
          <FlatList
          style={{marginHorizontal:10, marginVertical:5, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey'}}
          horizontal
          data={contribute}
          renderItem={renderItemA}
          keyExtractor={item => item.aid}/>
        </View>
        <View style={{flexDirection:'column', margin:5, height:histheight}}>
          <Text style={styles.subtitleb}>History:</Text>
          <FlatList
            style={{marginHorizontal:10,marginVertical:5, borderBottomWidth:StyleSheet.hairlineWidth}}
            data={deposithist}
            renderItem={renderItemB}
            keyExtractor={item => item.did}
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around', position:'absolute', bottom:5, alignSelf:'center', width:'90%'}}>
            {goalprogress>=target?<Button size={'small'} color={'success'} round style={{alignSelf:'center', margin:10}}>DONE!!</Button>:null}
            {goalprogress<target?<Button 
            size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>navigation.navigate('Deposit',{groupname:route.params.groupname, gid:gid})}>
            Deposit
            </Button>:null}
            {goalprogress<target?<Button 
            size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>navigation.navigate('Vote',{goaltype:route.params.goaltype, progress:goalprogress, target:target,endDate:endDate, memberCount:memberno})}>
            Vote
            </Button>:null}
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
    fontSize: 18,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitleb:{
    fontSize: 18,
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
  image:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:"lightgray",
    resizeMode: "center",
  },
  name:{
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 16,
  },
  name2:{
    width:'30%',
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 14,
  },
  hyperlink:{
    color:'blue',
    fontSize: 16,
    marginHorizontal:10,
    textDecorationLine: 'underline'
  }
})

export default GroupPage