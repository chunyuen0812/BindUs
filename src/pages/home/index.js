import React, { Component } from "react";
import { StyleSheet, Image, Text, View, FlatList } from "react-native";
import {SearchBar } from "@rneui/themed"; // npm this package for search bar functions

const DATA = [
  {
    id: "1",
    groupimage: '../../res/christmasparty.jpg',
    title: "Christmas Party",
    description: "ABC",
    grpprogress: 60, 
  },
  {
    id: "2",
    groupimage: '../../res/gradtrip.jpg',
    title: "Grad trip",
    description: "ABC",
    grpprogress: 65,
  },
  {
    id: "3",
    groupimage: '../../res/igshop.jpg',
    title: "New shop",
    description: "ABC",
    grpprogress: 35,
  },
];
 // problem in displaying image
const Item = ({groupimage, title, description, grpprogress}) => {
  return (
    <View style={styles.item}>
      <Image source={groupimage} style={styles.image}/> 
      <View style={styles.grpinfo}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
          {title}
          </Text>
          <Text>
          Group progress: {grpprogress}% 
          </Text>
        </View>
      <Text numberOfLines={2} style={styles.subtitle}>
      Description: {description}
      </Text>
      </View>
    </View>
  );
};

const renderItem = ({ item }) => <Item 
groupimage={item.groupimage} 
title={item.title} 
description={item.description} 
grpprogress={item.grpprogress} />;
class Search extends Component {
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
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    backgroundColor:"yellow",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 2,
    marginRight: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:"lightgray",
    resizeMode: "cover",
  },
  container: {
    marginTop: 5,
    padding: 1,
  },
  grpinfo:{
    flex: 1,
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
});

export default Index;