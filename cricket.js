
var cricMatches='https://origin-apinew.cricket.com.au/matches';


var cricUri = 'https://origin-apinew.cricket.com.au/matches/2738/49930/current';
var cricUri1 = 'https://origin-apinew.cricket.com.au/matches/';


var battingwheelUri = 'https://origin-apinew.cricket.com.au/battingwheel/2738/49930/1';

var cricMatch = [];
var cricInfo = '';





async function showCricMatch() {

    let matchResponse = await fetch(cricMatches);
    let matchData = await matchResponse.json();
    console.log( matchData );
    let mytitle = '';

    let showContents = document.getElementById('matches');   // Content holder 


    if(matchData.meta.inProgressMatchCount) {
        matchData.matchList.matches.forEach(element => {

            let displayMatches = '';

            displayMatches += ''+element.homeTeam.shortName + ' vs ' + element.awayTeam.shortName + '<br>';
            displayMatches += element.name + '<br>' + element.matchSummaryText.small() + '<br>';

            let matchUri = cricUri1 +element.series.id +'/'+ element.id+'/current/';


            let col = document.createElement("div");    
            col.setAttribute("class", "col-12 text-center text-dark p-2 font-weight-bolder");   

            let myContent = document.createElement("p");
            myContent.innerHTML = displayMatches;

            col.append(myContent);
            showContents.append(col);


            //document.getElementById('info').innerHTML = displayMatches;

            showMatchDetails(matchUri);

            mytitle += element.matchSummaryText;

        });

        document.title = mytitle;


    }

    else    displayMatches = 'None of the matches are currently in progress';
    

}


async function showMatchDetails(matchUri){

    let matchResponse = await fetch(matchUri);
    let matchData = await matchResponse.json();

    console.log(matchUri);
     
    let display = '';
    let displayDetails = '';
    let matchInfo ='';


    display += matchData.matchDetail.teamBatting.name + ' ' 
                + "<h6 class='bg-danger'>" + matchData.matchDetail.teamBatting.score + '</h6>';
                
    let batter1 = matchData.matchDetail.currentBatters[0].name 
                + ' ' + matchData.matchDetail.currentBatters[0].runs
                + ' (' + matchData.matchDetail.currentBatters[0].ballsFaced + ')';
    let batter2 = matchData.matchDetail.currentBatters[1].name 
                + ' ' + matchData.matchDetail.currentBatters[1].runs
                + ' (' + matchData.matchDetail.currentBatters[1].ballsFaced + ')';
    let bowler = matchData.matchDetail.bowler.name 
                + ' ' + matchData.matchDetail.bowler.bowlerOver 
                + ' ' + matchData.matchDetail.bowler.runsAgainst
                + ' ' + matchData.matchDetail.bowler.wickets
                + ' ' + matchData.matchDetail.bowler.economy;
    displayDetails += batter1 + '<br>'+ batter2 + '<br>'+ bowler.small()+ '<br>';

    matchInfo += display + displayDetails;

    let showContents = document.getElementById('info');   // Content holder 

    let col = document.createElement("div");    
    col.setAttribute("class", "col-12 text-center bg-info p-1");   

    let myContent = document.createElement("p");
    myContent.innerHTML = matchInfo;

    col.append(myContent);
    
    showContents.append(col); 



    //document.getElementById('details').innerHTML = display + displayDetails;

    //document.getElementById('matches').appendChild(document.createTextNode(displayDetails)); 
}





showCricMatch();