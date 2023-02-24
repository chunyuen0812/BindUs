import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View, Text, Alert} from 'react-native';
import { Input,Button} from 'galio-framework';
import request from "../../utils/request";
import { ACCOUNT_LOGIN } from '../../utils/pathMap';


class Index extends Component {

  state = {
    loginname: '',
    loginpwd: '',
  }

  handleLogin = () => {
    const { loginname, loginpwd } = this.state;
    // if not any input
    if (!loginname || !loginpwd) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    // API handle
    // console.log(loginname,loginpwd,token,clientid,messageid)
    request
      .post(ACCOUNT_LOGIN,{ loginname:loginname, loginpwd:loginpwd})
      .then((response) => {
        // Handle successful login
        console.log(response);
        if (response.data.msg ==  "Operation Successed"){
          this.props.navigation.navigate("Home");
        }
        else{
          Alert.alert("Login failed");
        }
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
        Alert.alert("Login failed")
      });
  };


  render() { 
    return (
      
      <View style={styles.container}>
      <ImageBackground source={require("../../res/register-bg.png")} style={styles.image}>

      <Text style={styles.text}>BindUs</Text>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="Account" onChangeText={(text) => this.setState({ loginname: text })}/>
      <Input style={{width:"90%",marginLeft: 20}} placeholder="password" password viewPass onChangeText={(text) => this.setState({ loginpwd: text })}/>
      
      <View style={{flexDirection:"row",marginLeft: 50}}>
        <Button color="#5BC0DE" style={{width:"40%"}}>Sign Up</Button>
        <Button color="#5BC0DE" style={{width:"40%"}} onPress={this.handleLogin}>Login</Button>
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