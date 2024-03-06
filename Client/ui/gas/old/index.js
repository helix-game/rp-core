Events.Subscribe('gasstation:display', state => {
    if (state) {
        $('.container').show();
    } else {
        $('.container').hide();
    }
});

let fueling = false
let interval = null
let fuelPrice = 2.85
let pumpedGalons = 0
let finalPrice = 0

$('#fuel-button').click(() => {
    if (!fueling) {
        let initialFuel = $('#progressfuel').width() / $('#progressfuel').parent().width() * 100;
        let progress = $('#progressfuel').width() / $('#progressfuel').parent().width() * 100;
        
        interval = setInterval(() => {
            progress += 1;
            if (progress >= 100) {
                $('.circle').removeClass('green');
                $('#filltext').text('START FUELING');
                clearInterval(interval);
            } else{
                $('#filltext').text('STOP FUELING');
                $('.circle').addClass('green');
                $('#progressfuel').css('width', progress + '%');
                $('#lixprice').text((fuelPrice * ((progress - initialFuel) / 4)).toFixed(2));
                $('#gallons').text(((progress - initialFuel) / 4).toFixed(2));
            }
        }, 100);
        fueling = true;
    } else {
        $('.circle').removeClass('green');
        $('#filltext').text('START FUELING');
        clearInterval(interval);
        fueling = false;
    }
});
