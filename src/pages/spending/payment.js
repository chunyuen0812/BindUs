import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, NavBar } from 'galio-framework';
import { ImageBackground } from 'react-native';
import { useEffect, useState} from 'react';
import { Alert } from 'react-native';

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;
var date=new Date()
const Payment = ({route}) => {
    
    const [datetime, setDatetime]=useState(date);
    const navigation=useNavigation();
    useEffect(()=>{
        if(route.params.imagepath){

        }
    },[route.params.imagepath])
  return (
    <View style={{height:windowHeight, flex:1}}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Payment" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View style={{flexDirection:'row', margin:10}}>
            <Text style={{fontSize:20,flex:1}}>Usage: {route.params.usage}</Text>
            <Text style={{fontSize:20}}>Budget: ${route.params.limit}</Text>  
        </View>
        
        <ImageBackground source={require('../../res/scanbkgd.png')} resizeMode="stretch">
            <View style={{height:'77%', alignItems:'center', justifyContent:'center'}}>
                <View style={{paddingLeft:10,
                    width:windowWidth-40,
                    height:windowWidth-40, marginBottom:10, 
                    borderWidth:5,
                    borderRadius:1,
                    borderStyle: 'dashed',
                    borderColor:'white'}}>
                        {route.params.imagepath?<Image source={route.params.imagepath} resizeMode='center' style={{alignSelf:'center'}}/>:null}
                    </View>
                <Button onlyIcon icon='camerao'iconFamily='antdesign' iconSize={37} color='dodgerblue' style={{bottom:0,width:50, height:50}} onPress={()=>navigation.navigate('Photo')}/>
            </View>
        </ImageBackground>
        <View style={{justifyContent:'center', alignItems:'center', margin:10}}>
            <Button small round color='red' style={styles.confirmbutton} onPress={()=>{route.params.imagepath?
            Alert.alert('Payment', 'Item: '+route.params.name+'\nPrice: $'+route.params.price+'\n'+datetime,[{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => navigation.navigate({name:'Spend',params:{name:route.params.name, price:route.params.price, datetime:datetime}, merge:true})}])
            :Alert.alert('There is no QR code.')}}>
                Scan
                </Button>
        </View>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
    header:{
        marginTop:25,
        backgroundColor:'lightgrey',
    },
    title:{
        fontSize: 32,
        color:'black',
        fontWeight:'bold'
    },
    confirmbutton:{
        bottom:10,
        margin:5,
        alignSelf:'center',
      },
})