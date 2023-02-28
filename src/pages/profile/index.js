import React, {Component} from 'react';
import { View, ImageBackground, StyleSheet,ScrollView,Dimensions,Image} from 'react-native';
import { Block,Text,theme,Button} from 'galio-framework';
import { HeaderHeight } from '../../utils/styleKits';
import { argonTheme} from '../../utils'
import axios from 'axios';
import {token} from '../../utils/pathMap'

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class Index extends Component {


    state = {  } 

    handleUpdate = () =>{
        axios({
            method: 'post',
            url: 'https://datastudio.simnectzplatform.com/gateway/SIMNECTZ/1676014870768//e-wallet/sys/loginuserenquiry',
            headers:{token:token},
            data:{}
          }).then((response) => {
            console.log(response);
            // 拉取并更新数据
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });

    }

    render() { 
        return (
            <Block flex style={styles.profile}>
              <Block flex>
                <ImageBackground
                  source={require("../../res/profile-screen-bg.png")}
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
                      style={{ backgroundColor: argonTheme.COLORS.INFO }}
                      onPress={this.handleUpdate}
                    >
                      Update
                    </Button>
                  </Block>

                        <Block row space="between">
                          <Block middle>
                            <Text
                              bold
                              size={18}
                              color="#525F7F"
                              style={{ marginBottom: 4 }}
                            >
                              $ XXX
                            </Text>
                            <Text size={12} color={argonTheme.COLORS.TEXT}>Blance</Text>
                          </Block>
                          <Block middle>
                            <Text
                              bold
                              color="#525F7F"
                              size={18}
                              style={{ marginBottom: 4 }}
                            >
                              XX-XX-XXXX
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
                            size={16}
                            color="#525F7F"
                            style={{ textAlign: "center" }}
                          >
                            Username
                          </Text>
                          
                        </Block>
                        <Text></Text>
                        <Block row space ='evenly'>
                          <Text bold size={16} color="#525F7F" >
                            customerId
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            1111111
                          </Text>
                        </Block>

                        <Block row space ='evenly'>
                          <Text bold size={16} color="#525F7F" >
                            last name
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            1111111
                          </Text>
                        </Block>

                        <Block row space ='evenly'>
                          <Text bold size={16} color="#525F7F" >
                            first name
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            1111111
                          </Text>
                        </Block>

                        <Block row space ='evenly'>
                          <Text bold size={16} color="#525F7F" >
                            birthday
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            1111111
                          </Text>
                        </Block>

                        <Block row space ='evenly'>
                          <Text bold size={16} color="#525F7F" >
                            bank card
                          </Text>
                          <Text style={{ color: "#525F7F", fontSize: 16}}>
                            1111111
                          </Text>
                        </Block>

                        <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
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