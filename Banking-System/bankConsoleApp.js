let isvalid = function(index,accType,amt){
    return (users[index].account.hasOwnProperty(accType) && amt>0);
}

let getindex = function(id){
    let index = users.findIndex((obj)=>{
        return obj.id == id
    })
    return index;
}

let findUser = function(id){
    let index = getindex(id);
    index==-1?console.log("User not found\n"):console.log(`Username :${users[index].name}\n`);
}

let depositAmt = function(id,accType,amt){
    let index = getindex(id);
    if(index==-1){
        console.log("User does not exist\n");
        return false;
    }
    if(!isvalid(index,accType,amt)){
        console.log("Enter Valid account type or amount\n");
        return false;
    }
    users[index].account[accType] +=amt;
    users[index].transaction.push({Type:"Deposit",Amount:amt,AccType:accType});
    console.log(`${amt} deposited to Account Id :${users[index].id} (${users[index].name})\n`);
    return true;
}

let withdraw =function(id,accType,amt){
    let index = getindex(id);
    if(index==-1){
        console.log("User does not exist\n");
        return false;
    }
    if(!isvalid(index,accType,amt)){
        console.log("Enter Valid account type or amount\n");
        return false;
    }
    if(users[index].account[accType]<amt){
        console.log("Withdraw not possible\n")
        return false;
    }
    users[index].account[accType] -=amt;
    users[index].transaction.push({Type:"Withdrawn",Amount:amt,AccType:accType});
    console.log(`${amt} withdrawn from Account Id :${users[index].id} (${users[index].name})\n`);
    return true;
}

let transfer =function(Fromid,accType1,Toid,accType2,amt){
    let index1 =getindex(Fromid);
    let index2 =getindex(Toid);
    if(index1==-1||index2==-1 ||index1===index2){
        console.log("Check your entered user Id / You entered same acc Id\n");
        return;
    }
    let checkwithdraw = withdraw(Fromid,accType1,amt);
    if(!checkwithdraw){
        console.log("Payment Unsuccessful\n");
        return false;
    }
    let checkdeposit = depositAmt(Toid,accType2,amt);
    if(!checkdeposit){
        depositAmt(Fromid,accType1,amt);
        console.log("Payment Unsuccessful, Amount is refunded back\n");
    }
    if(checkdeposit && checkwithdraw){
        console.log(`Payment done from ${users[index1].name} (${accType1}) to ${users[index2].name} (${accType2})\n`);
    } 
}

let bankStatus = function(id){
    let index = getindex(id);
    if(index==-1){
        console.log("User does not exist\n");
        return false;
    }
    console.log("\n----"+users[index].name+" Bank Status----\n");
    console.log(`Savings Balance: ${users[index].account.savings}\n`);
    console.log(`Current Balance: ${users[index].account.current}\n`);
    console.log(`Total Balance: ${users[index].account.savings+users[index].account.current}\n`);
}

let getSummary = function(id){
    let index = getindex(id);
    if(index==-1){
        console.log("User does not exist\n");
        return false;
    }
    console.log("\n----"+users[index].name+" Bank summary----\n");
    for( let val of users[index].transaction){
        console.log(val);
    }
}

// USER DATABASE 
let users = [
  {name:"Rishant",id:1234,account:{savings:10000,current:30000},transaction:[]},
  {name:"Aarav",id:1235,account:{savings:15000,current:7000},transaction:[]},
  {name:"Diya",id:1236,account:{savings:8000,current:2000},transaction:[]},
  {name:"Kabir",id:1237,account:{savings:20000,current:10000},transaction:[]},
  {name:"Sneha",id:1238,account:{savings:12000,current:4000},transaction:[]}
];

console.log("\n----BANK CONSOLE APP----\n");
// BANK CONSOLE APP TESTING......
depositAmt(1234, "savings", 1000);          // valid deposit
withdraw(1234, "current", 2000);            // valid withdraw
depositAmt(1234, "crypto", 1000);           // invalid account type
withdraw(1234, "savings", 999999);          // insufficient balance
withdraw(9999, "savings", 500);             // invalid user
transfer(1234, "savings", 1235, "current", 2000); // valid transfer
transfer(1234, "savings", 1235, "cry", 1000);     // invalid receiver account (rollback)
transfer(1234, "gold", 1235, "current", 1000);    // invalid sender account
transfer(1234, "savings", 1234, "current", 1000); // same user transfer
getSummary(1234);                           // verify transaction log