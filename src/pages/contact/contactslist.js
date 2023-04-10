import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Contact from "./contacts";
import * as Contacts from "expo-contacts";
import { NavBar } from "galio-framework";
import { useNavigation } from "@react-navigation/native";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.PHONE_NUMBERS],
        });
        if (data.length > 0) {
          setContacts(data);
          console.log(data[0]);
        }
      }
    })();
  }, []);
  const keyExtractor = (item, idx) => {
    return item?.id?.toString() || idx.toString();
  };
  const renderItem = ({ item, index }) => {
    return <Contact contact={item} />;
  };
const navigation=useNavigation();

  return (
    <View>
       <NavBar style={styles.header} titleStyle={styles.title} back 
          title='Contact' 
          onLeftPress={()=>navigation.goBack()} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
    />  
    </View>
   
  );
};
const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        marginTop:25,
        backgroundColor:'lightgrey',},
      title:{
        alignSelf:'center',
        fontSize: 32,
        fontWeight:'bold'
      },
  list: {
    flex: 1,
  },
});
export default ContactsList;