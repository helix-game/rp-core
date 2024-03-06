const SelectionMenu = new Map();

const selectCancelButton = $('.select-wrapper #cancel');
const selectAcceptButton = $('.select-wrapper #accept');

const selectWrapper = $('.select-wrapper');
const selectTitle = $('.select-menu #title');

const selectDescription = $('.select-menu #description');
const selectOptions = $('.select-menu .options');

selectWrapper.css('opacity', 1)
selectWrapper.css("display", "flex").hide()

Events.Subscribe('SelectMenu:Init', (title, description, options) => {
    CreateSelect(title, description, options)
    selectWrapper.fadeIn()
});

Events.Subscribe('SelectMenu:Exit', () => {
    selectWrapper.fadeOut('slow', () => {
        ClearAll();
    });
});


selectCancelButton.click(() => {
    // if (!SelectionMenu.get("selectedOption")) return;
    Events.Call('SelectMenu:Cancel');
    // selectWrapper.fadeOut('slow', () => {
    //     ClearAll();
    // });
})

selectAcceptButton.click(() => {
    if (!SelectionMenu.get("selectedOption")) return;
    
    Events.Call("SelectMenu:Respond", SelectionMenu.get("selectedOption").attr('data-id'));

})

$('.options').click(e => {
    if (SelectionMenu.get("selectedOption"))
    {
        SelectionMenu.get("selectedOption").removeClass("active");
    }
    let selectedOption = $(e.target.closest(".option"));
    
    selectedOption.addClass("active");
    SelectionMenu.set("selectedOption", selectedOption);
})

function CreateSelect(title, description, options) {
    selectTitle.text(title);
    selectDescription.text(description);

    selectOptions.empty();

    options.forEach((option, i) => {
        console.log(option, i)
        let optionTemplate = `<p data-id="${i + 1}" class="option">${option.label}</p>`
        selectOptions.append(optionTemplate);
    })
}

function ClearAll(){
    SelectionMenu.clear()
    selectOptions.empty();
}