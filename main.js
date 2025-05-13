let startBtn = document.querySelector(`.start`)
let hitBtn = document.querySelector(`.hit`)
let stopBtn = document.querySelector(`.stop`)
let buttons = document.querySelectorAll(`.btns button`)
let nums = document.querySelector(`.player .nums span`)
let sum = document.querySelector(`.player .sum span`)
let messege = document.querySelector(`.messege`)
let mainResultContainer = document.querySelector(`.player .main`)
let resultContainer = document.querySelector(`.player .edit`)
let playerNums = [];
let playerSum = 0;
let botNums = [];
let botSum = 0;
let messeges = ['winner winner', 'loser loser', 'equals']

startBtn.addEventListener('click', () => {
    mainResultContainer.style.display = 'block'
    resultContainer.innerHTML = ''
    //activate buttons
    buttons.forEach(b=>{
        b.classList.add('active')
    })
    getCards()
    startBtn.classList.remove(`active`)
})

hitBtn.addEventListener('click', () => {
    if (playerSum == 21 || botSum == 21 || playerSum > 21 || botSum > 21) {
        stopBtn.click() 
        return
    } 
    pickCard()
})

stopBtn.addEventListener('click', () => {
    messege.textContent = messeges[checkRank()]
    buttons.forEach(b=>{
        b.classList.remove('active')
    })
    startBtn.classList.add(`active`)
    createResult(playerNums,playerSum,botNums,botSum)
    clearVars()
})

function getCards() {
    // for player
    playerNums.push(genrateRand(14), genrateRand(14));
    nums.innerHTML = `${playerNums[0]} - ${playerNums[1]}`;
    playerSum = playerNums.reduce((a, b) => a + b, 0);
    sum.innerHTML = playerSum;

    // for bot
    botNums.push(genrateRand(14), genrateRand(14));
    botSum = botNums.reduce((a, b) => a + b, 0); // ✅ correct bot sum
}

function pickCard() {
    // for player
    let newVal = genrateRand(14);
    playerNums.push(newVal);
    nums.textContent += ` - ${newVal}`;
    
    playerSum = playerNums.reduce((a, b) => a + b, 0);
    sum.textContent = playerSum;

    // for bot
    let newVal2 = genrateRand(14);
    botNums.push(newVal2);
    botSum = botNums.reduce((a, b) => a + b, 0); // ✅ recompute correctly
}

function genrateRand(e) {
    let rand1 = Math.floor(Math.random() * e);
    if (rand1 > 0) return rand1
    if (rand1 == 0) return rand1+1
}


function checkRank() {
    if (playerSum > 21) {
        return 1
    }
    else if (botSum > 21) {
        return 0
    }
    else {
        if (playerSum > botSum) {
            return 0
            // messege.textContent = 'winner winner'
        }
        else if (playerSum < botSum) {
            return 1
            // messege.textContent = 'loser loser'
        }
        else {
            return 2
            //  messege.textContent = 'equals'
        }
    }
}

function clearVars() {
    nums.innerHTML = ''
    sum.innerHTML = ''
    playerNums = []
    playerSum = 0
    botNums = []
    botSum = 0
}

// function createNormal() {
//     resultContainer.innerHTML = `<p class="nums">Cards: <span></span></p> <p class="sum">Sum: <span></span></p>`
//     resultContainer.style.cssText = 'display: block;'
// }

function createResult(y1, y2, b1, b2) {
    mainResultContainer.style.display = 'none'
    resultContainer.innerHTML = ''
    let you = document.createElement('div')
    let bot = document.createElement('div')
    let you_h4 = document.createElement('h4')
    let you_nums = document.createElement('p')
    let you_sum = document.createElement('p')
    let bot_h4 = document.createElement('h4')
    let bot_nums = document.createElement('p')
    let bot_sum = document.createElement('p')
    you.appendChild(you_h4)
    you.appendChild(you_nums)
    you.appendChild(you_sum)
    bot.appendChild(bot_h4)
    bot.appendChild(bot_nums)
    bot.appendChild(bot_sum)
    resultContainer.appendChild(you)
    resultContainer.appendChild(bot)
    bot_h4.textContent = "Bot"
    you_h4.textContent = "You"
    you_nums.innerHTML = `Cards: ${y1}`
    you_sum.innerHTML = `Sum: ${y2}`
    bot_nums.innerHTML = `Cards: ${b1}`
    bot_sum.innerHTML = `Sum: ${b2}`
    resultContainer.style.cssText = 'display: flex; justify-content: space-between'
}