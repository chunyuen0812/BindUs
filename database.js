import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('maindb.db');

export const insertAccountData = (ID,name,password,bank,bank_card,balance) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Account (Account_ID,name,password,bank,bank_card,balance) VALUES (?,?,?,?,?,?);',
                [ID,name,password,bank,bank_card,balance],
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

export const insertGoalData = (Account_ID,Goal_ID,Goal_amount,Goal_time) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Goal (Account_ID, Goal_ID, Goal_amount, Goal_time) VALUES (?,?,?,?);',
                [Account_ID, Goal_ID, Goal_amount, Goal_time],
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
                    resolve(result);
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
                    resolve(result);
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
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};

