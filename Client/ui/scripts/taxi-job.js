let vehicleSelected = false;
let divs = 0;

/* ------- Events ------- */
Events.Subscribe('Taxi:ShowUI', (state) => {
    document.getElementsByClassName('taxi-wrapper')[0].style.display = state ? 'block' : 'none';
    let estado = ""
    if (state == true) {
        estado = "block"
    } else {
        estado = "none"
    }
    console.log('setting display to ' + estado);
});

function SendGovMisson() {
    Events.Call('StartMission');
}

function tato() {
    Events.Call('Taxi:ConfirmOrder');
}

Events.Subscribe('Taxi:SendNotif', () => {
    $(".notif").fadeIn(400);

    setTimeout(() => {
        $(".notif").fadeOut(400);
    }, 8000)
});

Events.Subscribe('Taxi:PushOrder', (plyName, distance) => { 
    createOrderDiv('order-1', `
    <div id="fb">
        <div id="fb-top">
            <p><b>Taxi Request</b></p>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/TAXI.jpg" height="100" width="100" alt="Image of woman">
        <p id="info"><b>${plyName}</b> <br> <span>${distance}</p>
        <div id="button-block">
            <div id="confirm" onclick="tato()">Confirm</div>
            <div id="delete">Delete Request</div>
        </div>
    </div>
`)});

function createOrderDiv(id, content) {
    if (divs < 3) {
        const div = document.createElement('div');
        div.innerHTML = content;
        document.getElementById('lc').appendChild(div);
        divs++;
        return div;
    } else {
        // event to say that all cabs are busy
    }
}