import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavBar,Icon, Button } from 'galio-framework'
import { useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('maindb.db');
const windowWidth=Dimensions.get('window').width-10;
const windowHeight=Dimensions.get('window').height;
var gid='1';
const target=10000;
var section=[
{ id:'1',
Event:'Food',
User:'User1',
Budget:3000,
},
{ id:'2',
Event:'Venue and setup',
User:'User1',
Budget:5000,
},
{ id:'3',
Event:'Deco and others',
User:'User1',
Budget:2000,
},
]
var allgroup={};

const Spending = ({route}) => {//main program----------------------------------------------------------------------------------------------------
  
  const [groupinfo, setGroupinfo]=useState({});
  var name='Item A';
  var price='100';
  var datetime='10-05-2023 14:32:46';
  if (route.params){
    if(route.params.gid&&route.params.list){
      gid=route.params.gid;
      for(i=0;i<route.params.list.length;i++){
        section[i]=route.params.list[i]
      }
    }
    if (route.params.name && route.params.price && route.params.datetime){
      name=route.params.name
      price=route.params.price
      datetime=route.params.datetime.toString
    }
  }

  useEffect(()=>{
    db.transaction(tx=>{
      tx.executeSql(
        // print table info
        'SELECT Goal_name, Goal_ID, Goal_amount FROM Goal WHERE Goal_ID=?;',
        [gid],
        (tx, results) => {
            allgroup=(results.rows.item(0));
          console.log('allgroup',allgroup);
          setGroupinfo(allgroup)
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );
    });
  },[])
  const navigation=useNavigation();
  const [activeSections, setActiveSections ] = useState([]);

  function renderHeader(section) {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <Text style={styles.accordTitle}>{section.id}.  { section.Event }</Text>
          <Button onlyIcon icon='payment' iconFamily='fontawesome' iconSize={25} color='success' style={{alignSelf:'center',width:30,height:30, marginHorizontal:10}}
          onPress={()=>navigation.navigate('Payment', {limit:section.fund, usage:section.event})}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <Text>Person in Charge: {section.User}</Text>
          <Text>Spending Goal: ${section.Budget}</Text>
        </View>
      </View>
    );
  };

  function renderContent(section) {
    return (
      <View style={styles.accordBody}>
        <View style={{flexDirection:"row"}}>
          <Text style={{flex:1}}>{name}</Text>
          <Text style={{flex:1}}>${price}</Text>
          <Text>{datetime}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={height=windowHeight}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title={groupinfo.Goal_name} 
        onLeftPress={()=>navigation.navigate('Assign')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
      <View style={{flexDirection:'row',justifyContent:'center', padding:15}}>
          <Text style={{fontSize:20,flex:1}}>Total Budget: </Text>
          <Text style={{fontSize:20}}>${groupinfo.Goal_amount}</Text>
      </View>
      <ScrollView style={{height:'81%', marginVertical:10}}>
        <Accordion
        align='bottom'
        sections={section}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={(sections) => setActiveSections(sections)}
        sectionContainerStyle={styles.accordContainer}
      />
      </ScrollView>
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
    container:{
      justifyContent:'center',
      marginHorizontal:5,
      marginBottom:5,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: 'white',
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    accordContainer: {
      paddingBottom: 4
    },
    accordTitle: {
      flex:1,
      fontSize: 20,
      fontWeight:'bold',
      color:'black'
    },
    accordBody: {
      padding: 12
    },
    confirmbutton:{
      bottom:10,
      margin:10,
      alignSelf:'center',
    },
})