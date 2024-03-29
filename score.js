// let scoreUrl = 'https://bloblife-api.herokuapp.com/scores'
// let leaderboardUrl = 'https://bloblife-api.herokuapp.com/leaderboards'

let scoreUrl = 'http://localhost:3000/scores'
let leaderboardUrl = 'http://localhost:3000/leaderboards'

// const body = document.querySelector('body')
let counterDiv= document.createElement('div')
let counter = document.createElement('p')
counter.textContent = `Time: 0`
counterDiv.appendChild(counter)
if(Users !== null) {
Users = getUsers();
}


let sidebar = document.createElement('div')
sidebar.setAttribute('class', 'sidebar')
// body.append(sidebar)

let currentDate = new Date();
let date = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`


// let leaderboards = []
// let scores = []

let leaderboards = getLeaderBoards();
let scores = getScores();

// function getLeaderBoards(){
//     fetch(leaderboardUrl)
//     .then(res => res.json())
//     .then(Leaderboards => {
//         Leaderboards.forEach(leaderboard => leaderboards.push(leaderboard))
//         // addLeaderBoard(leaderboards)
//         getScores(leaderboards)
//     })
// }

// function getScores(leaderboards){
//     fetch(scoreUrl)
//     .then(res => res.json())
//     .then(Scores => {
//         Scores.forEach(score => scores.push(score))
//         addLeaderBoard(leaderboards, scores)
//     })
// }

function getLeaderBoards(){
    let Leaderboards = JSON.parse(localStorage.getItem('leaderboards')) || [];
    return Leaderboards;
}

function getScores(){
    let Scores = JSON.parse(localStorage.getItem('scores')) || [];
    return Scores;
}

//comapare function for sorting scores
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const scoreA = parseInt(a.time)
    const scoreB = parseInt(b.time)
  
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = 1;
    } else if (scoreA < scoreB) {
      comparison = -1;
    }
    return comparison;
  }
  
//   singers.sort(compare);



// function addLeaderBoard(leaderboards, scores){
//     let todaysBoard = leaderboards.find(leaderboard => leaderboard.date === date);
//     let todaysScores = scores.filter(score => score.date === date);

//     // todaysScores.sort(compare)
//     if ((!!todaysBoard)) {
//         let boardDiv = document.createElement('div')
//         boardDiv.setAttribute('class', 'leaderboard')
//         // console.log(leaderboards)

//         let ul = document.createElement('ul')
//         ul.textContent = `${todaysBoard.date}'s Top 10 Scores:`
//         ul.id = `${todaysBoard.id}l` // l for leaderboard



//         boardDiv.append(ul)
//         sidebar.append(boardDiv)

//         postScores(todaysScores, todaysBoard)

//     } else {
//         // fetch((leaderboardUrl), {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         'Accept': 'application/json'
//         //     },
//         //     body: JSON.stringify({
//         //         'date': date
//         //     })

//         // })
//         // .then(res => res.json())
//         // .then(todaysBoard => {
//         //     let boardDiv = document.createElement('div')
//         //     boardDiv.setAttribute('class', 'leaderboard')

//         //     let ul = document.createElement('ul')
//         //     ul.textContent = `${todaysBoard.date}'s Top 10 Scores:`
//         //     ul.id = `${todaysBoard.id}l` // l for leaderboard
//         //     leaderboards.push(todaysBoard)
//         //     boardDiv.append(ul)
//         //     sidebar.append(boardDiv)
//         // })
//         let newBoard = {
//             'date': date
//         };
//         leaderboards.push(newBoard);
//         localStorage.setItem('leaderboards', JSON.stringify(leaderboards));
//     }
// }

function addLeaderBoard() {
        // let boardDiv = document.createElement('div')
        // boardDiv.setAttribute('class', 'leaderboard')
        // boardDiv.setAttribute('id', 'mainLeaderboard')

        // // console.log(leaderboards)

        // let ul = document.createElement('ul')
        // ul.textContent = `Top Scores:`;
        // ul.id = `mainLeaderboard`; 



        // boardDiv.append(ul)
        // sidebar.append(boardDiv)

    // let ul;
    let todaysScores = getScores();

    if (!document.getElementById("mainLeaderboard")) {
        let boardDiv = document.createElement('div');
        boardDiv.setAttribute('class', 'leaderboard');

        ul = document.createElement('ul');
        ul.textContent = `Top Scores:`;
        ul.id = `mainLeaderboard`; 

        boardDiv.append(ul);
        sidebar.append(boardDiv);
        postScores(todaysScores);

    } else {
        ul = document.getElementById("mainLeaderboard");
        postScores(todaysScores);

    }

}

let paused = false;
let timer;

function startTime() {
    clearInterval(timer);
    let timeCount = 0
    if (document.getElementsByClassName('sidebar').length === 0){
        sidebar.append(counterDiv)
        body.append(sidebar)
    } else {
        counter.textContent = `Time: 0`
    }
    timer = setInterval(function(){
        if(!paused) {
            timeCount += 1
            counterDiv.innerHTML = ''
            counter.setAttribute('class', 'counter')
            counter.textContent = `Time: ${timeCount}`
            counter.id = timeCount
            counterDiv.appendChild(counter)
        }
    }, 1000)
}

function createScore(time, userid) {
    let blobinfo = document.getElementById('blob').textContent;
    let blobtype;
    if (blobinfo === 'Blob type: Gold'){
        blobtype = 'gold'
    } else if (blobinfo === 'Blob type: Fire') {
        blobtype = 'fire'
    } else if (blobinfo === 'Blob type: Water') {
        blobtype = 'water'
    } else if (blobinfo === 'Blob type: Earth') {
        blobtype = 'earth'
    }else if (blobinfo === 'Blob type: Grey') {
        blobtype = 'grey'
    }

    let newScore = {
        'time': time,
        'user_id': userid,
        'date': date, // The date the score was achieved
        'blobtype': blobtype
    };
    scores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(scores));
    postScores([newScore]);

    // fetch((scoreUrl), {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         'time': time,
    //         'user_id': userid,
    //         'leaderboard_id': todaysBoard.id,
    //         'date': date,
    //         'blobtype': blobtype
    //     })
    // })
    // .then(res => res.json())
    // .then( score => {
    //     // create posting score logic here? or perhaps send to a function
    //     // find or create leaderboard based on todays date
    //     // add this score to the board
    //     // let user = Users.find(user => user.id === score.user_id)
    //     // let li = document.createElement('li')
    //     // li.textContent = `${parseInt(score.time)} seconds by ${user.name}`

    //     // ul.append(li)
    //     scores.push(score)
    //     todaysScores.push(score)
    //     postScores(todaysScores, todaysBoard)

    // })

}

// let date = new Date().getTime()

// todaysScores.forEach(score => {
//     let li = document.createElement('li')

//     li.textContent = `${i}. ${parseInt(score.time)} seconds by ${user.name}`
//     i += 1
//     ul.append(li)
// })

function postScores(todaysScores) {
    if (!document.getElementById("mainLeaderboard")) {
        let boardDiv = document.createElement('div');
        boardDiv.setAttribute('class', 'leaderboard');

        ul = document.createElement('ul');
        ul.textContent = `Top Scores:`;
        ul.id = `mainLeaderboard`; 

        boardDiv.append(ul);
        sidebar.append(boardDiv);
        // postScores(todaysScores);

    } else {
        ul = document.getElementById("mainLeaderboard");
        // postScores(todaysScores);

    }



    // let ul = document.getElementById("mainLeaderboard");
    ul.innerHTML = '';
    // ul.textContent = `Top 10 Scores:`;
    todaysScores.sort(compare);
    let i = 1;
    todaysScores.forEach(score => {
        const blobImg = document.createElement('img');
        if (score.blobtype === 'gold'){
            blobImg.src = 'images/goldBlob.jpg'
        } else if (score.blobtype === 'fire') {
            blobImg.src = 'images/fireBlob.jpg'
        } else if (score.blobtype === 'water') {
            blobImg.src = 'images/waterBlob.jpg'
        } else if (score.blobtype === 'earth') {
            blobImg.src = 'images/earthBlob.jpg'
        }else if (score.blobtype === 'grey') {
            blobImg.src = 'images/greyBlob.jpg'
        }
        blobImg.height = 15;
        blobImg.width = 15;
        blobImg.style = 'display:inline';
        let user = Users.find(user => user.id == score.user_id)
        console.log('USER', user)
        if (i < 11 && user) {
            let li = document.createElement('li');
            li.textContent = `#${i} ${score.time} seconds by ${user.name} on ${score.date}`; // Adding the date to the score display
            i += 1;
            li.append(blobImg);
            ul.append(li);
        }
    })
    
}