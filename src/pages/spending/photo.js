import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NavBar } from 'galio-framework';
import { Pressable } from 'react-native';


const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;
const DATA=[
{
    id:'1',
    imagepath:require('../../res/QR1.png'),
    name:'Item A',
    price:'56.90',
},
{
    id:'2',
    imagepath:require('../../res/QR2.png'),
    name:'Item B',
    price:'140.40',
},
]


const Photo = ({route}) => {
    
    const navigation=useNavigation();
    
    const Item=({id, imagepath, name, price})=>{
        return(
            <Pressable style={{flexDirection:'row', margin:5}} onPress={()=>navigation.navigate({ name: 'Payment', params: {name:name, price:price, imagepath:imagepath}, merge: true,})}>
                <Image source={imagepath} style={{width:60, height:60}}/>
                <View style={{padding:5}}>
                   <Text>{name}</Text>
                   <Text>{price}</Text> 
                </View>
            </Pressable>
        );
    }

    const renderItem=({item})=><Item
        id={item.id}
        imagepath={item.imagepath}
        name={item.name}
        price={item.price}
    />

    return (
    <View style={{height:windowHeight, flex:1}}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Photo" 
        onLeftPress={()=>navigation.goBack()} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        />
    </View>
    )
}

export default Photo

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