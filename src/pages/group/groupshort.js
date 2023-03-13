import { Image,FlatList, StyleSheet, Text, View } from 'react-native';
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar'; //npm install react-native-progress --save
// fetch group info from db

const Target=100000;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    profpic: require('../../res/profilepic.jpg'),
    name: 'User 1',
    Amount: 2000,
    payment: 100,
    date:'13/03/2023',
    time:'21:03'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    profpic: require('../../res/profilepic.jpg'),
    name: 'User 2',
    Amount: 3500,
    payment: 200,
    date:'11/03/2023',
    time:'14:23'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    profpic: require('../../res/profilepic.jpg'),
    name: 'User 3',
    Amount: 3600,
    payment: 300,
    date:'10/03/2023',
    time:'09:46'
  },
];

const sum = DATA.reduce((accumulator, object) => {
  return accumulator + object.Amount;
}, 0);


const ItemA = ({id, name, profpic, Amount}) => {
  return(
  <View style={{margin:5, flexDirection:'column', width:70}}>
      <Image source={profpic} style={styles.image}/>
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
      <Text numberOfLines={1} style={{color:'green', alignSelf:'center', fontSize:12, margin:1}}>{Math.round(Amount/Target*100)}%</Text>
  </View>
  );
  
};
const ItemB = ({id, name, profpic,payment, date, time}) => {
  return(
  <View style={{margin:5, flexDirection:'row', borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'lightgrey'}}>
      <Image source={profpic} style={styles.image}/>
      <View style={{margin:5, flexDirection:'row', justifyContent:'space-around'}}>
        <Text numberOfLines={1} style={styles.name2}>{name}</Text>
        <Text numberOfLines={1} style={{color:'green', alignSelf:'center', fontSize:16, margin:10}}>+{payment}</Text>
      </View>
      <View style={{flexDirection:'column', justifyContent:'center'}}>
        <Text style={{fontSize:12,color:'grey'}}>{date}</Text>
        <Text style={{fontSize:12,color:'grey',alignSelf:'flex-end'}}>{time}</Text>
      </View>
  </View>
  );
  
};

const renderItemA = ({ item }) => <ItemA 
  id={item.id}
  profpic={item.profpic} 
  name={item.name}
  Amount={item.Amount}
  />;

  const renderItemB = ({ item }) => <ItemB 
  id={item.id}
  profpic={item.profpic} 
  name={item.name}
  payment={item.payment}
  date={item.date}
  time={item.time}
  />;
class GroupshortPage extends Component {

  render(
  ) {   
    return (
      <View style={{flexDirection:'column'}}>
        <View>
          <NavBar style={styles.header} titleStyle={styles.title} back 
          title="Group Name" 
          onLeftPress={()=>this.props.navigation.navigate('Home')} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
        </View>
        <Text style={styles.subtitleb}> Goal Progress:</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.subtitle1}> ${sum}/ ${Target}</Text>
          <Text style={styles.subtitle2}> {Math.round(sum/Target*100)}%</Text>
        </View>
        <View style={{margin:5,marginBottom:10, justifyContent:'space-around', borderBottomWidth:StyleSheet.hairlineWidth}}>
          <ProgressBar style={{margin:5, alignSelf:'center'}} progress={sum/Target} width={300}/>
          <View style={{flexDirection:'row',marginVertical:5}}>
            <Text style={styles.subtitle1}> End Date:</Text>
            <Text style={styles.subtitle2}>01/04/2023</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.subtitlea}>Contribution:</Text>
          <Button onlyIcon icon="plus" iconFamily="antdesign" iconSize={25} color="lightgreen" iconColor="#fff" style={{ width: 30, height: 30, right: 10 }} onPress={()=>console.log('To contact list')}/>
        </View>
        <FlatList
          style={{marginHorizontal:10, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey'}}
          horizontal
          data={DATA}
          renderItem={renderItemA}
          keyExtractor={item => item.id}/>
        <View style={{flexDirection:'column', margin:5,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'dimgrey', height:'40%'}}>
          <Text style={styles.subtitleb}> History</Text>
          <FlatList
            style={{marginHorizontal:10, borderBottomWidth:StyleSheet.hairlineWidth}}
            data={DATA}
            renderItem={renderItemB}
            keyExtractor={item => item.id}
          />
        </View>
        <Button 
        size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
        onPress={()=>console.log('deposit')}>
        Deposit
        </Button>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  header:{
    flexDirection:'row',
    marginTop:25,
    backgroundColor:'lightgrey',},
  title:{
    alignSelf:'center',
    fontSize: 32,
    fontWeight:'bold'
  },
  subtitlea:{
    flex:1,
    fontSize: 18,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitleb:{
    fontSize: 18,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitle1:{
    flex:1,
    fontSize: 16,
    marginHorizontal:10
  },
  subtitle2:{
    fontSize: 16,
    marginHorizontal:10
  },
  image:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:"lightgray",
    resizeMode: "center",
  },
  name:{
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 14,
  },
  name2:{
    width:'30%',
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 16,
  },
})

export default GroupshortPage