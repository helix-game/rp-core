const speed = $('.speedometer h1')

let speedStrokeDasharrayMinMax = [0, 51.5]
let fuelStrokeDasharrayMinMax = [0, 20.8]
let brokeAlert = false
let engineState = false


function setEngineState(state) {
    $('.speedometer .engine-icon').toggleClass('on', state);
    engineState = state;
}

function setSpeed(mph) {
    // Needle rotation
    let rotate = (mph / 120) * (145 - (-42)) - 42;
    $('.speedometer .needle').css('transform', 'translate(-100%, -50%) rotate(' + rotate + 'deg)');

    // Speed percentage
    // let speedStrokeDasharray = (rpm / 7000) * 52.2;
    let speedStrokeDasharray = (mph / 120) * (speedStrokeDasharrayMinMax[1] - speedStrokeDasharrayMinMax[0]) + speedStrokeDasharrayMinMax[0];
    $('.speedometer .speed-percentage .circle').css('stroke-dasharray', speedStrokeDasharray + ',100');

    // Speed text
    let kmh = mph
    let currentSpeed = parseInt($('.speedometer h1').text());
    let incrementing = kmh > currentSpeed ? true : false;

    let speedInterval = setInterval(function () {
        incrementing ? currentSpeed++ : currentSpeed--;
        speed.text(currentSpeed);
        if (currentSpeed < 100) {
            speed.prepend('<span>0</span>');
        }

        if (currentSpeed < 10) {
            speed.prepend('<span>0</span>')
        }

        if (currentSpeed < 1) {
            speed.html('<span>0</span><span>0</span><span>0</span>')
        }

        if (incrementing && currentSpeed >= kmh || !incrementing && currentSpeed <= kmh) {
            clearInterval(speedInterval);

        }
    }, 950 / (incrementing ? kmh - currentSpeed : currentSpeed - kmh));
}

function setFuel(fuel) {
    let fuelStrokeDasharray = (fuel / 100) * (fuelStrokeDasharrayMinMax[1] - fuelStrokeDasharrayMinMax[0]) + fuelStrokeDasharrayMinMax[0];
    $('.speed-percentage .fuel').css('stroke-dasharray', fuelStrokeDasharray + ',100');

    if (fuel <= 10) {
        $('.speedometer .fuel-icon').addClass('low-fuel');
        $('.speedometer .fuel-icon').removeClass('medium-fuel');
    } else if (fuel <= 20) {
        $('.speedometer .fuel-icon').addClass('medium-fuel');
        $('.speedometer .fuel-icon').removeClass('low-fuel');
    } else {
        $('.speedometer .fuel-icon').removeClass('low-fuel medium-fuel');
    }
}

function setHandshakeAlert(state) {
    $('.speedometer .handshake-alert').toggleClass('on', state);
}

function setCarHealth(health) {
    $('.speedometer .engine-state p').text(Math.round(health) + '%');

    // let currentHealth = parseInt($('.speedometer .engine-state p').text());
    // let incrementing = health > currentHealth ? true : false;

    // let healthInterval = setInterval(function () {
    //     incrementing ? currentHealth++ : currentHealth--;
    //     $('.speedometer .engine-state p').text(currentHealth + '%');
    //     if (incrementing && currentHealth >= health || !incrementing && currentHealth <= health) {
    //         clearInterval(healthInterval);
    //     }
    // }, 950 / (incrementing ? health - currentHealth : currentHealth - health));

    // health < 30 ? setBrokeAlert(true) : setBrokeAlert(false);
}


Events.Subscribe("Speedometer", function (mph) {
    setSpeed(mph);
});

Events.Subscribe("helix-vehiclehud:UpdateCar", function (fuel, health) {
    setFuel(fuel);
    setEngineState(true);
    setCarHealth(health);
});

Events.Subscribe('vehiclehud:Show', (state) => {
    const game = $('.game')
    if (state) {
        game.css('display', 'flex');
        game.animate({ opacity: 1 }, 700);
    } else {
        game.animate({ opacity: 0 }, 700, function () {
            game.css('display', 'none');
        });
    }
});