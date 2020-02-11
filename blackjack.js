
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
    "Ace" : [1,11]
};
const deck_names=[2,3,4,5,6,7,8,9,10,"Jack","Queen","King","Ace"];
const player_hand_values = [];
const player_hand_name = [];
const dealer_hand_values = [];
const dealer_hand_name = [];
const prompt =require('prompt-sync')();
let game = "Running"
let money = 100;
let wager = 0

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
funciton get_bet(wage){
    wager = ("what would you like to bet","");
}
function get_action(){
    const input = prompt('what action would you like to do\nstand\nhit\ndoubledown\nsplit the pair\n', "");
    return input;
}

function decide_action(){
    let index = 2;
    while(game === "Running"){
        let stat = get_action();
        if (stat === "stand"){
            // do nothing let the dealer go
            check_for_bust();
        };
        if (stat === "hit"){
            draw_card(player_hand_name, player_hand_values, index)
            index ++
            check_for_bust();
        };
        if (stat === "double down"){
            // double the bet value and add another card and stop player from building anymore
            check_for_bust();
        };

    };
    
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
    for (ele in array){
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
         money = amount + bet;
    };
    if (game ==="Lost"){
        money = amount - bet;
    }
    return money;
}

function check_for_bust(hand){
    let total = hand.reduce(function(x,y){return x + y});
    if(total > 21){
        console.log(`Shoot, looks like you busted`);
        game = "Lost";
        wallet();
        // Run dealer cards
    }

}
