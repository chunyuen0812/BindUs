import React, {Component} from 'react';
import {View} from 'react-native';
import Nav from './src/nav'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('maindb4.db');

class Index extends Component {

  state = { } 

  componentDidMount() {

    // Insert Data
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'INSERT INTO Goal (Goal_ID,Goal_amount,Goal_name,Goal_type,end_time,is_pending,start_time) VALUES (?, ?,?,?,?,?,?);',
    //     [2,5000,"Christmas Party","short","20-12-2023",0,"2023-04-20 07:28:12"],
    //     (tx, result) => {
    //       console.log('Data inserted successfully');
    //     },
    //     (tx, error) => {
    //       console.error('Error inserting data', error);
    //     }
    //   );

    // });
    
    // Update data
    // db.transaction((tx) => {
    //   // Define the SQL query to update the balance of a record with a specific Account_ID
    //   const query = 'UPDATE Account SET phone = ? WHERE Account_ID = ?';
    //   const params = [13666666666, 1]; // Replace newBalance and accountId with the new balance and Account_ID you want to update
    
    //   // Execute the SQL query with the specified parameters
    //   tx.executeSql(query, params, (tx, results) => {
    //     console.log('Record updated successfully');
    //   }, (error) => {
    //     console.error('Error updating record:', error);
    //   });
    // });

  // Create Account Table if not exists
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Account \
        (Account_ID INTEGER PRIMARY KEY AUTOINCREMENT, \
          password TEXT, \
          name TEXT, \
          phone INTEGER, \
          bank TEXT, \
          bank_card INTEGER, \
          balance INTEGER);',
        [],
        (tx, result) => {
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
   // %YY%MM%DD%HH%MM%SS
      tx.executeSql(
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
        'CREATE TABLE IF NOT EXISTS Vote \
        ( Account_ID INTEGER, \
          Goal_ID INTEGER, \
          vote_type TEXT, \
          vote_detail TEXT, \
          is_vote INTEGER, \
          FOREIGN KEY (Account_ID) REFERENCES Account (ID), \
          FOREIGN KEY (Goal_ID) REFERENCES Goal(ID));',
          [],
          (tx, result) => {
            // print table info
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

        'CREATE TABLE IF NOT EXISTS Goal_Group \
        ( Account_ID INTEGER, \
          Goal_ID INTEGER, \
          FOREIGN KEY (Account_ID) REFERENCES Account (ID), \
          FOREIGN KEY (Goal_ID) REFERENCES Goal(ID));',
          [],
          (tx, result) => {
            // print table info
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
