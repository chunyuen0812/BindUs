import React, { Component } from "react";
import { ScrollView, StyleSheet, Image, Text, View, FlatList, Pressable } from "react-native";
import {Button} from 'galio-framework';
import {SearchBar, ListItem } from "@rneui/themed";
 // npm this package for search bar functions

const DATA = [
  {
    id: "1",
    groupimage: require('../../res/christmasparty.jpg'),
    title: "Christmas Party",
    description: "ABC",
    grpprogress: 60, 
  },
  {
    id: "2",
    groupimage: require('../../res/gradtrip.jpg'),
    title: "Grad trip",
    description: "ABC",
    grpprogress: 65,
  },
  {
    id: "3",
    groupimage: require('../../res/igshop.jpg'),
    title: "New shop",
    description: "ABC",
    grpprogress: 35,
  },
{
  id: "4",
  groupimage: require('../../res/christmasparty.jpg'),
  title: "Christmas Party",
  description: "ABC",
  grpprogress: 60, 
},
{
  id: "5",
  groupimage: require('../../res/gradtrip.jpg'),
  title: "Grad trip",
  description: "ABC",
  grpprogress: 65,
},
{
  id: "6",
  groupimage: require('../../res/igshop.jpg'),
  title: "New shop",
  description: "ABC",
  grpprogress: 35,
},
{
  id: "7",
  groupimage: require('../../res/christmasparty.jpg'),
  title: "Christmas Party",
  description: "ABC",
  grpprogress: 60, 
},
{
  id: "8",
  groupimage: require('../../res/gradtrip.jpg'),
  title: "Grad trip",
  description: "ABC",
  grpprogress: 65,
},
{
  id: "9",
  groupimage: require('../../res/igshop.jpg'),
  title: "New shop",
  description: "ABC",
  grpprogress: 35,
},
{
  id: "10",
  groupimage: require('../../res/christmasparty.jpg'),
  title: "Christmas Party",
  description: "ABC",
  grpprogress: 60, 
},
{
  id: "11",
  groupimage: require('../../res/gradtrip.jpg'),
  title: "Grad trip",
  description: "ABC",
  grpprogress: 65,
},
{
  id: "12",
  groupimage: require('../../res/igshop.jpg'),
  title: "New shop",
  description: "ABC",
  grpprogress: 35,
},
];
// pixel per item 85p
const Item = ({id, groupimage, title, description, grpprogress}) => {
  return (
    <Pressable onPress={()=>console.log('navigate')} style={styles.item}>
      <Image source={groupimage} style={styles.image}/> 
      <View style={styles.grpinfo}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
          {title}:{id}
          </Text>
          <Text>
          Group progress: {grpprogress}% 
          </Text>
        </View>
      <Text numberOfLines={2} style={styles.subtitle}>
      Description: {description}
      </Text>
      </View>
    </Pressable>
  );
};

const renderItem = ({ item }) => <Item 
id={item.id}
groupimage={item.groupimage} 
title={item.title} 
description={item.description} 
grpprogress={item.grpprogress} />;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
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
      <View style={{flexDirection:'column'}}> 
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
        <View>
            <FlatList
            data={this.state.data}
            renderItem={renderItem}
            contentContainerStyle={styles.listcontainer}
            keyExtractor={(item) => item.id}
            />    
        </View>
        <View>
        <Button onlyIcon icon="plus" iconFamily="antdesign" iconSize={30} 
          color="green" iconColor="#fff" style={styles.plusbutton}
          onPress={() => {
          console.log('Create New Group!');
          }}
          /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: 25,
    padding: 1,
  },
  listcontainer:{
    flexGrow: 1,
    backgroundColor: 'grey',
  },
  grpinfo:{
    flex:1, 
    backgroundColor:"lightskyblue",
  },
  name:{
    flex: 1,
    fontWeight:"bold",
    fontSize: 18,
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
    backgroundColor:"lightgreen",
    height: 75,
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:"lightgray",
  },
  plusbutton:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    width:70,
    position: 'absolute',                                          
    bottom: 15,
    right: 15,
    height:70,
    backgroundColor:'green',
    borderRadius:100,
  },
});

export default HomePage;