
const deck_of_cards ={
    2 : 2,
    3 : 3,
    4 : 4,
    5 : 5,
    6 : 6,
    7 : 7,
    8 : 8,
    9 : 9,
    10 : 10,
    "Jack" : 10,
    "Queen" : 10,
    "King" : 10,
    "Ace" : 11,
};
const deck_names=[2,3,4,5,6,7,8,9,10,"Jack","Queen","King","Ace"];
let player_hand_values = [];
let player_hand_name = [];
let dealer_hand_values = [];
let dealer_hand_name = [];
const prompt = require('prompt-sync')();
let game = "Running"
let money = 100;
let wager = 0;
let index = 2;

function set_the_game(){
    player_hand_name = [];
    player_hand_values = [];
    dealer_hand_values = [];
    dealer_hand_name= [];
    player_hand_name.push(deck_names[Math.floor(Math.random() * deck_names.length)]);
    player_hand_name.push(deck_names[Math.floor(Math.random() * deck_names.length)]);
    player_hand_values.push(deck_of_cards[player_hand_name[0]]);
    player_hand_values.push(deck_of_cards[player_hand_name[1]]);
    console.log(`You have been dealt ${player_hand_name[0]} and ${player_hand_name[1]}`)
    dealer_hand_name.push(deck_names[Math.floor(Math.random() * deck_names.length)]);
    dealer_hand_values.push(deck_of_cards[dealer_hand_name[0]]);    
    console.log(`The dealer has a ${dealer_hand_name[0]}`);   
}
function get_bet(){
    console.log(`What would you like to bet\nYou have $${money}`);
    wager = prompt("","");
    return wager;
}
function get_action(){
    console.log('what action would you like to do\nstand\nhit\ndouble down\nsplit the pair');
    const input = prompt("", "");
    return input;
}

function decide_action(){
    while(game === "Running"){
        let stat = get_action();
        if (stat === "stand"){
            dealer_action();
            decide_game();
        };
        if (stat === "hit"){
            draw_card(player_hand_name, player_hand_values)
            console.log("You have been dealt");
            for ( item of player_hand_name){
                console.log(`a ${item},`);
            };
            check_for_bust(player_hand_values);
        };
        if (stat === "double down"){
            draw_card(player_hand_name,player_hand_values,);
            console.log("You have been dealt");
            for ( item of player_hand_name){
                console.log(`a ${item},`);
            };
            wager = wager * 2;
            check_for_bust(player_hand_values);
        };
    };  
    wallet(money, wager);  
}
function decide_game(){
    let player_hand = player_hand_values.reduce(function(x,y){return x + y});
    let dealer_hand = dealer_hand_values.reduce(function(x,y){return x + y});
    console.log("The game is decided");
    if(player_hand > dealer_hand){
        game = "Won";
        console.log("You have won");
    }
    else{
        game = "Lost"
        console.log("You have lost");
    };
 
}
function dealer_action(){
    draw_card(dealer_hand_name,dealer_hand_values);
    let dealer_total = dealer_hand_values.reduce(function(x,y){return x + y});
    console.log(`It looks like the second card for the dealer is a ${dealer_hand_name[1]}`)
    if(dealer_total <= 10){
        draw_card(dealer_hand_name,dealer_hand_values);
        dealer_total = dealer_hand_values.reduce(function(x,y){return x + y});
        console.log(`The third card for the dealer is ${dealer_hand_name[2]}`)
    };
   
}
function draw_card(person,person_values){
    var card = deck_names[Math.floor(Math.random() * deck_names.length)];
    person.push(card);
    let x = person.pop();
    person.push(x);
    person_values.push(deck_of_cards[x]);
}
function check_cards(list, item){
    let count = 0;
    for (ele in list){
        if(ele === item){
            count++;
        };
    };
    if (count >= 4){
        return true;
    }
}
function wallet(amount, bet){
    if (game == "Won"){
        money = parseInt(amount) + parseInt(bet);
        console.log(`You won $${bet}`);
    };
    if (game =="Lost"){
        money = amount - bet;
        console.log(`You lost $${bet}`);
    };
    console.log(`You now have $${money}`);
    return money;
}
function check_for_bust(hand){
    let total = hand.reduce(function(x,y){return x + y});
    if(total > 21){
        console.log(`Shoot, looks like you busted`);
        game = "Lost";
        return true        
    }

}
function continue_game(){
    console.log("Would you like to continue?\nYes or No");
    let answer = prompt("","");
    answer = answer.toLowerCase();
    if(answer === "no"){
        desire = "no";
    }
}

// game running code
let desire = "Continue";
console.log("You have made it to the World Championship BlackJack game.\nThe competition has narrowed down to just you and the dealer.\n Do you have what it takes to bring it all home?");
while (desire ==="Continue"){
    game = "Running";
    set_the_game();
    get_bet();
    decide_action();
    continue_game();
}
