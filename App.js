import React, {Component} from 'react';
import {View} from 'react-native';
import Nav from './src/nav'
import * as SQLite from 'expo-sqlite';
import {
  insertAccountData,
  insertGoalData,
  insertDepositData,
  deleteAccountData,
  deleteGoalData,
  deleteDepositData,
} from './database'

const db = SQLite.openDatabase('maindb.db');

class Index extends Component {

  state = { } 

  componentDidMount() {

    // Create Account Table if not exists
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Account \
        (Account_ID INTEGER PRIMARY KEY AUTOINCREMENT, \
          password TEXT, \
          name TEXT, \
          bank TEXT, \
          bank_card INTEGER, \
          balance INTEGER);',
        [],
        (tx, result) => {
          console.log('Table created successfully');
          tx.executeSql(
            // print table info
            'SELECT * FROM Account;',
            [],
            (tx, resultSet) => {
              console.log('Table content:', resultSet.rows);
            },
            (tx, error) => {
              console.error('Error selecting data', error);
            }
          );
        },
        (tx, error) => {
          // print creation error
          console.error('Error creating table', error);
        }
      );


      // Create Goal Table if not exists
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Goal \
        (Goal_ID INTEGER PRIMARY KEY AUTOINCREMENT, \
          Goal_name TEXT, \
          Goal_amount INTEGER, \
          start_time timestamp, \
          end_time timestamp);',
          [],
          (tx, result) => {
            // print table info
            console.log('Table created successfully');
            tx.executeSql(
              'SELECT * FROM Goal;',
              [],
              (tx, resultSet) => {
                console.log('Table content:', resultSet.rows);
              },
              (tx, error) => {
                console.error('Error selecting data', error);
              }
            );},
            
          (tx, error) => {
            // print creation error
            console.error('Error creating table', error);
          }
      );


      // Create Deposit Table if not exists
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Deposit \
        (Account_ID INTEGER, \
          Goal_ID INTEGER, \
          Deposit_ID INTEGER PRIMARY KEY AUTOINCREMENT, \
          Deposit_amount INTEGER, \
          Deposit_time timestamp,\
          FOREIGN KEY (Account_ID) REFERENCES Account(ID), \
          FOREIGN KEY (Goal_ID) REFERENCES Goal(ID));',
          [],
          (tx, result) => {
            // print table info
            console.log('Table created successfully');
            tx.executeSql(
              'SELECT * FROM Deposit;',
              [],
              (tx, resultSet) => {
                console.log('Table content:', resultSet.rows);
              },
              (tx, error) => {
                console.error('Error selecting data', error);
              }
            );},
            
          (tx, error) => {
            // print creation error
            console.error('Error creating table', error);
          }
      );          
      
      // insertion example
      // insertAccountData('1','TEST','123456','test','123456789','1000').
      // then(res => {
      //   console.log("insertion valid",res);
      // }).catch(err => {
      //   console.log("insertion invalid",err);
      // });


    });
  }

  render() { 
    return (
      <View style={{flex:1}}>
        <Nav/>
      </View>
    );
  }
}

export default Index;
