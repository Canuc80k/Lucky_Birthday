const blue1 = "<div id=\"blue1\"><img class=\"roll-img\" src=\"img/blue1.jpg\"/></div>";
const blue2 = "<div id=\"blue2\"><img class=\"roll-img\" src=\"img/blue2.jpg\"/></div>";
const blue3 = "<div id=\"blue3\"><img class=\"roll-img\" src=\"img/blue3.jpg\"/></div>";
const blue4 = "<div id=\"blue4\"><img class=\"roll-img\" src=\"img/blue4.jpg\"/></div>";
const blue5 = "<div id=\"blue5\"><img class=\"roll-img\" src=\"img/blue5.jpg\"/></div>";
const purple1 = "<div id=\"purple1\"><img class=\"roll-img\" src=\"img/purple1.jpg\"/></div>";
const purple2 = "<div id=\"purple2\"><img class=\"roll-img\" src=\"img/purple2.jpg\"/></div>";
const purple3 = "<div id=\"purple3\"><img class=\"roll-img\" src=\"img/purple3.jpg\"/></div>";
const pink1 = "<div id=\"pink1\"><img class=\"roll-img\" src=\"img/pink1.jpg\"/></div>";
const red1 = "<div id=\"red1\"><img class=\"roll-img\" src=\"img/red1.jpg\"/></div>";
const yellow1 = "<div id=\"yellow1\"><img class=\"roll-img\" src=\"img/yellow1.jpg\"/></div>";

const Rblue1 = "<div id=\"blue\"><img class=\"result-img\" src=\"img/blue1.jpg\"/></div>";
const Rblue2 = "<div id=\"blue\"><img class=\"result-img\" src=\"img/blue2.jpg\"/></div>";
const Rblue3 = "<div id=\"blue\"><img class=\"result-img\" src=\"img/blue3.jpg\"/></div>";
const Rblue4 = "<div id=\"blue\"><img class=\"result-img\" src=\"img/blue4.jpg\"/></div>";
const Rblue5 = "<div id=\"blue\"><img class=\"result-img\" src=\"img/blue5.jpg\"/></div>";
const Rpurple1 = "<div id=\"purple\"><img class=\"result-img\" src=\"img/purple1.jpg\"/></div>";
const Rpurple2 = "<div id=\"purple\"><img class=\"result-img\" src=\"img/purple2.jpg\"/></div>";
const Rpurple3 = "<div id=\"purple\"><img class=\"result-img\" src=\"img/purple3.jpg\"/></div>";
const Rpink1 = "<div id=\"pink\"><img class=\"result-img\" src=\"img/pink1.jpg\"/></div>";
const Rred1 = "<div id=\"red\"><img class=\"result-img\" src=\"img/red1.jpg\"/></div>";
const Ryellow1 = "<div id=\"yellow\"><img class=\"result-img\" src=\"img/yellow1.jpg\"/></div>";


const rand = (l, r) => { 
    return Math.floor(Math.random() * (r - l + 1) + l);
}

const realRandom = (old2, old3) => {
    while (true) {
        let gift = rand(1, 10000);
        if (gift <= 8000) gift = 8;
        else if (gift <= 8007) gift = 9;
        else if (gift <= 8008) gift = 10;
        else gift = rand(5, 7);

        if (gift != old2 && gift != old3) return gift;
    }
}

const add = (i) => {
    if (i == 0) $("#cardList").append(blue1);
    if (i == 1) $("#cardList").append(blue2);
    if (i == 2) $("#cardList").append(blue3);
    if (i == 3) $("#cardList").append(blue4);
    if (i == 4) $("#cardList").append(blue5);
    if (i == 5) $("#cardList").append(purple1);
    if (i == 6) $("#cardList").append(purple2);
    if (i == 7) $("#cardList").append(purple3);
    if (i == 8) $("#cardList").append(pink1);
    if (i == 9) $("#cardList").append(red1);
    if (i == 10) $("#cardList").append(yellow1);
}

$('#roll').click(async () => {
    localStorage.setItem("roll", "true");
    let old2, old3, temp, gift;
    $("#cardList").empty();

    let firstItem = rand(0, 8);
    let secondItem = old2 = rand(firstItem + 1, 9);
    let thirdItem = old3 = rand(secondItem + 1, 10);

    add(firstItem);
    add(secondItem);
    add(thirdItem);

    let velocity = 1000, time = 750, oneTime = false;
    while (true) {
        if (velocity <= 0) break;
        await new Promise(resolve => setTimeout(resolve, time / velocity));
        if (velocity >= 50) velocity -= 5;
        else if (velocity >= 20) velocity -= 2;
        else velocity -= 0.5;
        $("#cardList").empty();
        $("#roll").hide();

        if (velocity < 1 && !oneTime) {
            let realGift = realRandom(old2, old3);
            gift = realGift;

            add(old2);
            add(old3);
            add(realGift);
            old2 = old3;
            old3 = realGift;
            oneTime = true;
            continue;
        }

        while (true) {
            temp = rand(0, 10);
            if (temp != old2 && temp != old3) break;
        }
        add(old2);
        add(old3);
        add(temp);
        old2 = old3;
        old3 = temp;
    }
    
    if (gift == 0) $("#finalresult").append(Rblue1);
    if (gift == 1) $("#finalresult").append(Rblue2);
    if (gift == 2) $("#finalresult").append(Rblue3);
    if (gift == 3) $("#finalresult").append(Rblue4);
    if (gift == 4) $("#finalresult").append(Rblue5);
    if (gift == 5) $("#finalresult").append(Rpurple1);
    if (gift == 6) $("#finalresult").append(Rpurple2);
    if (gift == 7) $("#finalresult").append(Rpurple3);
    if (gift == 8) $("#finalresult").append(Rpink1);
    if (gift == 9) $("#finalresult").append(Rred1);
    if (gift == 10) $("#finalresult").append(Ryellow1);
    $("#finalresult").show();
});

$(document).ready(() => {
    if (localStorage.getItem("roll") == "true") $("#roll").hide();
    $("#finalresult").hide();
});