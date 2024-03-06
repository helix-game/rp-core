let nationalityOptions = [
    'Irish',
    'German',
    'Lithuanian',
    'Japanese',
    'American',
    'Canadian',
    'Australian'
]

var SelectElements = {
    Body: $('.select__menu'),
    Options: $('.select__options .select__option'),
    Nationality: $('.select__group .select__label'),
    SortedOptions: [
        $('#select--nationality > div.select__options > div.select__option:nth-child(1)'),
        $('#select--nationality > div.select__options > div.select__option:nth-child(2)'),
        $('#select--nationality > div.select__options > div.select__option:nth-child(3)'),
        $('#select--nationality > div.select__options > div.select__option:nth-child(4)'),
        $('#select--nationality > div.select__options > div.select__option:nth-child(5)'),
    ]
}


var menuOpened = false

var SelectMenu = {}

var filteredOptions = []

var menuOptions = []
var currentOption = 0;

function NationalityFocusIn() {
    SelectMenu.OpenMenu(true)
}

var lastScrollTop = 0;
$(window).scroll(e => {
    // if (!$(':focus').hasClass('select__label')) return
    
    var st = $(this).scrollTop();

    if (st > lastScrollTop) {
        console.log('scroll down')
        // downscroll code
    } else {
        console.log('scroll up')
        // upscroll code
    }
    lastScrollTop = st;
});

function GetStartingIndex(value) {
    for (var i = 0; i < nationalityOptions.length; i++) {
        if (nationalityOptions[i].toLowerCase().includes(value) == true)
            return i
    }
}

$(document.body).keyup(e => {
    if ($(':focus').hasClass('select__label')) {
        var value = e.target.value.toLowerCase();
        var startIdx = Math.floor(nationalityOptions.length / 2);

        if (value.length !== 0)
            startIdx = GetStartingIndex(value)

        menuOptions = generateOptions(startIdx)


        menuOptions.forEach((text, idx) => {

            SelectElements.SortedOptions[idx].data('idx', idx)
            SelectElements.SortedOptions[idx].text(text)
        })

        return
    }
})

$(document.body).click(e => {
    var target = e.target

    var item = target.closest('.select__option')
    if (item) {
        if (item.dataset.action == 'previous')
            menuOptions = shiftArrayUp()
        else if (item.dataset.action == 'next')
            menuOptions = shiftArrayDown()

        item = $(item)

        menuOptions.forEach((text, idx) => {

            SelectElements.SortedOptions[idx].data('idx', idx)
            SelectElements.SortedOptions[idx].text(text)
        })
        return
    }
})

SelectMenu.CloseMenu = (ignoreBlur) => {
    console.log('test')
    if (menuOpened == false) return;

    SelectElements.Body.removeClass('active')
    menuOpened = false

    if (!ignoreBlur)
        SelectElements.Nationality.trigger('blur')

    SelectElements.Nationality.val(nationalityOptions[currentOption])
}

SelectMenu.OpenMenu = (ignoreFocus) => {
    if (menuOpened) return

    menuOpened = true

    window.currentFocus = SelectElements.Body
    SelectElements.Body.addClass('active')

    filteredOptions = nationalityOptions

    var startIdx = Math.floor(nationalityOptions.length / 2);
    var value = SelectElements.Nationality.val()

    if (value.length !== 0)
        startIdx = GetStartingIndex(value)

    menuOptions = generateOptions(startIdx)

    menuOptions.forEach((text, idx) => {
        if (idx >= filteredOptions.length) return;

        SelectElements.SortedOptions[idx].data('idx', idx)
        SelectElements.SortedOptions[idx].text(text)
    })

    if (!ignoreFocus)
        setTimeout(function () { SelectElements.Nationality.focus() }, 15);
}

function shiftArrayDown() {
    return generateOptions(currentOption + 1, true);
}

function shiftArrayUp() {
    return generateOptions(currentOption - 1, true);
}

function generateOptions(startIdx, updateLabel) {
    startIdx -= 2

    var opts = nationalityOptions.slice(startIdx, startIdx + 5)

    currentOption = startIdx + 2
    SelectElements.Body.data('current_option', currentOption)
    
    if (updateLabel)
        SelectElements.Nationality.val(nationalityOptions[currentOption])

    return opts
}