const PPG = 3.90

const getElement = (elem) => {
    return document.querySelector(elem);
}
// Toggle Gas Station
const toggleGasStation = () => {
    getElement('.gasstation').classList.toggle('hideslide')
}
document.addEventListener('keydown', evt => {
    if (evt.key === 'Home') {
        toggleGasStation();
    }
});

let stopfill = false
let wallet = 0





// ESCAPE KEY BACK
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        cancelGasStation()
    }
});
// Cancel Gas Station
const cancelGasStation = () => {
    getElement('.container').classList.add('hideslide')

    Events.Call("confirmPurchase", fuelDetails.gallons)
}
//getElement('.walletbalance').textContent = wallet.toFixed(2);

// FUELING
let fuelDetails = {
    price: 0,
    gallons: 0,
    gaslevel: 0
}

const fillGas = (gaslevel) => {
    if (gaslevel <= 25) {
        document.querySelector('.levelfilled').style.background = '#FF3F56'
    } else if (gaslevel <= 50) {
        document.querySelector('.levelfilled').style.background = '#FFA42B'
    } else if (gaslevel <= 75) {
        document.querySelector('.levelfilled').style.background = '#C4F659'
    } else {
        document.querySelector('.levelfilled').style.background = '#3FEA64'
    }
    document.querySelector('.levelfilled').style.width = `${gaslevel}%`
}
const pushFuelDetails = (details) => {
    getElement('.price').textContent = details.price.toFixed(2)
    getElement('.litres').textContent = details.gallons.toFixed(2)
    if (wallet < details.price) {
        getElement('.walletbalance').style.color = '#F24040'
    }
}
const checkWalletBalance = () => {
    if (wallet < fuelDetails.price) {
        getElement('.stopfueling').classList.add('hidden');
        getElement('.startfueling').classList.add('hidden');
        getElement('.nofuel').classList.remove('hidden');
    } else {
        getElement('.stopfueling').classList.add('hidden');
        getElement('.startfueling').classList.remove('hidden');
        getElement('.nofuel').classList.add('hidden');
    }
}
checkWalletBalance()
const startFueling = () => {
    stopfill = false;
    const fillStep = () => {
        if (stopfill) {
            getElement('.stopfueling').classList.add('hidden');
            getElement('.startfueling').classList.remove('hidden');
            return;
        }
        fuelDetails.gaslevel++;
        fuelDetails.gallons += 0.2;
        fuelDetails.price = (fuelDetails.gallons * PPG);
        getElement('.walletbalance').textContent = (wallet - fuelDetails.price).toFixed(2);
        getElement('.walletbalance').style.color = '#F24040'

        pushFuelDetails(fuelDetails)
        fillGas(fuelDetails.gaslevel);

        if (fuelDetails.gaslevel <= 100) {
            setTimeout(fillStep, 100);
        } else {

            getElement('.stopfueling').classList.add('hidden');
            getElement('.startfueling').classList.remove('hidden');
        }
    };
    getElement('.stopfueling').classList.remove('hidden');
    getElement('.startfueling').classList.add('hidden');
    fillStep();
};
const stopFueling = () => {
    stopfill = true
}

Events.Subscribe("PumpSetUp", function (info) {

    wallet = info.cash
    let fuel = info.fuel
    let maxfuel = info.maxfuel

    fuelDetails.gaslevel = (fuel / maxfuel) * 100

    getElement('.walletbalance').textContent = info.cash.toFixed(2);
    fillGas(fuelDetails.gaslevel)

});

toggleGasStation();

