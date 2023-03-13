import { ScrollView,Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import {NavBar, Input,Button} from 'galio-framework';
import React, { Component } from 'react'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      profpic: require('../../res/profilepic.jpg'),
      name: 'User 1',
      phoneno:'12345678',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      profpic: require('../../res/profilepic.jpg'),
      name: 'User 2',
      phoneno:'12345678',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      profpic: require('../../res/profilepic.jpg'),
      name: 'User 3',
      phoneno:'12345678',
    },
  ];

  const Item = ({id, name, profpic, phoneno}) => {
    return(
    <View style={styles.membercontainer}>
        <Image source={profpic} style={styles.image}/>
        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row',flex:1, width:300}}>
                <Text style={styles.name}>{name}</Text>
                <Text>{phoneno}</Text>
            </View>
            <Text numberOfLines={1} style={{fontSize:15, color:'grey'}}>{id}</Text>
        </View>
    </View>
    );
    
  };

  const renderItem = ({ item }) => <Item 
    id={item.id}
    profpic={item.profpic} 
    name={item.name}
    phoneno={item.phoneno} />;

class CreateGroup extends Component {
    state = { 
        GrpName: "",
	    GrpDescript: "",
	    GoalTarget: "",
	    GoalTimeLimit: "",
	    Members: 0,
     }; 

     SignUp = () => {
        // 註冊帳號
        const { GrpName,GrpDescript,GoalTarget,GoalTimeLimit,Members} = this.state;
        // if not any input
        if (!GrpName || !GrpDescript || !Members || !GoalTimeLimit || !GoalTarget) {
          Alert.alert('Error', 'Please enter all.');
          return;
        } else {
            console.log('Check flags');
            console.log('Input to database');
           this.props.navigation.navigate('Home');
        };
        
    };

   render(){
    return (
    <View>
        <NavBar style={styles.header} titleStyle={styles.title} back  title="Create Group" 
        onLeftPress={()=>this.props.navigation.navigate('Home')} leftStyle={{width:30,height:30}} leftIconSize={30}
        />
        <View style={styles.container}>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Group Name" onChangeText={(text) => this.setState({ GrpName: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Description" onChangeText={(text) => this.setState({ GrpDescript: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Goal Target Amount" type={'number-pad'} onChangeText={(text) => this.setState({ GoalTarget: text })}/>
            <Input style={{width:"90%",marginLeft: 20}} placeholder="Time Limit/ End Date" type={'datetime'} onChangeText={(text) => this.setState({ GoalTimeLimit: text })}/>
            <View style={{flexDirection:'row', margin:5, justifyContent:'space-evenly',}}>
                <Text style={styles.subtitle}>Members:</Text>
                <Button style={{alignSelf:'flex-end'}} onPress={()=>console.log('To Contact list')} size={'small'}> Add </Button>
            </View>
            <View style={{borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'dimgrey', height:'45%'}}>
              <FlatList 
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}/>  
            </View>     
            <View style={{alignItems:'center'}}>
                <Button color="#5BC0DE" round style={{width:"40%"}} onPress={this.SignUp}>Submit</Button>
            </View>
        </View>
    </View>
    )
  }
}

const styles= StyleSheet.create({
    membercontainer:{
        margin:5,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor:"lightgray",
    },
    image:{
        alignSelf:'flex-start',
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
        flex: 1,
        fontWeight:"bold",
        fontSize: 18,
      },
    container: {
        marginTop:5,
        flexDirection: "column",
      },
    header:{
      marginTop:25,
      backgroundColor:'lightgrey',
    },
    title:{
      fontSize: 32,
      color:'black',
      fontWeight:'bold'
    },
    subtitle:{
        alignSelf:'center',
        fontSize: 20,
    },
  })

export default CreateGroup