import { Image,FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
//npm install react-native-swiper-flatlist --save
//npm install react-native-progress --save
// fetch group info from db

const db = SQLite.openDatabase('maindb.db');
var grouplist = [];
var grpcontribution=[];
var grpdeposit=[];

let n=0;
const windowHeight = Dimensions.get('window').height;
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

const endDate=STAGE[STAGE.length-1].date;
function stageprogress(n){
    var x= grouplist['SUM(Deposit_amount)'];
    for (let i = 0; i <= n; i++) {
        x-=STAGE[i].goal;
      }
    x = x+STAGE[n].goal;
      console.log(x);
    if(x>=STAGE[n].goal){
        return STAGE[n].goal;
    } else{
        return x
    }
}

const ItemA = ({id, name, Amount}) => {
  return(
  <View style={{margin:5, flexDirection:'column',height:70, width:70}}>
      <Image source={require('../../res/icon.jpeg')} style={styles.image}/>
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
      <Text numberOfLines={1} style={{color:'green', alignSelf:'center', fontSize:12, margin:1}}>{Math.round(Amount/grouplist.Goal_amount*100)}%</Text>
  </View>
  );
  
};
const ItemB = ({id, name,payment, date, time}) => {
  return(
  <View style={{margin:5, flexDirection:'row', borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'lightgrey', justifyContent:'space-around'}}>
      <Image source={require('../../res/icon.jpeg')} style={styles.image}/>
      <View style={{margin:5, flexDirection:'row', justifyContent:'space-around'}}>
        <Text numberOfLines={1} style={styles.name2}>{name}</Text>
        <Text numberOfLines={1} style={{color:'green', alignSelf:'center', fontSize:16, margin:10}}>+{payment}</Text>
      </View>
      <View style={{flexDirection:'column', justifyContent:'center'}}>
        <Text style={{fontSize:12,color:'grey'}}>{time.slice(0,10)}</Text>
        <Text style={{fontSize:12,color:'grey'}}>{time.slice(11)}</Text>
      </View>
  </View>
  );
  
};

const windowWidth = Dimensions.get('window').width-20;

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

const renderItemA = ({ item }) => <ItemA 
  id={item.aid}
  name={item.name}
  Amount={item.GoalProgress}
  />;

  const renderItemB = ({ item }) => <ItemB 
  id={item.aid}
  name={item.name}
  payment={item.Deposit_amount}
  time={item.Deposit_time}
  />;

const GroupPage=({route})=> {//main program---------------------------------------------------------------------
  var goaltype=route.params.goaltype;
  var histheight=windowHeight*0.35
  if (goaltype=='short'){
    histheight=windowHeight*0.5
  }
  const navigation=useNavigation(); 

  db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Goal.Goal_ID AS gid, Goal_name, Goal_amount, end_time, SUM(Deposit_amount) AS GoalProgress FROM Goal INNER JOIN Deposit ON Goal.Goal_ID= Deposit.Goal_ID WHERE gid=?  GROUP BY gid;',
        [route.params.gid],
        (tx, results) => {
           console.log('group data');
            for (let i = 0; i < results.rows.length; ++i)
              grouplist.push(results.rows.item(i));
            console.log(grouplist);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
      tx.executeSql(
        // print table info
        'SELECT Goal_ID, Deposit.Account_ID AS aid, SUM(Deposit_amount) AS MemberContribution, name FROM Deposit INNER JOIN Account ON Deposit.Account_ID= Account.Account_ID WHERE Goal_ID=? GROUP BY aid',
        [route.params.gid],
        (tx, results) => {
           console.log('contribution data');
            for (let i = 0; i < results.rows.length; ++i)
              grpcontribution.push(results.rows.item(i));
            console.log(grpcontribution);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
      tx.executeSql(
        // print table info
        'SELECT Goal_ID, Deposit.Account_ID AS aid, Deposit_amount, Deposit_time, name FROM Deposit INNER JOIN Account ON Deposit.Account_ID= Account.Account_ID WHERE Goal_ID=? ORDER BY Deposit_time DESC',
        [route.params.gid],
        (tx, results) => {
           console.log('deposit history data');
            for (let i = 0; i < results.rows.length; ++i)
              grpdeposit.push(results.rows.item(i));
            console.log(grpdeposit);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );      
})
    return (
      <View style={{flexDirection:'column', height:windowHeight}}>
        <View>
          <NavBar style={styles.header} titleStyle={styles.title} back 
          right={
          <Button onlyIcon icon="exclamationcircleo" iconFamily="antdesign" iconSize={40} color="warning" iconColor="#fff" style={{ width: 45, height: 45 }} onPress={()=>{console.log('Notice'); navigation.navigate('Notice')}}/>
          } 
          title={route.params.groupname} 
          onLeftPress={()=>navigation.navigate('Home')} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
        </View>
        <Text style={styles.subtitleb}> Goal Progress:</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.subtitle1}> ${grouplist.GoalProgress}/ ${grouplist.Goal_amount}</Text>
          <Text style={styles.subtitle2}> {Math.round(grouplist.GoalProgress/grouplist.Goal_amount*100)}%</Text>
        </View>
        <ProgressBar style={{margin:5, alignSelf:'center'}} progress={grouplist.GoalProgress/grouplist.Goal_amount} width={windowWidth}/>
        <View style={{flexDirection:'row', borderBottomWidth:StyleSheet.hairlineWidth}}>
            <Text style={styles.subtitle1}> End Date:</Text>
            <Text style={styles.subtitle2}>{endDate}</Text>
        </View>
        <View>
        {goaltype=='long'?<SwiperFlatList
            index={0}
            data={STAGE}
            renderItem={renderStage}
        />:null}
        </View>
        <View style={{height:windowHeight*0.2}}>
          <View style={{flexDirection:'row', height:24,margin:5}}>
            <Text style={styles.subtitlea}>Contribution:</Text>
            <Button onlyIcon icon="plus" iconFamily="antdesign" iconSize={25} color="lightgreen" iconColor="#fff" style={{ width: 30, height: 30, right: 10 }} onPress={()=>console.log('To contact list')}/>
          </View>
          <FlatList
          style={{marginHorizontal:10, marginVertical:5, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey'}}
          horizontal
          data={grpcontribution}
          renderItem={renderItemA}
          keyExtractor={item => item.aid}/>
        </View>
        <View style={{flexDirection:'column', margin:5, height:histheight}}>
          <Text style={styles.subtitleb}>History:</Text>
          <FlatList
            style={{marginHorizontal:10,marginVertical:5, borderBottomWidth:StyleSheet.hairlineWidth}}
            data={grpdeposit}
            renderItem={renderItemB}
            keyExtractor={item => item.aid}
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around', position:'absolute', bottom:5, alignSelf:'center'}}>
            {grouplist.GoalProgress>=grouplist.Goal_amount?<Button size={'small'} color={'success'} round style={{alignSelf:'center', margin:10}} onPress={()=>navigation.navigate('Assign')}>DONE!!</Button>:null}
            {grouplist.GoalProgress<grouplist.Goal_amount?<Button 
            size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>navigation.navigate('Deposit',{groupname:route.params.groupname})}>
            Deposit
            </Button>:null}
            {grouplist.GoalProgress<grouplist.Goal_amount?<Button 
            size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>navigation.navigate('Vote',{goaltype:route.params.goaltype, progress:grouplist.GoalProgress, target:grouplist.Goal_amount,endDate:endDate, memberCount:grpcontribution.length})}>
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