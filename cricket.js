
var cricMatches='https://origin-apinew.cricket.com.au/matches';


var cricUri = 'https://origin-apinew.cricket.com.au/matches/2738/49930/current';

var battingwheelUri = 'https://origin-apinew.cricket.com.au/battingwheel/2738/49930/1';

var cricMatch = [];
var cricInfo = '';


async function showCricMatch() {

    let matchResponse = await fetch(cricMatches);
    let matchData = await matchResponse.json();
    //console.log( matchData );

    let displayMatches = '';

    if(matchData.meta.inProgressMatchCount) {
        matchData.matchList.matches.forEach(element => {
            displayMatches += '<h2>'+element.series.name + '<br>';
            displayMatches += element.name + '<br>' + element.matchSummaryText.bold() + '</h2><br>';
            document.title = element.matchSummaryText;
        });

    }

    else    displayMatches = 'None of the matches are currently in progress';

    document.getElementById('matches').innerHTML = displayMatches;



    let cricResponse = await fetch(cricUri);
    let cricData = await cricResponse.json();

    //console.log( cricData );

    let display = '';

    display += cricData.meta.series.name.bold() + '<br>';
    display += cricData.meta.venueName + '<br>';
    display += cricData.matchDetail.teamBatting.name + ' ' 
                + "<h4 class='bg-danger'>" + cricData.matchDetail.teamBatting.score + '</h4>';

    let displayDetails = '';
    let batter1 = cricData.matchDetail.currentBatters[0].name 
                + ' ' + cricData.matchDetail.currentBatters[0].runs
                + ' (' + cricData.matchDetail.currentBatters[0].ballsFaced + ')';
    let batter2 = cricData.matchDetail.currentBatters[1].name 
                + ' ' + cricData.matchDetail.currentBatters[1].runs
                + ' (' + cricData.matchDetail.currentBatters[1].ballsFaced + ')';
    let bowler = cricData.matchDetail.bowler.name 
                + ' ' + cricData.matchDetail.bowler.bowlerOver 
                + ' ' + cricData.matchDetail.bowler.runsAgainst
                + ' ' + cricData.matchDetail.bowler.wickets
                + ' ' + cricData.matchDetail.bowler.economy;


    displayDetails += batter1 + '<br>'+ batter2 + '<br>'+ bowler;

    document.getElementById('info').innerHTML = display;

    document.getElementById('details').innerHTML = displayDetails;

}

showCricMatch();