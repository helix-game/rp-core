const InputMenu = new Map();

const inputCancelButton = $('.input-menu #cancel');
const inputAcceptButton = $('.input-menu #accept');

const inputWrapper = $('.input-wrapper');
const inputTitle = $('.input-menu #title');

const inputDescription = $('.input-menu #description');
const inputField = $('.input-menu input');

inputWrapper.css('opacity', 1)
inputWrapper.css("display", "flex").hide()

// inputWrapper.show()
inputCancelButton.click(() => {
    inputWrapper.fadeOut('normal', () => {
        Events.Call("InputMenu:Cancel");
        ClearAll();
    });
})

inputAcceptButton.click(() => {    
    Events.Call("InputMenu:Respond", inputField.val());
})

function CreateInput(title, description) {
    ClearAll();

    inputTitle.text(title);
    inputDescription.text(description);
}

function ClearAll(){
    InputMenu.clear()
    inputField.val('');
}

Events.Subscribe('InputMenu:Init', (title, description) => {
    CreateInput(title, description)
    inputWrapper.fadeIn()
});

Events.Subscribe('InputMenu:Exit', () => {
    inputWrapper.fadeOut('normal', () => {
        ClearAll();
    });
});