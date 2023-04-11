import React, {Component} from 'react';
import {View} from 'react-native';
import Nav from './src/nav'
import * as SQLite from 'expo-sqlite';
import {
  insertAccountData,
  insertAccountDatawithID,
  insertGoalData,
  insertDepositData,
  deleteAccountData,
  deleteGoalData,
  deleteDepositData,
  selectAccountData,
} from './database'

const db = SQLite.openDatabase('maindb.db');

class Index extends Component {

  state = { } 

  componentDidMount() {

    // Create Account Table if not exists
    db.transaction(tx => {
      tx.executeSql(
        //'DROP TABLE Account;\
        'CREATE TABLE IF NOT EXISTS Account \
        (Account_ID INTEGER PRIMARY KEY AUTOINCREMENT, \
          password TEXT, \
          name TEXT, \
          bank TEXT, \
          phone INTEGER, \
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
              console.log('Account content:', resultSet.rows);
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
      // %YY%MM%DD%HH%MM%SS
      tx.executeSql(
        //'DROP TABLE Goal;\
        'CREATE TABLE IF NOT EXISTS Goal \
        (Goal_ID INTEGER PRIMARY KEY AUTOINCREMENT, \
          Goal_name TEXT, \
          Goal_type TEXT, \
          Goal_amount INTEGER, \
          is_pending INTEGER, \
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
        //'DROP TABLE Deposit;\
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
      
      // create Vote table
      tx.executeSql(
        //'DROP TABLE Vote;\
        'CREATE TABLE IF NOT EXISTS Vote \
        ( Vote_ID INTEGER,\
          Account_ID INTEGER, \
          Goal_ID INTEGER, \
          vote_type TEXT, \
          vote_detail TEXT, \
          is_vote INTEGER, \
          FOREIGN KEY (Account_ID) REFERENCES Account (ID), \
          FOREIGN KEY (Goal_ID) REFERENCES Goal(ID));',
          [],
          (tx, result) => {
            // print table info
            console.log('Table created successfully');
            tx.executeSql(
              'SELECT * FROM Vote;',
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

      // create group table
      tx.executeSql(

        //'DROP TABLE Goal_Group;\
        'CREATE TABLE IF NOT EXISTS Goal_Group \
        ( Account_ID INTEGER, \
          Goal_ID INTEGER, \
          FOREIGN KEY (Account_ID) REFERENCES Account (ID), \
          FOREIGN KEY (Goal_ID) REFERENCES Goal(ID));',
          [],
          (tx, result) => {
            // print table info
            console.log('Table created successfully');
            tx.executeSql(
              'SELECT * FROM Goal_Group;',
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
      /*insertAccountDatawithID('4','USER3','orange','91234567','test','100000003','1500').
       then(res => {
         console.log("insertion valid",res);
       }).catch(err => {
        console.log("insertion invalid",err);
      });
      
     /* selectAccountData('1').
      then(res => {
        console.log("select valid",res);
      }).catch(err => {
       console.log("select invalid",err);
     });
    
    /* deleteAccountData('4')
     .then(res => {
      console.log("delete valid",res);
    }).catch(err => {
     console.log("delete invalid",err);
   });
   /**/

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
