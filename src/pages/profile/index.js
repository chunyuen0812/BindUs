import React, {Component} from 'react';
import { View, ImageBackground, StyleSheet,ScrollView,Dimensions,Image} from 'react-native';
import { Block,Text,theme,Button} from 'galio-framework';
import { HeaderHeight } from '../../utils/styleKits';
import { argonTheme} from '../../utils'
import axios from 'axios'; 
import * as SQLite from 'expo-sqlite';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const db = SQLite.openDatabase('maindb4.db');


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileData: null,
      balance: null,
      bankcard: null,
      deposit2: null,
      deposit3: null,
      deposit4: null,
    };
  }

  componentDidMount() {
    const { token,} = this.props;


    axios({
      method: 'post',
      url: 'https://datastudio.simnectzplatform.com/gateway/SIMNECTZ/1676014870768/e-wallet/sys/loginuserenquiry',
      headers: { token: token },
      data: {},
    })
      .then((response) => {
        console.log(response);
        // Update the local state with the profile data
        this.setState({ profileData: response.data});

        db.transaction((tx) => {
          // Define the SQL query to search for a record with a specific Account_ID
          const query = 'SELECT * FROM Account WHERE phone = ?';
          const params = [this.state.profileData?.data?.phone]; // Replace 1 with the Account_ID you want to search for

          const query2 = ' \
            SELECT d.Goal_ID, SUM(d.Deposit_amount) AS total_deposit \
            FROM Deposit d \
            JOIN Account a ON d.Account_ID = a.Account_ID \
            WHERE a.phone = ? \
            GROUP BY d.Goal_ID'
            ;

          const query3 = '\
            SELECT Goal_name\
            FROM Goal\
            WHERE Goal_ID = ?';

    
          // Execute the SQL query with the specified parameters
          tx.executeSql(query, params, (tx, results) => {
            // Get the first record from the results array
              const record = results.rows.item(0);
              // Log the record to the console
              console.log(record);
              this.setState({bankcard: record.bank_card, balance: record.balance, username: record.name});
            },(error) => {
              console.error('Error retrieving data:', error);
            });

          // Execute the SQL query with the specified parameters
           tx.executeSql(query2, params, (tx, results2) => {
              // Get the results array
              const record2 = results2.rows.item(0);
              const record3 = results2.rows.item(1);
              const record4 = results2.rows.item(2);
              // Log the results to the console
              console.log(record2);
              console.log(record3);
              console.log(record4);
              // Update the local state with the deposit data
              this.setState({ deposit2: record2 ,deposit3: record3 ,deposit4: record4 });
            }, (error) => {
              console.error('Error retrieving data:', error);
            });
            
          });
      })
      .catch((error) => {
        console.error(error);
      });

      // axios({
      //   method: 'get',
      //   url: 'https://datastudio.simnectzplatform.com/gateway/SIMNECTZ/1676014874984/e-wallet/pay/eWalletBalance',
      //   headers: { token: token },
      //   data: {},
      // })
      //   .then((response) => {
      //     console.log(response);
      //     // Update the local state with the profile data
      //     this.setState({ Balance: response.data });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // db.transaction((tx) => {
      //   tx.executeSql(
      //     'SELECT * FROM Account WHERE Account_ID LIKE ?',
      //     [1],
      //     (tx, results) => {
      //       const rows = results.rows.raw();
      //       console.log('Data retrieved successfully:', rows);
      //       // Update the local state with the retrieved data
      //       this.setState({ searchData: rows });
      //     },
      //     (error) => {
      //       console.error('Error retrieving data:', error);
      //     },
      //   );
      // });
      // Open a transaction to execute a SQL query

        

  }

    // handleUpdate = () =>{
    //       const {token} = this.props;
    //       axios({
    //         method: 'post',
    //         url: 'https://datastudio.simnectzplatform.com/gateway/SIMNECTZ/1676014870768//e-wallet/sys/loginuserenquiry',
    //         headers:{token:token},
    //         data:{}
    //       }).then((response) => {
    //         console.log(response);
    //         this.setState({profileData:response.data})
    //       })
    //       .catch((error) => {
    //         // Handle error
    //         console.error(error);
    //       });

    // };

    handleBinding = () =>{
      this.props.navigation.navigate("Bind");

    };


    render() { 
        const today = new Date();
        const dateString = today.toLocaleDateString(); 
        const{profileData, bankcard,balance,username, deposit2,deposit3,deposit4} = this.state;
        return (
          
            <Block flex style={styles.profile}>
              <Block flex>
                <ImageBackground
                  source={require("../../res/register-bg.png")}
                  style={styles.profileContainer}
                  imageStyle={styles.profileBackground}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width, marginTop: '25%' }}
                  >
                    <Block flex style={styles.profileCard}>

                    {/* icon */}
                      <Block middle style={styles.avatarContainer}>
                        <Image
                          source={require('../../res/icon.jpeg')}
                          style={styles.avatar}
                        />
                      </Block>

                      <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.ACTIVE }}
                      onPress={this.handleBinding}
                    >
                      Bind
                    </Button>
                    {/* <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                      onPress={this.handleRecharging}
                    >
                      Recharge
                    </Button> */}
                  </Block>

                        <Block row space="between">
                          <Block middle>
                            <Text
                              bold
                              size={18}
                              color="#525F7F"
                              style={{ marginBottom: 4 }}
                            >
                              ${balance}
                            </Text>
                            <Text size={12} color={argonTheme.COLORS.TEXT}>Balance</Text>
                          </Block>
                          <Block middle>
                            <Text
                              bold
                              color="#525F7F"
                              size={18}
                              style={{ marginBottom: 4 }}
                            >
                              {dateString}
                            </Text>
                            <Text size={12} color={argonTheme.COLORS.TEXT}>Last Update Time</Text>
                          </Block>
                        </Block>
                      </Block>
                      <Block flex>
                        
                        <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                          <Block style={styles.divider} />
                        </Block>
                        <Block middle>
                          <Text
                            size={22}
                            color="#525F7F"
                            style={{ textAlign: "center" }}
                          >
                            {username}
                          </Text>
                          
                        </Block>
                        <Text></Text>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                            CustomerId
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            {profileData?.data?.customerId}
                          </Text>
                        </Block>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                            Birthday
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            {profileData?.data?.birthday}
                          </Text>
                        </Block>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                            Bank Card
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            {bankcard}
                          </Text>
                        </Block>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                            Phone
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            {profileData?.data?.phone}
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            size={22}
                            color="#525F7F"
                            style={{ textAlign: "center" }}
                          >
                            Group List
                          </Text>
                          
                        </Block>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                          {deposit2?.Goal_ID ? "New Shop" : ''}
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                          {deposit2?.total_deposit}
                          </Text>
                        </Block>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                          {deposit3?.Goal_ID ? 'Christmas Party' : ''}
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                          {deposit3?.total_deposit}
                          </Text>
                        </Block>

                        <Block style={{flexDirection:"row", justifyContent: 'space-between'}}>
                          <Text bold size={20} color="#525F7F" >
                          {deposit4?.Goal_ID ? 'Grad Trip' : ''}
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                          {deposit4?.total_deposit}
                          </Text>
                        </Block>


                        <Block style={{ paddingBottom: - HeaderHeight * 2 }}>
                          <Block row space="between" style={{ flexWrap: "wrap" }}>
                            
                          </Block>
                        </Block>

                      </Block>
                    </Block>
                  </ScrollView>
                </ImageBackground>
              </Block>
              </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
      marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
      // marginBottom: -HeaderHeight * 2,
      flex: 1
    },
    profileContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1
    },
    profileBackground: {
      width: width,
      height: height / 2
    },
    profileCard: {
      // position: "relative",
      padding: theme.SIZES.BASE,
      marginHorizontal: theme.SIZES.BASE,
      marginTop: 65,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
      shadowOpacity: 0.2,
      zIndex: 2
    },
    info: {
      paddingHorizontal: 40
    },
    avatarContainer: {
      position: "relative",
      marginTop: -80
    },
    avatar: {
      width: 124,
      height: 124,
      borderRadius: 62,
      borderWidth: 0
    },
    nameInfo: {
      marginTop: 35
    },
    divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF"
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: "center",
      width: thumbMeasure,
      height: thumbMeasure
    }
  });
 
export default Index;