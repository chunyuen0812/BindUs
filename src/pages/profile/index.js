import React, {Component} from 'react';

import { ScrollView, StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import {Button, Block} from 'galio-framework';
import{useNavigation}from '@react-navigation/native'


// 這一頁可隨意修改
var DATA=
{   id:'1',
    name:'Testing user',
    phoneno:'852-1234-5678',
    email:'abc@gmail.com',
    bankaccount:'001-110-1234-5678',
    Tdeposit: 10000.00,
};


class ProfilePage extends Component {
    state = {  } 
    render() { 
        return (
            <ScrollView style={{margin:10, marginTop:20}}>
                <Text style={styles.title}>Profile Screen</Text>
                <View style={styles.profilecontainer}>
                        <View style={{alignContent:'center'}}>
                            <Image 
                            source={require('../../res/profilepic.jpg')} 
                            style={styles.profilepic}/>
                        </View>
                    <Text style={styles.profilename}>
                        {DATA.name}
                    </Text>
                    <View style={{flex:1, flexDirection:'column'}} >
                        <View style={styles.row}>
                            <Text numberOfLines={1} style={styles.subtitle1}>
                            Mobile number:
                            </Text>
                            <Text numberOfLines={1} style={styles.subtitle2}>
                            +{DATA.phoneno}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text numberOfLines={1} style={styles.subtitle1}>
                            Email address: 
                            </Text>
                            <Text numberOfLines={1} style={styles.subtitle2}>
                            {DATA.email}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text numberOfLines={1} style={styles.subtitle1}>
                            Total deposit:
                            </Text>
                            <Text numberOfLines={1} style={styles.subtitle2}>
                            ${DATA.Tdeposit}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text numberOfLines={1} style={styles.subtitle1}>
                            Bank Account:
                            </Text>
                            <Text numberOfLines={1} style={styles.subtitle2}>
                            {DATA.bankaccount}
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{flexDirection:'row'}}>
                    <Button 
                        uppercase
                        round
                        style={styles.button}
                        title='Deposit'
                        onPress={() => {
                            console.log('Deposit');
                        }}> Deposit </Button>
                    <Button 
                        uppercase
                        round
                        style={styles.button}
                        title='Withdrawal'
                        onPress={() => {
                            console.log('Withdrawal');
                        }}> Withdrawal </Button>     
                </View>
                <Button
                    onlyIcon icon="edit" iconFamily="antdesign" iconSize={30} iconColor="#000" 
                    style={styles.editbutton}
                    title="Edit"
                    onPress={() => 
                        console.log('navigate')
                    }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        top: 10,
        flex:2,
        fontSize: 32,
        fontWeight: 'bold',
        color:'darkblue'
    },
profilecontainer:{
    margin: 10,
},
profilename:{
    margin:10,
    fontSize:30,
    fontWeight:"bold",
    alignSelf: "center",
},
 profilepic:{
    resizeMode:'center',
    marginTop: 10,
    alignSelf:'center',
    borderRadius:100,
    width: 200,
    height: 200,
    borderColor:'lightgrey',
    borderWidth: StyleSheet.hairlineWidth,
 },
 editbutton:{
    alignSelf:'flex-end',
    borderColor:'lightgrey',
    borderWidth:1,
    right: 5,
    bottom: 5,
    height:70,
    width: 70,
    backgroundColor:"lightblue",
    borderRadius:50
 },
 row:{
    margin:5,
    flex:1,
    flexDirection:'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:'grey',
 },
 subtitle1:{
    flex:1,
    fontSize:18,
 },
 subtitle2:{
    flex: 1,
    fontSize:18,
 },
 button:{
    flex:1,
    alignSelf: 'flex-end',
    backgroundColor: 'dimgrey',
    color:'#000',
 }
});
 
export default ProfilePage;