const actionMenuWrapper = $('.action-menu-wrapper');

const actionButtons = $('.action-button:not(.close-button)');
const closeButton = $('.action-button.close-button');

const nextButton = $('#next-button')
const prevButton = $('#prev-button')

const maxPageElement = $('#max-page');
const actualPageElement = $('#actual-page');

const actionButtonText = $('#action-state');

const ActionMenu = new Map();


actionMenuWrapper.css('opacity', 1)
actionMenuWrapper.css('display', 'flex').hide()

DisplayActionMenu(false)
// CloseActionMenu()

closeButton.click(() => {
    let opened = ActionMenu.get("menuOpen");
    
    opened ? actionButtonText.text("OPEN") : actionButtonText.text("CLOSE");

    opened ? CloseActionMenu() : OpenActionMenu();
    opened = !opened;

    ActionMenu.set("menuOpen", opened);
})

function CloseActionMenu(){
    actionButtons.addClass("close-state")
    closeButton.removeClass("opened")
    closeButton.addClass("closed")
}
function OpenActionMenu(){
    actionButtons.removeClass("close-state")
    closeButton.removeClass("closed")
    closeButton.addClass("opened")
}

function InitHoney(opts, forceOpen){
    var firstSix = opts.slice(0, 6);
    SetMaxPages(opts.length)
    SetOptions(firstSix, 1)
    
    ActionMenu.set("currentOptions", opts)
    ActionMenu.set('currentPage', 1);

    DisplayActionMenu(true)
    CloseActionMenu()

    if (!forceOpen) return;
    
    setTimeout(() => {
        OpenActionMenu();
        actionButtonText.text("CLOSE")
        ActionMenu.set("menuOpen", true);
    }, 150)
}

function SetMaxPages(optLength){
    var maxPageNum = Math.ceil(optLength / 6);
    

    maxPageElement.text(maxPageNum);

    ActionMenu.set('maxPage', maxPageNum);

    if (optLength < 6) 
        $('.page-skipper').fadeOut()
    else
        $('.page-skipper').fadeIn()
}

function SetOptions(opts, page){
    let offset = page * 6 - 6

    actionButtons.each((index, hex) => {
        hex = $(hex)
        let hexId = hex.attr('data-id');
        if(hexId > opts.length){
            hex.fadeOut(200)
        } else {
            hex.fadeIn(200)
            console.log(hex)
            let opt = opts[index]

            hex.find('.icon i').attr('class', opt.icon);
            hex.find('.label').text(opt.label);
            hex.find('.button-number').text(index + 1 + offset)
        }       
    })    
} 

/* Reponse */
$('.action-menu-wrapper').click(e => {
    var target = e.target.closest(".hex:not(.close-button)");

    if (!target) return;

    target = $(target);
    let curPage = ActionMenu.get('currentPage');
    let offset = curPage * 6 - 6
    let hexId = parseInt(target.attr('data-id'));

    let id = hexId + offset

    // CLOSE MENU
    let opened = ActionMenu.get("menuOpen");
    
    opened ? actionButtonText.text("OPEN") : actionButtonText.text("CLOSE");

    opened ? CloseActionMenu() : OpenActionMenu();
    opened = !opened;

    ActionMenu.set("menuOpen", opened);

    // RESPOND
    Events.Call("ActionMenu:Respond", id);
})

/* Pages control */
function ChangePage(goForward)
{
    let curPage = ActionMenu.get('currentPage');
    let maxPage = ActionMenu.get('maxPage');
    var options = ActionMenu.get("currentOptions");


    console.log("TEST 3 => ", ActionMenu.get("currentOptions"))

    if (!options) return;
    if (!goForward && curPage <= 1) return;
    if (goForward && curPage >= maxPage) return;
 
    goForward ? curPage++ : curPage--;

    $('.page-skipper p span').addClass('pageAnim')
    setTimeout(() => {
        $('.page-skipper p span').removeClass('pageAnim')
    }, 1000)

    CloseActionMenu()
    ActionMenu.set('currentPage', curPage);
    setTimeout(curPage => {

        actualPageElement.text(curPage);

        var newActions = options.slice(curPage * 6 - 6, curPage * 6);
        
        SetOptions(newActions, curPage)
        
        setTimeout(() => {
            OpenActionMenu()
            actionButtonText.text("CLOSE");
            ActionMenu.set("menuOpen", true);
        }, 200)

    }, 300, curPage)
}

function DisplayActionMenu(bool) {
    ActionMenu.set("actionDisplayed", bool);
    ActionMenu.set("menuOpen", false);

    bool ? actionMenuWrapper.fadeIn() : actionMenuWrapper.fadeOut()

    // console.log(ActionMenu.get("menuOpen"))
}

nextButton.click(() => ChangePage(true))
prevButton.click(() => ChangePage(false))

Events.Subscribe('ActionMenu:Init', (elements, forceOpen) => {
    if (ActionMenu.get("actionDisplayed")) return;
    
    InitHoney(elements, forceOpen)
});

Events.Subscribe("ActionMenu:Exit", () => {
    actionButtonText.text("OPEN")
    CloseActionMenu()
    DisplayActionMenu(false);
})