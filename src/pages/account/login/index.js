import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View, Text} from 'react-native';
import { Input,Button} from 'galio-framework';
import request from "../../../utils/request";

class Index extends Component {



  state = {  } 
  render() { 
    return (
      
      <View style={styles.container}>
      <ImageBackground source={require("../../../res/register-bg.png")} style={styles.image}>

      <Text style={styles.text}>BindUs</Text>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="Account" />
      <Input style={{width:"90%",marginLeft: 20}} placeholder="password" password viewPass />
      
      <View style={{flexDirection:"row",marginLeft: 50}}>
        <Button color="#5BC0DE" style={{width:"40%"}}>Sign Up</Button>
        <Button color="#5BC0DE" style={{width:"40%"}}>Login</Button>
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
      background: "#000000a0"
    },

    
  });

  export default Index;