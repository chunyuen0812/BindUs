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

export const selectGroupMember=(ID)=>{
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT Account_ID FROM Goal_Group WHERE Goal_ID = ?;',
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

export const selectGroupList=(ID)=>{
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT Goal_ID FROM Goal_Group WHERE Account_ID= ?;',
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
export const insertAccountDatawithID = (id, name,password,phone,bank,bank_card,balance) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Account (Account_ID,name,phone,password,bank,bank_card,balance) VALUES (?,?,?,?,?,?,?);',
                [id,name,phone,password,bank,bank_card,balance],
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


export const insertAccountData = (name,password,phone,bank,bank_card,balance) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Account (name,phone,password,bank,bank_card,balance) VALUES (?,?,?,?,?,?);',
                [name,phone,password,bank,bank_card,balance],
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

export const insertnewVoteData = (Vote_ID, Account_ID, Goal_ID, vote_type, vote_detail) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Vote (Vote_ID, Account_ID, Goal_ID, vote_type, vote_detail, is_vote) VALUES (?,?,?,?,?,0);',
                [Vote_ID, Account_ID, Goal_ID, vote_type, vote_detail],
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

export const insertGroupData = (Account_ID,Goal_ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Goal_Group (Account_ID, Goal_ID) VALUES (?,?);',
                [Account_ID, Goal_ID],
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

export const insertDepositData = (Account_ID,Goal_ID,Deposit_amount) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Deposit (Account_ID, Goal_ID, Deposit_amount, Deposit_time) VALUES (?,?,?,CURRENT_TIMESTAMP);',
                [Account_ID, Goal_ID, Deposit_amount],
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

export const insertGoalData = (Goal_ID,Goal_name,Goal_type,Goal_amount,is_pending,start_time, end_time) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            console.log('inserting goal')
            tx.executeSql(
                'INSERT INTO Goal (Goal_ID,Goal_name,Goal_type,Goal_amount,is_pending,start_time, end_time) VALUES (?,?,?,?,?,TO_DATE(?, DD/MM/YYYY),TO_DATE(?, DD/MM/YYYY));',
                [Goal_ID,Goal_name,Goal_type,Goal_amount,is_pending,start_time, end_time],
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

export const insertVoteData = (Account_ID,Goal_ID,vote_type,vote_detail,is_vote) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            console.log('inserting Vote')
            tx.executeSql(
                'INSERT INTO Goal (Account_ID,Goal_ID,vote_type,vote_detail,is_vote) VALUES (?,?,?,?,?);',
                [Account_ID,Goal_ID,vote_type,vote_detail,is_vote],
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

export const insertGoal_GroupData = (Account_ID,Goal_ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            console.log('inserting Vote')
            tx.executeSql(
                'INSERT INTO Goal (Account_ID,Goal_ID) VALUES (?,?);',
                [Account_ID,Goal_ID],
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

export const deleteVoteData = (gID, vID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Vote WHERE Goal_ID =? AND Vote_ID =?;',
                [gID, vID],
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


export const deleteGroupData = (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Goal_Group WHERE Goal_ID =?;',
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



