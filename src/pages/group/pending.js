import { Alert, Image,FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import{ NavBar, Button} from 'galio-framework';
import React, { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
//npm install react-native-swiper-flatlist --save
//npm install react-native-progress --save
// fetch group info from db
var uservote=0;
var vote='';
var groupname='group name'

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
    profpic: require('../../res/icon.jpeg'),
    name: 'User 1',
    Amount: 0,
    Uservote:1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    profpic: require('../../res/icon.jpeg'),
    name: 'User 2',
    Amount: 0,
    Uservote:2,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    profpic: require('../../res/icon.jpeg'),
    name: 'User 3',
    Amount: 0,
    Uservote:0,
  },
];


const Target = STAGE.reduce((accumulator, object) => {
    console.log(accumulator + object.goal)
    return accumulator + object.goal;
  }, 0);



const ItemA = ({id, name, profpic, Uservote}) => {
  return(
  <View style={{margin:5, flexDirection:'column', width:70}}>
      {Uservote==0?<Image source={profpic} style={styles.image}/>:null}
      {Uservote==1?<Image source={profpic} style={styles.imageyes}/>:null}
      {Uservote==2?<Image source={profpic} style={styles.imageno}/>:null}
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
  </View>
  );
  
};

const windowWidth = Dimensions.get('window').width-20;

const renderStage=({item, index})=> {
    return(
        <View height={50}>
            <View style={{flexDirection:'row', margin:5}}>
              <Text style={styles.subtitle1}> Stage: {item.id}</Text>
              <Text style={styles.subtitle2}>{item.id}/{STAGE.length}</Text>
            </View>
            <View style={{flexDirection:'row', margin:5}}>
              <Text style={styles.subtitle1}> $0/ ${item.goal}</Text>
              <Text style={styles.subtitle2}> 0%</Text>
            </View>
            <View style={{margin:5,marginBottom:10, borderBottomWidth:StyleSheet.hairlineWidth}}>
                <ProgressBar style={{margin:5, alignSelf:'center'}} color={'lightblue'} progress={0/item.goal} width={windowWidth}/>
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
  Uservote={item.Uservote}
  />;

  const windowHeight = Dimensions.get('window').height; 

const Pending=({route})=> {
 const navigation=useNavigation();
 var goaltype=route.params.goaltype;
  var histheight='27%'
  if (goaltype=='short'){
    histheight='41%'
  }
    return (
      <View style={{flexDirection:'column', height:windowHeight}}>
        <View>
          <NavBar style={styles.header} titleStyle={styles.title} back 
          title={route.params.groupname}  
          onLeftPress={()=>navigation.goBack()} 
          leftStyle={{width:30,height:30}} leftIconSize={30}
          />
        </View>
        <View style={{height:65, borderBottomWidth:StyleSheet.hairlineWidth}}>
          <Text style={styles.subtitleb}> Goal Progress:</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subtitle1}> $0/ ${Target}</Text>
            <Text style={styles.subtitle2}> 0%</Text>
          </View>
          <ProgressBar style={{margin:5, alignSelf:'center'}} progress={0} width={windowWidth}/>
        </View>
        <View>
          {goaltype=='long'?<SwiperFlatList
            index={0}
            data={STAGE}
            renderItem={renderStage}
          />:null}
        </View>
        <View style={{flexDirection:'column',marginHorizontal:5}}>
          <Text style={styles.subtitleb}>Group description:</Text>
          <Text  numberOfLines={1} style={styles.subtitle2}>kashdiabdukabvnbm,nmnbvxchvjbkhgfxcvhbjnkjbhgcfjhgfhjkhgfhjklhghjkhgfhjkhjgnbfghjkhgfhjvdvajdhvadvjhdvajdj</Text>
          <Text style={styles.hyperlink} onPress={()=>console.log('group description')}>Read more...</Text>
        </View>
        <View style={{flexDirection:'row',borderTopWidth:StyleSheet.hairlineWidth, height:30,margin:5}}>
          <Text style={styles.subtitlea}>Members:</Text>
        </View>
        <FlatList
          style={{marginHorizontal:10, borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey'}}
          horizontal
          data={DATA}
          renderItem={renderItemA}
          keyExtractor={item => item.id}/>
        <View style={{flexDirection:'row',justifyContent:'space-evenly', marginVertical:10}}>
          {uservote==0?<Button 
            size={'small'} color={'success'} round style={{alignSelf:'center', margin:10}}
            onPress={()=>{uservote=1; vote='yes';console.log(vote); Alert.alert('You have accepted the invitation of '+groupname+'.');navigation.goBack()}}>
            Yes
            </Button>:null}
          {uservote==0?<Button 
            size={'small'} color="red" round style={{alignSelf:'center', margin:10}}
            onPress={()=>{uservote=1; vote='no';console.log(vote); Alert.alert('You have declined the invitation of '+groupname+'.');navigation.goBack()}}>
            No
            </Button>:null}
          {vote=='yes'?<Text style={styles.subtitle3}>You have accepted the invitation, now waiting...</Text>:null}
          {vote=='no'?<Text style={styles.subtitle3}>You have declined the invitation.</Text>:null}     
        </View>
      </View>
    )
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
    fontSize: 16,
    marginHorizontal:10
  },
  subtitle2:{
    fontSize: 16,
    marginHorizontal:10
  },
  subtitle3:{
    fontSize: 26,
    marginHorizontal:10
  },
  image:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: 2,
    borderColor:"gray",
    resizeMode: "center",
  },
  imageyes:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: 2,
    borderColor:"green",
    resizeMode: "center",
  },
  imageno:{
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 3,
    marginRight: 10,
    borderWidth: 2,
    borderColor:"red",
    resizeMode: "center",
  },
  name:{
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 12,
  },
  name2:{
    width:'30%',
    alignSelf:'center',
    fontWeight:"bold",
    fontSize: 14,
  },
  hyperlink:{
    color:'blue',
    fontSize: 16,
    marginHorizontal:10,
    textDecorationLine: 'underline'
  }
})

export default Pending