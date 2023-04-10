import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('maindb.db');

export const selectAccountData=(ID)=>{
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
              // print table info
              'SELECT * FROM Account WHERE Account_ID = ?;',
              [ID],
              (tx, result) => {
                    resolve(result.rows.item(0));
                },
                (tx, error) => {
                    reject(error);
                }
            );
          });
    });
}

export const selectGoalData=(ID)=>{
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Goal WHERE Goal_ID = ?;',
                [ID],
                (tx, result) => {
                    resolve(result.rows.item(0));
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
}

export const selectDepositData=(ID)=>{
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Deposit WHERE Deposit_ID = ?;',
                [ID],
                (tx, result) => {
                    resolve(result.rows);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
}

export const insertAccountData = (ID,name,password,phone,bank,bank_card,balance) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Account (Account_ID,name,phone,password,bank,bank_card,balance) VALUES (?,?,?,?,?,?,?);',
                [ID,name,phone,password,bank,bank_card,balance],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const insertDepositData = (Account_ID,Goal_ID,Deposit_amount,Deposit_time) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Deposit (Account_ID, Goal_ID, Deposit_amount, Deposit_time) VALUES (?,?,?,?);',
                [Account_ID, Goal_ID, Deposit_amount, Deposit_time],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const insertGoalData = (Goal_name,Goal_type, Goal_target, end_time) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            console.log('inserting goal')
            tx.executeSql(
                'INSERT INTO Goal (Goal_name, Goal_type, Goal_target, end_time) VALUES (?,?,?,?,TO_DATE(?, DD/MM/YYYY));',
                [Goal_name, Goal_type, Goal_target, end_time],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const deleteAccountData = (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Account WHERE Account_ID =?;',
                [ID],
                (tx, result) => {
                    resolve(result.rows);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const deleteDepositData = (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Deposit WHERE Deposit_ID =?;',
                [ID],
                (tx, result) => {
                    resolve(result.rows);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const deleteGoalData = (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Goal WHERE Goal_ID =?;',
                [ID],
                (tx, result) => {
                    resolve(result.rows);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

