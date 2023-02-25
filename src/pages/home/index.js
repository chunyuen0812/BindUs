import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {SearchBar } from "@rneui/themed";

const DATA = [
  {
    id: "1",
    title: "Christmas Party",
    description: "ABC",
  },
  {
    id: "2",
    title: "Grad trip",
    description: "ABC",
  },
  {
    id: "3",
    title: "New shop",
    description: "ABC",
  },
];

const Item = ({title, description}) => {
  return (
    <View style={styles.item}>
      <Text>Group name: {title}</Text>
      <Text>Description: {description}</Text>
    </View>
  );
};

const renderItem = ({ item }) => <Item title={item.title} description={item.description} />;
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

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 1,
  },
  item: {
    backgroundColor: "lightskyblue",
    padding: 25,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});

