import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View, Text, Alert} from 'react-native';
import { Input,Button} from 'galio-framework';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("maindb4.db");
class BindCard extends Component {

  state = {
    bank: '',
    bank_card: '',
  }

  handleBinding = () => {
    const {bank_card, bank} = this.state;
    // Update data
    db.transaction((tx) => {
      // Define the SQL query to update the balance of a record with a specific Account_ID
      const query = 'UPDATE Account SET bank_card = ?, bank = ?WHERE Account_ID = 1';
      const params = [bank_card,bank]; 

      // Execute the SQL query with the specified parameters
      tx.executeSql(query, params, (tx, results) => {
        console.log('bank card updated successfully');
      }, (error) => {
        console.error('Error updating bank card:', error);
      });
    });

    this.props.navigation.navigate("Profile");

  }


  render() { 
    return (
      
      <View style={styles.container}>
      <ImageBackground source={require("../../res/register-bg.png")} style={styles.image}>

      <Text style={styles.text}>Bind Card</Text>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="Bank" onChangeText={(text) => this.setState({ bank: text })}/>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="Bank Card" onChangeText={(text) => this.setState({ bank_card: text })}/>
      
      <View style={{flexDirection:"row",marginLeft: 110}}>
        <Button color="#5BC0DE" style={{width:"60%"}} onPress={this.handleBinding}>Bind</Button>
      </View>
      

      </ImageBackground>
    </View>
    );
  }
}
 
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    },

    
  });

  export default BindCard;