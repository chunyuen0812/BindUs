import { Image,FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';
//npm install react-native-swiper-flatlist --save
//npm install react-native-progress --save
// fetch group info from db

let n=0;

const STAGE=[
{
    id:'1',
    goal: 4000,
    date:'10/02/2023',
},
{
    id:'2',
    goal: 3000,
    date:'20/02/2023',
},
{
    id:'3',
    goal: 2000,
    date:'07/03/2023',
},
{
    id:'4',
    goal: 1000,
    date:'20/03/2023',
},
];

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

const sumamount = DATA.reduce((accumulator, object) => {
    console.log(accumulator + object.Amount)
  return accumulator + object.Amount;
}, 0);

const Target = STAGE.reduce((accumulator, object) => {
    console.log(accumulator + object.goal)
    return accumulator + object.goal;
  }, 0);

function stageprogress(n){
    let x=0;
    x= sumamount;
    for (let i = 0; i <= n; i++) {
        x-=STAGE[i].goal;
      }
    x = x+STAGE[n].goal;
      console.log(x);
    if(x>=STAGE[n].goal){
        return STAGE[n].goal;
    } else{
        return x
    }
}

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
  <View style={{margin:5, flexDirection:'row', borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'lightgrey', justifyContent:'space-around'}}>
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

const windowWidth = Dimensions.get('window').width-20;

const renderStage=({item, index})=> {
    return(
        <View>
            <View style={{flexDirection:'row', margin:5, borderTopWidth:StyleSheet.hairlineWidth}}>
              <Text style={styles.subtitle1}> Stage: {item.id}</Text>
              <Text style={styles.subtitle2}>{item.id}/{STAGE.length}</Text>
            </View>
            <View style={{flexDirection:'row', margin:5}}>
              <Text style={styles.subtitle1}> ${stageprogress(index)}/ ${item.goal}</Text>
              <Text style={styles.subtitle2}> {Math.round(stageprogress(index)/item.goal*100)}%</Text>
            </View>
            <View style={{margin:5,marginBottom:10, borderBottomWidth:StyleSheet.hairlineWidth}}>
                <ProgressBar style={{margin:5, alignSelf:'center'}} color={'lightblue'} progress={stageprogress(index)/item.goal} width={windowWidth}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.subtitle1}> End Date:</Text>
                    <Text style={styles.subtitle2}>{item.date}</Text>
                </View>
            </View>
        </View>
    );
}

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
class GrouplongPage extends Component {

  render(
  ) {   
    return (
      <View style={{flexDirection:'column'}}>
        <View>
          <NavBar style={styles.header} titleStyle={styles.title} back 
          right={
          <Button onlyIcon icon="exclamationcircleo" iconFamily="antdesign" iconSize={40} color="warning" iconColor="#fff" style={{ width: 45, height: 45 }} onPress={()=>{console.log('Notice'); this.props.navigation.navigate('Notice')}}/>
          } 
          title="Group Name" 
          onLeftPress={()=>this.props.navigation.navigate('Home')} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
        </View>
        <Text style={styles.subtitleb}> Goal Progress:</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.subtitle1}> ${sumamount}/ ${Target}</Text>
          <Text style={styles.subtitle2}> {Math.round(sumamount/Target*100)}%</Text>
        </View>
        <ProgressBar style={{margin:5, alignSelf:'center'}} progress={sumamount/Target} width={windowWidth}/>
        <SwiperFlatList
            index={0}
            data={STAGE}
            renderItem={renderStage}
        />
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
        <View style={{flexDirection:'column', margin:5,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'dimgrey', height:'32%'}}>
          <Text style={styles.subtitleb}> History</Text>
          <FlatList
            style={{marginHorizontal:10, borderBottomWidth:StyleSheet.hairlineWidth}}
            data={DATA}
            renderItem={renderItemB}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            <Button 
            size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>console.log('deposit')}>
            Deposit
            </Button>
            <Button 
            size={'small'} color={'dimgrey'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>console.log('vote')}>
            Vote
            </Button>
        </View>
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
    fontSize: 20,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitleb:{
    fontSize: 20,
    fontWeight:'bold',
    marginHorizontal:10
  },
  subtitle1:{
    flex:1,
    fontSize: 18,
    marginHorizontal:10
  },
  subtitle2:{
    fontSize: 18,
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
    fontSize: 16,
  },
  name2:{
    width:'30%',
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 14,
  },
})

export default GrouplongPage