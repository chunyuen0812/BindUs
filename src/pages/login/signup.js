import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View, Text, Alert, ScrollView,SafeAreaView} from 'react-native';
import { Input,Button} from 'galio-framework';
import request from "../../utils/request";


class Index extends Component {
    state = { 
        birthday: "",
	    chineseName: "",
	    customerId: "",
	    firstName: "",
	    lastName: "",
	    password: "",
	    payPassword: "",
	    phone: "",
	    username: ""

     } 

     SignUp = () => {
        // 註冊帳號
        const { birthday,chineseName,username,phone,password,payPassword,lastName,firstName,customerId } = this.state;
        // if not any input
        if (!birthday || !chineseName || !customerId || ! firstName || !lastName || !paypassword || !password || !phone || !username) {
          Alert.alert('Error', 'Please enter all.');
          return;
        }
        // API handle
        request
          .post(ACCOUNT_SIGN,{ 
            birthday:birthday, 
            password:password,
            username:username,
            chineseName:chineseName,
            customerId:customerId,
            firstName:firstName,
            lastName:lastName,
            payPassword:payPassword,
            phone:phone,
        })

          .then((response) => {
            // Handle successful login
            console.log(response);
            if (response.data.code == "200"){
              Alert.alert("Sign Up Success")
              this.props.navigation.navigate("Login");
              // data add
            }
            else{
              Alert.alert("Sign Up failed");
            }
          })
          .catch((error) => {
            // Handle login error
            console.error(error);
            Alert.alert("Sign Up failed")
          });
      };

      turnLogin = () => { 
        // 跳轉頁面到Login
        this.props.navigation.navigate("Login");
      }

    render() { 
        return (
      
            <View style={styles.container}>
            <ImageBackground source={require("../../res/register-bg.png")} style={styles.image}>
            <ScrollView>

            {/* 佔位 頁面太醜了 */}
            <Text></Text>
            <Text></Text>
            <Text></Text>

            <Text style={styles.text}>Sign Up</Text>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Username" onChangeText={(text) => this.setState({ username: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Chinese name" onChangeText={(text) => this.setState({ chineseName: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Customer Id" onChangeText={(text) => this.setState({ customerId: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="firstName" onChangeText={(text) => this.setState({ firstName: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="lastName" onChangeText={(text) => this.setState({ lastName: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="pay password" onChangeText={(text) => this.setState({ payPassword: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="phone" onChangeText={(text) => this.setState({ phone: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="birthday" type={'datetime'} onChangeText={(text) => this.setState({ birthday: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="password" password viewPass onChangeText={(text) => this.setState({ loginpwd: text })}/>
            
            
            <View style={{flexDirection:"row",marginLeft: 50}}>
            <Button color="#5BC0DE" style={{width:"40%"}} onPress={this.SignUp}>Sign Up</Button>
            <Button color="#5BC0DE" style={{width:"40%"}} onPress={this.turnLogin}>Login</Button>
            </View>

            {/* 佔位 頁面太醜了 */}
            <Text></Text>
            <Text></Text>
            <Text></Text>

            </ScrollView>
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