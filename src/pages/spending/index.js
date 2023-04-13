import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NavBar,Icon, Button } from 'galio-framework'
import { useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';

const windowWidth=Dimensions.get('window').width-10;
const windowHeight=Dimensions.get('window').height;

const target=10000;
const section=[
{ id:'1',
event:'Food',
user:'User1',
fund:3000,
},
{ id:'2',
event:'Venue and setup',
user:'User1',
fund:5000,
},
{ id:'3',
event:'Deco and others',
user:'User1',
fund:2000,
},
]
const Spending = () => {
    const navigation=useNavigation();
    const [ activeSections, setActiveSections ] = useState([]);
    function renderHeader(section, _, isActive) {
      return (
        <View style={styles.container}>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Text style={styles.accordTitle}>{section.id}.  { section.event }</Text>
            <Button onlyIcon icon='camerao' iconFamily='antdesign' iconSize={20} color='#999' style={{alignSelf:'center',width:25,height:25, marginHorizontal:10}}/>
          </View>
        
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Text>Person in Charge: {section.user}</Text>
            <Text>Spending Goal: ${section.fund}</Text>
          </View>
        </View>
        
      );
    };
  
    function renderContent(section, _, isActive) {
      return (
        <View style={styles.accordBody}>
          <Image source={require('../../res/receipt.jpg')} style={{width:windowWidth,height:windowWidth, resizeMode:'center'}}/>
          <View style={{flexDirection:"row"}}>
            <Text style={{flex:1}}>$100</Text>
            <Text>10-05-2023 14:32:46</Text>
          </View>

        </View>
      );
    }
  return (
    <View style={height=windowHeight}>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Spend" 
        onLeftPress={()=>navigation.navigate('Assign')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
      <View style={{flexDirection:'row',justifyContent:'center', padding:15}}>
          <Text style={{fontSize:20,flex:1}}>Total Budget: </Text>
          <Text style={{fontSize:20}}>${target}</Text>
      </View>
      <Accordion
        align='bottom'
        sections={section}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={(sections) => setActiveSections(sections)}
        sectionContainerStyle={styles.accordContainer}
      />
    </View>
  )
}

export default Spending

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
    container:{
      justifyContent:'center',
      marginHorizontal:5,
      marginBottom:5,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: 'white',
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    accordContainer: {
      paddingBottom: 4
    },
    accordTitle: {
      flex:1,
      fontSize: 20,
      fontWeight:'bold',
      color:'black'
    },
    accordBody: {
      padding: 12
    },
})