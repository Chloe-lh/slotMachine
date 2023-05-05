// TODO: deposit money
//*import package
const prompt = require("prompt-sync")();
//*global variables
    const ROWS = 3;
    const COLS = 3;
    //? keys mapped to different values
        //SYMBOLS_COUNT[A] -> 2
    const SYMBOLS_COUNT = {
        A:2,
        B:4,
        C:6,
        D:8,
    }
    const SYMBOLS_VALUE = {
        A:5,
        B:4,
        C:3,
        D:2,
    }

    //? 1st way to make function
        // function deposit(){
        // }
    //? 2nd way to make function 
    const deposit = () => {
        while(true){
            const depositAmount = prompt("Enter deposit amount: ");
            //*convert deposit amount to integer because prompt returns string
            const numDepositAmount = parseFloat(depositAmount);
            //* check if valid
            if(isNaN(numDepositAmount) || numDepositAmount<=0){
                console.log("Invalid deposit amount, try again");
            }else{
                //*breaks while loop
                return numDepositAmount;
            }
        } 
    };
    //const depositAmount = deposit();
    //? let allows variable to be changed
    let balance = deposit(); 
// TODO: determine number of lines to bet on
    //? functions have to be defined BEFORE you use them
    const getNumOfLines = () => {
        while(true){
            const lines = prompt("Enter the number of lines to bet on (1-3): ");
            const numLines = parseFloat(lines);
            if(isNaN(numLines) || numLines<=0 || numLines>3){
                console.log("Invalid number of lines, try again");
            }else{
                return numLines;
            }
        } 
    };
    const numOfLines = getNumOfLines();
// TODO:  collect a bet amount 
    const getBet = (balance,numOfLines) =>{
        while(true){
            const bet = prompt("Enter the bet per line: ");
            const numBet = parseFloat(bet);
            if(isNaN(numBet) || numBet<=0 || numBet>(balance/numOfLines) ){
                console.log("Invalid bet, try again");
            }else{
                return numBet;
            }
        }
    };
    const bet = getBet(balance,numOfLines);
// TODO:  Spin slot machine
    const spin = () =>{
        const symbols = [];
        for( const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
            for(let i=0;i<count;i++){
                //adds 2 As into array
                symbols.push(symbols);
            }
        }

    };

// TODO: check if user won 
// TODO: give user winnings or take bet
// TODO:  play again 