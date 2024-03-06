const DailyReward = new Map();
const dailyWrapper = $('.daily-wrapper');
const bountyReward = $('.bounty');
const countdownTime = $('#root #indicator #timer #countdown');

Events.Subscribe('ToggleRewardUI', (state, amount, offsetTime) => {
    if (state == undefined) return;
    if (offsetTime == undefined) return;
    if (amount == undefined) amount = 0;

    dailyWrapper.fadeIn();

    let deadline = new Date(Date.parse(new Date()) + offsetTime * 60 * 60 * 1000);

    if (state == true)
    {
        setRewardUnlocked(false);
        bountyReward.text(amount);
        startCountDown(deadline)
    }


    // DailyHours = time
    // deadline = new Date(countDownDate + DailyHours*60*60*1000)
    // if (amount == null) {
    //     amount = "0";
    // } 
    
    // if (state == true) {
    //     startCountDown();
    //     document.getElementsByClassName("bounty")[0].innerHTML = amount;
    //     setRewardUnlocked(false);
    // }
});

Events.Subscribe('ResetUI', () => {
    countdown = DailyReward.get('countdownInterval');
    clearInterval(countdown);
});




// Update the count down every 1 second


function startCountDown(deadline) { 
    var x = setInterval(deadline => {
        
        // Get today's date and time
        var now = new Date().getTime();
        
        // Find the distance between now and the count down date
        var distance = deadline - now;
        
        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);    
        
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            Events.Call("GiveReward");
            setRewardUnlocked(true);
            hours = 24; 
            minutes = 0;    
            seconds =  0;   
        }

        updateRewardCountdown(hours, minutes, seconds);
    }, 1000, deadline);

    DailyReward.set('countdownInterval', x);
}


const setRewardUnlocked = (unlocked = false) => {
    DailyReward.set('unlocked', unlocked);
    document.querySelector("#root").dataset.unlocked = unlocked ? "y" : "n";
    document.querySelector("#root #indicator > .title").innerText = unlocked
      ? "UNLOCKED"
      : "DAILY REWARD";
};

const updateRewardCountdown = (hours = 0, minutes = 0, seconds = 0) => (countdownTime.text(`${hours}h ${minutes}m ${seconds}s`));

/*const example = (c = 0) => {
if (c === 100) {
setRewardUnlocked(true);
updateRewardCountdown(0, 0);
return;
}

const h = Math.floor((100 - c) / 60);
const m = (100 - c) % 60;

updateRewardCountdown(h, m);

setTimeout(() => example(c + 1), 40);
};

example();*/