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
// TODO:  Spin slot machine
    const spin = () =>{
        const symbols = [];
        for( const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
            for(let i=0;i<count;i++){
                //adds 2 As into array
                symbols.push(symbol);
            }
        }
        // each array represents a collumn
        const reels = [];
        for(let i=0;i<COLS;i++){
            reels.push([]);
            //? copies symbols available for each reel into another array
            const reelSymbols = [...symbols];
            for(let j=0;j<ROWS;j++){
                const randomIndex = Math.floor(Math.random()*reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                //remove symbol so it cannot be selected again (i , num) num = remove number of elements
                reelSymbols.splice(randomIndex,1);

            }
        }
        return reels;
    };  
// TODO: check if user won 
    // vertical collumns : [A D C],[D D A],[B C B] -> transpose into rows
    // A D B
    // D D C
    // C A B
    const transpose = (reels) =>{
        const rows = []
        for(let i=0; i<ROWS; i++){
            rows.push([]);
            for(let j=0; j<COLS; j++){
                rows[i].push(reels[j][i]);
            }
        }
        return rows;
    };
  const printRows = (rows) =>{
    for(const row of rows){ //gives array
        let rowString = "";
            for(const[i,symbol] of row.entries() ){
                rowString += symbol +"|";
                if(i!= row.length-1){
                    rowString += " | ";
                }
            }
        console.log(rowString);
    }
    } ;


// TODO: give user winnings or take bet
const getWinnings = (rows, bet, lines) =>{
    let winnings=0;
    for(let row=0;row<lines;row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings+= bet*SYMBOLS_VALUE[symbols[0]];
        }
    }
    return winnings;
    };

// TODO:  play again
const game = ()=>{
    let balance = deposit(); 
    while(true){
        console.log("you have a balance of $"+balance);
        const numOfLines = getNumOfLines();
        const bet = getBet(balance,numOfLines);
        balance -= bet*numOfLines;
        const reels = spin();
        const rows = transpose(reels); 
        printRows(rows);
        const winnings = getWinnings(rows, bet, numOfLines);
        console.log("You won $"+winnings.toString());
        const play = prompt("Play again? (y/n): ");
        balance += winnings;
        if(balance<=0){
            console.log("Youre out of money. game over");
            break;
        }
        const playA = prompt("play again? (y/n)");
        if(playA!="y"){
            break;
        }
    }
}; 
game();