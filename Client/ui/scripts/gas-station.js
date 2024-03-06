let interval = null

const GasStation = new Map()

const warningMessage = $('.adv p');
const gasStationWrapper = $('.gas-station-wrapper');
const fuelProgressbar = $('#progressfuel');

GasStation.set("fuelPrice", 2.85);
warningMessage.text('Your vehicle takes Unleaded!');

Events.Subscribe('GasStation:Init', ({ state, vehicleFuel }) => {
    state ? gasStationWrapper.fadeIn() : gasStationWrapper.fadeOut();
    
    GasStation.set("visible", state);
    GasStation.set("fueling", false);
    GasStation.set("currentFuelType", 'type2');
    
    if (state)
    {
        GasStation.set("initialFuel", vehicleFuel);
        fuelProgressbar.css('width', (vehicleFuel || 0) + '%');
        console.log(vehicleFuel)
        console.log(fuelProgressbar.css('width'))

        return
    }
    
    GasStation.delete("initialFuel");
    GasStation.delete("fuelProgress");
});

$(window).trigger("resize");
$(window).resize(function(e) {
    let width = $(window).width()
    let scale = width / 1700

    scale = scale < 0.5 ? 0.5: scale;
    scale = scale > 1.0 ? 1.0: scale;

    $('.gas-station').css('transform', `scale(${scale})`)
});

$('.types .type').click((e) => {
    if (GasStation.get("fueling")) return;
    let currentFuelType = GasStation.get("currentFuelType");
    let target = e.currentTarget
    if (target.id == currentFuelType) return;

    let oldFuel =  '#' + currentFuelType;

    $(oldFuel)[0].classList.remove('selected');

    GasStation.set("currentFuelType", target.id);
    target.classList.add("selected");
})

function StopFueling()
{
    $('.circle').removeClass('green');
    $('#filltext').text('START FUELING');
    clearInterval(interval);

    GasStation.set('fueling', false);

    console.log("STOPPED")
    Events.Call("GasStation:ChargeFuel", GasStation.get("fuelProgress") - GasStation.get("initialFuel"));
    GasStation.set("initialFuel", GasStation.get("fuelProgress"))
}


$('#fuel-button').click(() => {
    if (GasStation.get('fueling'))
        return StopFueling()

    let initialFuel = GasStation.get("initialFuel");
    let progress = initialFuel;
    
    console.log(progress)

    GasStation.set('fueling', true);

    interval = setInterval((fuelPrice) => {
        progress += 1;
        console.log(progress, fuelPrice)
        if (progress >= 100) {
            StopFueling()
        } else
        {
            let gallons = ((progress - initialFuel) / 4).toFixed(2);

            $('#filltext').text('STOP FUELING');
            $('.circle').addClass('green');
            $('#lixprice').text((fuelPrice * gallons).toFixed(2));
            $('#gallons').text(gallons);
            
            fuelProgressbar.css('width', progress + '%');
            GasStation.set("fuelProgress", progress);
        }
    }, 100, GasStation.get('fuelPrice'));

});
