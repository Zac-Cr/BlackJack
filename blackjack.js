
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
const player_hand_values = [];
const player_hand_name = [];
const dealer_hand_values = [];
const dealer_hand_name = [];
const prompt =require('prompt-sync')();
let game = "Running"
let money = 100;
let wager = 0;
let index = 2;

function set_the_game(){
    console.log("You have made it to the World Championship BlackJack game.\nThe competition has narrowed down to just you and the dealer.\n Do you have what it takes to bring it all home?")
    player_hand_name.push(deck_names[Math.floor(Math.random() * deck_names.length)]);
    player_hand_name.push(deck_names[Math.floor(Math.random() * deck_names.length)]);
    player_hand_values.push(deck_of_cards[player_hand_name[0]]);
    player_hand_values.push(deck_of_cards[player_hand_name[1]]);
    console.log(`You have been dealt  ${player_hand_name[0]} and ${player_hand_name[1]}`)
    dealer_hand_name.push(deck_names[Math.floor(Math.random() * deck_names.length)]);
    dealer_hand_values.push(deck_of_cards[dealer_hand_name[0]]);    
    console.log(`The dealer has a ${dealer_hand_name[0]}`);   
}
function get_bet(){
    wager = prompt(`what would you like to bet\nYou have $${money}\n`,"");
    return wager;
}
function get_action(){
    const input = prompt('what action would you like to do\nstand\nhit\ndoubledown\nsplit the pair\n', " ");
    return input;
}

function decide_action(){
    let stat = get_action();
    while(game === "Running"){
        
        if (stat === "stand"){
            dealer_action();
            decide_game();
        };
        if (stat === "hit"){
            draw_card(player_hand_name, player_hand_values, index)
            console.log(`you have been dealt a ${player_hand_name[index]}`);
            console.log(`you now have a ${player_hand_name[0]} a ${player_hand_name[1]} and a ${player_hand_name[2]}`);
            check_for_bust(player_hand_values);
            index ++
        };
        if (stat === "double down"){
            draw_card(player_hand_name,player_hand_values,index);
            wager = wager * 2;
            check_for_bust(player_hand_values);
            dealer_action();
            decide_game();
        };
    };    
}
function decide_game(){
    let player_hand = player_hand_values.reduce(function(x,y){return x + y});
    let dealer_hand = dealer_hand_values.reduce(function(x,y){return x + y});
    if(player_hand > dealer_hand){
        game = "Won";
    }
    else{
        game = "Loss"
    };
}
function dealer_action(){
    draw_card(dealer_hand_name,dealer_hand_values, index);
    let dealer_total = dealer_hand_values.reduce(function(x,y){return x + y});
    if(dealer_total < 10){
        draw_card(player_hand_name,dealer_hand_values, index);
        dealer_total = dealer_hand_values.reduce(function(x,y){return x + y});
        console.log(`The third card for the dealer is ${dealer_hand_name[2]}`)
    };
    console.log(`It looks like the second card for the dealer is a ${dealer_hand_name[1]}`)
}
function draw_card(person,person_values, index ){
    let card = deck_names[Math.floor(Math.random() * deck_names.length)];
    person.push(card);
    person_values.push(deck_of_cards[person[index]]);
    if(check_cards(person,card)){
        draw_card(person,person_values,index);
    };
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
    if (game === "Won"){
        money = parseInt(amount) + parseInt(bet);
        console.log(`You won $${bet}`);
    };
    if (game ==="Lost"){
        money = amount - bet;
        console.log(`You lost $${bet}`);
    }
    console.log(`You now have $${money}`)
    return money;
}
function check_for_bust(hand){
    let total = hand.reduce(function(x,y){return x + y});
    if(total > 21){
        console.log(`Shoot, looks like you busted`);
        game = "Lost";
        return true
        // Run dealer cards
    }

}
set_the_game();
get_bet();
decide_action();