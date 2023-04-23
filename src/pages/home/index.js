import React, { Component, useState } from "react";
import { ScrollView, StyleSheet, Image, Text, View, FlatList, Pressable,Dimensions } from "react-native";
import {NavBar,Button} from 'galio-framework';
import {SearchBar, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';
 // npm this package for search bar functions

const db = SQLite.openDatabase('maindb.db');
var grouplist = [];
var groupprogress = [];

db.transaction(tx=>{
    tx.executeSql(
        // print table info
        'SELECT Goal_ID AS gid, Goal_name, Goal_type, Goal_amount, is_pending FROM Goal',
        [],
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
        'SELECT Goal.Goal_ID AS gid, SUM(Deposit_amount) AS GoalProgress FROM Goal INNER JOIN Deposit ON Goal.Goal_ID = Deposit.Goal_ID GROUP BY gid;',
        [],
        (tx, results) => {
           console.log('groupprogress');
            for (let i = 0; i < results.rows.length; ++i)
            groupprogress.push(results.rows.item(i));
            console.log(groupprogress);
        },
        (tx, error) => {
          console.error('Error selecting data', error);
        }
      );      
})

console.log('test: ', grouplist);
const windowHeight = Dimensions.get('window').height; 

// pixel per item 85p

const renderItem = (navigation,groupprogress, item, index ) =>{

  var navbutton='';
  {item.is_pending==1?navbutton='Group':navbutton='Pending'}
    return (
      <Pressable onPress={() => {console.log(item.gid);navigation.navigate(navbutton,{gid:item.gid,groupname:item.Goal_name, goaltype:item.Goal_type})}} style={styles.item}>
        <Image source={require('../../res/groupicon.png')} style={styles.image}/> 
        <View style={styles.grpinfo}>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.name}>
            {item.Goal_name}
            </Text>
            {item.is_pending==1?<Text>{Math.round(groupprogress[index].GoalProgress/item.Goal_amount*100)}% </Text>:<Text>Pending</Text>}
          </View>
        </View>
      </Pressable>
    );  
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: grouplist,
      error: null,
      searchValue: "",
    };
    this.arrayholder = grouplist;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  render() {
    return (
      <View style={{flexDirection:'column', height:windowHeight}}> 
        <NavBar style={styles.header} titleStyle={styles.title} title="Home" />
        <View style={styles.container}>
          <SearchBar
            placeholder="Search Here..."
            lightTheme
            round
            value={this.state.searchValue}
            onChangeText={(text) => this.searchFunction(text)}
            autoCorrect={false}
          />
        </View>
        <View style={{height:'74%'}}>
            <FlatList
            data={this.state.data}
            extraData={groupprogress}
            renderItem={({item, index})=>renderItem(this.props.navigation, groupprogress, item,index)}
            contentContainerStyle={styles.listcontainer}
            keyExtractor={(item) => item.gid}
            />    
        </View>
        <View style={{ flexDirection:'row', position:'absolute', bottom:50, right:5}}>
        <Button opacity={0.5} onlyIcon icon="plus" iconFamily="antdesign" iconSize={30} 
          color="success" iconColor="#fff" style={styles.plusbutton}
          onPress={() => {this.props.navigation.navigate('CreateGroup')}}
          /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    marginTop: 25,
    backgroundColor:'lightgrey',
    alignItems:'center',
  },
  title:{
    fontSize: 32,
    fontWeight:'bold'
  },
  image:{
    alignItems:"center",
    justifyContent:"center",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 1,
    marginRight: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:"lightgray",
    resizeMode: "center",
  },
  container: {
    padding: 1,
  },
  listcontainer:{
    flexGrow: 1,
  },
  grpinfo:{
    flex:1, 
  },
  name:{
    flex: 1,
    fontWeight:"bold",
    fontSize: 20,
  },
  subtitle:{
    color: "dimgray",
    fontSize: 13,
  },
  row:{
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  item: {
    height: 75,
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:"lightgray",
  },
  plusbutton:{
    alignItems:'center',
    width:65,                                         
    height:65,
    borderRadius:100,
  },
});

export default HomePage;