import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { NavBar } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';



export default function ContactList() {

    const navigation=useNavigation();

    useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    
      const [checkedItems, setCheckedItems] = useState([]);

      const isChecked = (id) => {
        return checkedItems.includes(id);
      };
    
      const toggleItem = (id) => {
        if (isChecked(id)) {
          setCheckedItems(checkedItems.filter(item => item !== id));
        } else {
          setCheckedItems([...checkedItems, id]);
        }
      };
    });
  }, );

  return (
    <View style={styles.container}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Choose members" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
    </View>
  );
}
const styles=StyleSheet.create({

})