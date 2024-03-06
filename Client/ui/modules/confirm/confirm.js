const ConfirmMenu = new Map();

const confirmCancelButton = $('.confirm-wrapper #cancel');
const confirmAcceptButton = $('.confirm-wrapper #accept');

const confirmWrapper = $('.confirm-wrapper');
const confirmTitle = $('.confirm-menu #title');
const confirmPrice = $('.confirm-wrapper #price');
const confirmDescription = $('.confirm-menu #description');

confirmWrapper.css('opacity', 1)
confirmWrapper.css("display", "flex").hide()

// confirmWrapper.show()

Events.Subscribe('ConfirmMenu:Init', (title, description, price) => {
    console.log(title, description, price)
    CreateConfirm(title, description, price)
    confirmWrapper.fadeIn();
});

Events.Subscribe('ConfirmMenu:Exit', () => {
    confirmWrapper.fadeOut('slow', () => {
        ClearAll();
    })
});

confirmAcceptButton.click(() => {
    console.log('accepted')
    Events.Call("ConfirmMenu:Respond");
})

confirmCancelButton.click(() => {
    Events.Call('ConfirmMenu:Cancel');
})

// CreateConfirm('test', 'test', 100)

function CreateConfirm(title, description, price) {
    confirmTitle.text(title)
    confirmDescription.text(description)
    
    
    // typeof price === 'number' ? toString(price) : "";
    // console.log(typeof price)
    if(price !== null){
        price = price + "";
        
        let priceWithCommas = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        confirmPrice.show();
        confirmPrice.find("span").text(priceWithCommas);
    } else {
        confirmPrice.hide();
    }    
}

function ClearAll(){
    // confirmWrapper.empty()
    ConfirmMenu.clear();
}