import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View, Text, Alert} from 'react-native';
import { Input,Button} from 'galio-framework';


class LoginPage extends Component {

  state = {
    Bank: '',
    Bank_Card: '',
  }

  handleBinding = () => {
    this.props.navigation.navigate("Profile");

  }


  render() { 
    return (
      
      <View style={styles.container}>
      <ImageBackground source={require("../../res/register-bg.png")} style={styles.image}>

      <Text style={styles.text}>Bind Card</Text>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="Bank" onChangeText={(text) => this.setState({ Bank: text })}/>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="Bank Card" onChangeText={(text) => this.setState({ Bank_Card: text })}/>
      
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
      background: "#000000a0"
    },

    
  });

  export default LoginPage;