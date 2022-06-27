'use strict';

let clicks = 0;
let level = 0;

let levelPrice = 15;
let ratePrice = 5;
let clickRate = 1;
let clickRateUpgrade = 7;
let experienceLevel = 0;
let levelUpgradeValue = 1; // by how much the level upgrades

let expClickPrice = 25; // cost of the click upgrade
let expClickUpgrade = 20000; // by how much the clicks increase when you buy the upgrade

let expLevelPrice = 50; // cost of the level upgrade
let expLevelUpgrade = 50; // by how much the level increases when you buy the upgrade

let expLuckPrice = 100; // cost of the random lcuk upgrade CHANGE AFTER TESTING TO 150XP

let tipUpgradeOne = document.getElementById('tipUpgradeValue');

let executed;
let performed;

let tipThree = (function() {
    executed = false;
    return function() {
        if (!executed) {
            executed = true;
            experienceLevel+= Math.round(experienceLevel*0.2);
            tipUpgradeThree.style.background = 'rgba(255, 255, 255, 0.685)';
            tipUpgradeThree.innerHTML = `After clicking the first 1000 clicks, you get 20% of the XP..`
            document.getElementById('experienceLevel').innerHTML = experienceLevel; 
        }
    };
})();


function onClick(){
    clicks += clickRate;
        
    //tip three
        if (clicks>=1000){
            tipThree();
        }
    
    document.getElementById('clicks').innerHTML = clicks;
}


function levelUpgrade(){
    if (clicks >= levelPrice){
        level+=levelUpgradeValue;
        document.getElementById('level').innerHTML = level;
        let remainder = clicks - levelPrice;
        levelPrice+= Math.round(0.25 * levelPrice);
        document.getElementById('levelPrice').innerHTML = levelPrice;
        clicks = remainder - clickRate;
        experienceLevel += 1;
        document.getElementById('experienceLevel').innerHTML= experienceLevel;

        // tip one
        if(experienceLevel <= 35){ 
            levelUpgradeValue =1;    
        } if (experienceLevel >= 35){ 
            performed = true;  
            tipUpgradeOne.style.background = 'rgba(255, 255, 255, 0.685)';
                tipUpgradeOne.innerHTML = `After exceeding 35 XP, level upgrade factor increases..`
                document.getElementById('levelUpgradeValue').innerHTML = levelUpgradeValue;
                levelUpgradeValue+=1;
        }
        onClick();
    }
    else alert(`You have insuficcient clicks to perform this upgrade! Click ${levelPrice - clicks} more time(s)!`);
}

let tipUpgradeTwo = document.getElementById('tipButtonsPressed');

function clickerRateUpgrade(){
    if (level >= ratePrice){
        level -= ratePrice;
        document.getElementById('level').innerHTML= level;
        clickRate +=clickRateUpgrade;
        document.getElementById('clickRate').innerHTML = clickRate;
        clickRateUpgrade +=7;
        document.getElementById('clickRateUpgrade').innerHTML = clickRateUpgrade;
            if(experienceLevel==0){
                experienceLevel+=1;
            } else experienceLevel += Math.round(0.5*experienceLevel);
        document.getElementById('experienceLevel').innerHTML = experienceLevel;

        // tip one
        if(experienceLevel <= 35){ 
            levelUpgradeValue =1;    
        } if (experienceLevel >= 35){ 
            tipUpgradeOne.style.background = 'rgba(255, 255, 255, 0.685)';
            tipUpgradeOne.innerHTML = `After exceeding 35 XP, level upgrade factor increases..`
            document.getElementById('levelUpgradeValue').innerHTML = levelUpgradeValue;
            levelUpgradeValue+=1;
        }    
        //tip two
        if (clickRateUpgrade == 35){ 
            experienceLevel+=10;
            tipUpgradeTwo.style.background = 'rgba(255, 255, 255, 0.685)';
            tipUpgradeTwo.innerHTML = `After upgrading the clicker rate the first 5 times, you get 10 experience points..`
            document.getElementById('experienceLevel').innerHTML = experienceLevel;
            }
        ratePrice+=  Math.round(0.25 * ratePrice);
        document.getElementById('ratePrice').innerHTML = ratePrice;
    }
    else alert(`You have insuficcient levels to perform this upgrade! Gain ${ratePrice - level} more level(s)!`)
}

function expClicks(){
    if (experienceLevel >= expClickPrice){
        experienceLevel -= expClickPrice; // the experience price is subtracted
        document.getElementById('experienceLevel').innerHTML = experienceLevel;
        clicks+= expClickUpgrade; // the clicks add
        document.getElementById('clicks').innerHTML = clicks;
        expClickPrice += (0.5 *expClickPrice); // the upgrade price increases
        document.getElementById('expClicksPrice').innerHTML = expClickPrice;
        expClickUpgrade += (expClickUpgrade * 0.5); // the upgrade number increases
        document.getElementById('expClicksUpgd').innerHTML = expClickUpgrade; 
        onClick();
    } else alert(`You have insuficcient XP to perform this upgrade! Gain ${expClickPrice - experienceLevel} more XP!`);
}

function expLevels(){
    if (experienceLevel >= expLevelPrice){
        experienceLevel -= expLevelPrice; // subtracks experience points
        document.getElementById('experienceLevel').innerHTML = experienceLevel;
        level+= expLevelUpgrade; // adds the levels
        document.getElementById('level').innerHTML = level;
        expLevelPrice += (0.5 *expLevelPrice); // increases the upgrade price
        document.getElementById('expLevelsPrice').innerHTML = expLevelPrice;
        expLevelUpgrade += (expLevelUpgrade * 0.5); // increases the number of the upgrade
        document.getElementById('expLevelsUpgd').innerHTML = expLevelUpgrade;
        onClick();
    } else alert(`You have insuficcient XP to perform this upgrade! Gain ${expLevelPrice - experienceLevel} more XP!`);
}


function getRandomPrize(arr){
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

//possible prizes for each group
let luckClicks = [100000, 10000, 500000, 6000, 1000000];
let luckLevels = [1000, 500, 700, 800, 900, 200, 100, 1500, 2000, 2500, 3000];
let luckClickRate = [1000, 500, 700, 800, 900, 600, 400, 300, 200, 100, 50];
let luckResetLevelPrice = [100, 150, 200, 80, 50, 70, 60, 200, 250, 300];

let luckOptions = [luckClicks, luckClickRate, luckLevels, luckResetLevelPrice];

let luckRandomizer = document.getElementById('luckRandomizer'); // the text displayed after you buy a luck upgrade

let tipUpgradeThree = document.getElementById('tipLucky');


function expLuck(){
    let prizeGroup = getRandomPrize(luckOptions); //selects a random type of upgrade
    let prizeItem = getRandomPrize(prizeGroup); // selects a random level of upgrade for a random type of upgrade

    if (experienceLevel >= expLuckPrice){
        experienceLevel -=expLuckPrice;
        document.getElementById('experienceLevel').innerHTML = experienceLevel;

        if (prizeGroup == luckClicks){
            clicks+=prizeItem;
            document.getElementById('clicks').innerHTML = clicks;
            luckRandomizer = `You won ${prizeItem} clicks!`
            onClick();
        } 
        else if (prizeGroup == luckLevels){
            level+=prizeItem;
            document.getElementById('level').innerHTML = level;
            luckRandomizer = `You won ${prizeItem} levels!`;
            onClick();
        } else if(prizeGroup == luckClickRate){
            clickRate+=prizeItem;
            document.getElementById('clickRate').innerHTML = clickRate;
            luckRandomizer = `You won ${prizeItem} click rates!`;
            onClick();
        } else if(prizeGroup == luckResetLevelPrice){
            levelPrice = prizeItem;
            document.getElementById('levelPrice').innerHTML = levelPrice;
            luckRandomizer = `Your level price just reset to ${prizeItem}!`;
            onClick();
        }
        document.getElementById('luckRandomizer').innerHTML = luckRandomizer;
        expLuckPrice+= Math.round(expLuckPrice * 0.5);
        document.getElementById('expLuckPrice').innerHTML = expLuckPrice; 


    } else alert(`You have insufficient XP to perform this upgrade! Gain ${expLuckPrice - experienceLevel} more XP!`);
}

const hiddenButton = document.getElementById('hiddenButton');
let unlockedText = document.getElementById('unlockMe');

function unlocker(){
    if ((performed=true) &&  (clickRateUpgrade >=35) && (executed = true)) {
        unlockedText.style.color = 'white';
        unlockedText.innerHTML = `There is a hidden button somewhere on the screen. Press it and see what happens..`;
    }
    else alert('You have to unlock all of the tips & tricks first!');
}

console

hiddenButton.addEventListener('click', () => {
    hiddenButton.style.opacity = '1';
    unlockedText.innerHTML = `You've discovered the hidden button..`;
    unlockedText.style.color = 'rgb(255, 255, 255)';
        hiddenButton.addEventListener('click', () =>{
            hiddenButton.innerHTML = `Click me again, it's a clicker game after all.. `
                hiddenButton.addEventListener('click', ()=>{
                    experienceLevel +=100;
                    unlockedText.innerHTML = `You've received a 100XP, spend it away!`
                    document.getElementById('experienceLevel').innerHTML = experienceLevel;
                    hiddenButton.style.display = 'none';
                });
        });
});
