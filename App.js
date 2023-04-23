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
  insertGroupData,
  deleteGroupData,
  insertVoteData,
} from './database'

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
        //'DROP TABLE Account;\
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
            tx.executeSql(
              'SELECT * FROM Goal_Group;',
              [],
              (tx, resultSet) => {
                console.log('Group content:', resultSet.rows);
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
    
      //for(i=1;i<5;i++){
      //  insertVoteData(0,i,4,'New group','').
      //  then(res => {
      //    console.log("insertion valid",res);
      //  }).catch(err => {
      //   console.log("insertion invalid",err);
      // });
      //}
      
      //update table
      //tx.executeSql(
      //    'UPDATE Goal SET is_pending="1"',
      //    [],
      //    (tx, result) => {
      //      tx.executeSql(
      //        'SELECT * FROM Goal;',
      //        [],
      //        (tx, resultSet) => {
      //          console.log('Goal:', resultSet.rows);
      //        },
      //        (tx, error) => {
      //          console.error('Error selecting data', error);
      //        }
      //      );},            
      //    (tx, error) => {
      //      console.error('Update table', error);
      //    }
      //);
      // insertion example
    //  for(i=1;i<5;i++){
    //    for(j=1;j<4;j++){
    //      insertDepositData(i,j,'100').
    //  then(res => {
    //    console.log("insert valid",res);
    //  }).catch(err => {
    //   console.log("insert invalid",err);
    // });
    //    }
    //  }

    //   for(j=1;j<4;j++){
    //     insertGroupData(i,j).
    // then(res => {
    //   console.log("insert valid",res);
    // }).catch(err => {
    //  console.log("insert invalid",err);
    //});
    //   }
     
      
    //  insertDepositData('1','2','250').
    //  then(res => {
    //    console.log("insertion valid",res);
    //  }).catch(err => {
    //   console.log("insertion invalid",err);
    // });
      
   //  insertGoalData('Party','short','4000','2023-05-30').
   //  then(res => {
   //    console.log("insertion valid",res);
   //  }).catch(err => {
   //   console.log("insertion invalid",err);
   // });
   //  insertAccountData('User 3','orange','90000003','test','100000000003','2000').
   //   then(res => {
   //     console.log("insertion valid",res);
   //   }).catch(err => {
   //    console.log("insertion invalid",err);
   //  });
      
    //  selectAccountData('5').
    //  then(res => {
    //    console.log("select valid",res);
    //  }).catch(err => {
    //   console.log("select invalid",err);
    // });
    
   // deleteGroupData('4')
   // .then(res => {
   //  console.log("delete valid",res);
   //}).catch(err => {
   // console.log("delete invalid",err);
   //});
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
