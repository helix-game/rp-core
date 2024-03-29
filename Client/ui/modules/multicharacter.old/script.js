var isMale = true;
var currentGender = $('.gender__symbol.male')
var characterSlot = undefined;

var registrationPage = $('.character__registration')
var selectionPage = $('.multichar__selection')

var character_information = $('.character__info')

var currentCharacter = undefined
window.element_focused = undefined

var SelectCharacter = {
    body: $('.multichar__selection'),
    info: $('.character__info'),
    indicator: $('.character__indicator'),
    characters: $('.characters'),
    choose: $('.character__select')
}

var CreateCharacter = {
    body: $('.character__registration'),
    inputs: $('.input__groups'),
    genders: {
        male: $('.genders .male'),
        female: $('.genders .female'),
    },
    back: $('.go__back__btn'),
    confirm: $('.confirm__btn')
}

var ScreenStates = {
    SelectCharacter: 1,
    CreateCharacter: 2,
}

var currentState = null

SelectCharacter.body.css('transition', 'all ease-in-out 150ms')
SelectCharacter.info.css('transition', 'all ease-in-out 150ms')
SelectCharacter.indicator.css('transition', 'all ease-in-out 150ms')
CreateCharacter.body.css('transition', 'all ease-in-out 150ms')

const SetDisplay = bool => {
    if (bool)
        $(document.body).fadeIn()
    else
        $(document.body).fadeOut()
}

const SetActiveScene = scene => {
    currentState = scene

    SelectCharacter.body.removeClass('active')
    CreateCharacter.body.removeClass('active')

    if (scene == ScreenStates.SelectCharacter)
    {
        SelectCharacter.body.addClass('active')
        Events.Call('multicharacter:ChooseCharacter')
    }
    else if (scene == ScreenStates.CreateCharacter)
    {
        CreateCharacter.body.addClass('active')
        Events.Call('multicharacter:CreateCharacter')
    }
}

const ShowCharacterInfo = () => {
    SelectCharacter.info.addClass('active')
    SelectCharacter.indicator.addClass('active')
}

const HideCharacterInfo = () => {
    SelectCharacter.info.removeClass('active')
    SelectCharacter.indicator.removeClass('active')
}

const SetCharacterInfo = index => {    
    if (!characterData.characters[index]) return

    var character = characterData.characters[index]

    var cash = character?.cash
    var bank = character?.bank
    var phone_number = character?.phone_number
    var gender = character?.gender
    var job = character?.job
    var first_name = character?.first_name
    var last_name = character?.last_name
    var nationality = character?.nationality
    var date_of_birth = character?.date_of_birth

    isMale = gender == 'Male'
    Events.Call('multicharacter:ChangeGender', isMale)

    SelectCharacter.info.find('#cash_money .labels .value').html(`${cash.toLocaleString("en-US")} <span class="currency"></span>`)
    SelectCharacter.info.find('#bank_money .labels .value').html(`${bank.toLocaleString("en-US")} <span class="currency"></span>`)
    SelectCharacter.info.find('#phone_number .labels .value').text(phone_number)
    SelectCharacter.info.find('#gender .labels .value').text(gender)
    SelectCharacter.info.find('#job .labels .value').text(job)
    SelectCharacter.info.find('#nationality .labels .value').val(nationality)
    SelectCharacter.info.find('#date_of_birth .labels .value').text(date_of_birth)

    // var dates = date_of_birth.split('/')
    // var date = new Date(+dates[2], dates[1] - 1, +dates[0]).toLocaleString('en-uk', {month: 'long', year: 'numeric', day: '2-digit'})
    // SelectCharacter.info.find('#date_of_birth .labels .value').text(`${date.slice(0, -5)},${date.slice(-5, date.length)}`)
    
    SelectCharacter.indicator.find('#character__indicator__name').html(`<strong>${first_name}</strong> ${last_name}`)
    // var character_indicator = $('.character__indicator')

    // character_indicator.html(`<strong>${first_name}</strong> ${last_name}`)
    
    // character_indicator.css('opacity', 1)
}

SetActiveScene(ScreenStates.SelectCharacter)



var currentSelected = null
var currentFocus = null
var isMale = true
$(window).click(e => {
    var target = e.target
    if (currentState == ScreenStates.SelectCharacter)
    {
        
        var characterButton = target.closest('.character__button') 
        if (characterButton)
        {
            var jCharacterBtn = $(characterButton)

            SelectCharacter.characters.find('.character__button').removeClass('active')
            jCharacterBtn.addClass('active')

            currentSelected = jCharacterBtn

            if (currentSelected[0].dataset.newCharacter == 'false')
            {
                SetCharacterInfo(jCharacterBtn.data('index'))
                ShowCharacterInfo()
            }
            else
            {
                HideCharacterInfo()
            }

            return
        }

        var chooseButton = target.closest('.character__select')
        if (chooseButton)
        {
            if (currentSelected == null) return;
            
            if (currentSelected[0].dataset.newCharacter === 'true')
                SetActiveScene(ScreenStates.CreateCharacter)
            else
            {
                Events.Call('multicharacter:SelectCharacter', currentSelected[0].dataset.cid)
                HideCharacterInfo()
                SelectCharacter.body.fadeOut(400)
            }

            return
        }
        

        return
    }
    else if (currentState == ScreenStates.CreateCharacter)
    {
        if (window.currentFocus !== null)
        {
            if (window.currentFocus.attr('id') == 'select--dob' && !target.closest('#select--dob'))
                DatePicker.Close()
            else if (window.currentFocus.attr('id') == 'select--nationality' && !target.closest('#select--nationality'))
                SelectMenu.CloseMenu()
        }

        if (target.closest('.go__back__btn'))
        {
            SetActiveScene(ScreenStates.SelectCharacter)
            return
        }

        if (target.closest('.confirm__btn'))
        {
            var first_name = CreateCharacter.inputs.find('#first_name').val().trim()
            var last_name = CreateCharacter.inputs.find('#last_name').val().trim()
            var dob = CreateCharacter.inputs.find('#select--dob')[0].dataset.date
            var nationality = CreateCharacter.inputs.find('.select__menu').data('current_option')
            var cid = 1

            console.log(CreateCharacter.inputs.find('.select__menu'), CreateCharacter.inputs.find('.select__menu').data('current_option'))

            Events.Call('multicharacter:SaveCharacter', { first_name, last_name, date_of_birth: dob, nationality, gender: isMale, cid })
            return
        }
        var nationalitiesElem = target.closest('.select__group')
        var nationalitiesInput = target.closest('.select__group .select__label')
        if (nationalitiesElem)
        {
            if (nationalitiesInput) return;
            
            SelectMenu.OpenMenu()
            return
        }
        
        var date = target.closest('.date__picker .date__options')
        var dateOfBirth = target.closest('.date__picker')
        if (dateOfBirth)
        {
            if (date)
            {
                var day = target.closest('.date__options .day:not(.disabled)')
                if (day)
                {
                    DatePicker.SelectDay(day)
                    return
                }
           
                var newMonth = target.closest('.select__month .month__button')
                if (newMonth) 
                {
                    if (target.closest('[data-action=next]'))
                        DatePicker.IncreaseMonth()
                    else if (target.closest('[data-action=previous]'))
                        DatePicker.DecreaseMonth()

                    return
                }

                target = target.closest('.select__year .year__button')
                if (target) 
                {
                    if (target.closest('[data-action=next]'))
                        DatePicker.IncreaseYear()
                    else if (target.closest('[data-action=previous]'))
                       DatePicker.DecreaseYear()

                    return
                }
                return
            }
            else
                DatePicker.Open()
            return;
        }

        var gender = target.closest('.gender__symbol')
        if (gender)
        {
            if (
                gender.dataset.gender == 'male' && isMale ||
                gender.dataset.gender == 'female' && !isMale
                ) return;

            isMale = gender.dataset.gender == 'male'
            $('.gender__symbol').removeClass('active')
            $(gender).addClass('active')
            Events.Call('multicharacter:ChangeGender', isMale)
            return
        }
    }
})

function Init()
{   
    SelectCharacter.characters.empty()
    
    var template = `
    <div class="character__button" data-new-character='true' >
        <div class="label">
        <div class="identifier">Create</div>
        <div class="name">New Character</div>
        </div>
        <div class="icon new">
        <span class="material-symbols-outlined">
        add
        </span>
        </div>
    </div>
    `;
    
    for (var i = 0; i < 3; i++)
    {
        var elem = $(template)

        var character = undefined

        if (characterData && characterData.characters && characterData.characters[i])
            character = characterData.characters[i]

        elem[0].dataset.cid = i + 1;
        
        if (i < characterData.slotsAvailable && character !== undefined)
        {
            elem[0].dataset.identifier = character.identifier
 
            elem.find('.identifier').text(character.identifier)
            elem.find('.name').text(character.first_name + ' ' + character.last_name)

            var icon = elem.find('.icon.new')
            
            icon.addClass('filled')
            icon.find('span').text('person_filled')
            
            elem.data('index', i)
            elem.data('identifier', character.identifier)
            elem.data('first_name', character.first_name)
            elem.data('last_name', character.last_name)

            elem.data('cash', character.cash)
            elem.data('bank', character.bank)
            elem.data('phone_number', character.phone_number)
            elem.data('gender', character.gender)
            elem.data('job', character.job)
            elem.data('nationality', character.nationality)
            elem.data('date_of_birth', character.date_of_birth)

            elem[0].dataset.newCharacter = 'false'
        }
        else if (i >= characterData.slotsAvailable)
        {
            elem.addClass('disabled')
            elem.html(`
            <div class="label">
                <div class="identifier">Create</div>
                <div class="name">New Character</div>
            </div>
            <div class="icon new"></div>
            `)
        }        
        
        SelectCharacter.characters.append(elem)
    }
}

// If dropdown or date picker is opened we close it.
$('input').focus(e => {
    if (window.element_focused)
    {
        window.element_focused.removeClass('active')
        window.element_focused = null
    }
})

Events.Subscribe('Multichar:Init', ({ nationalities, characterData: _cData }) => {
    // Setup character data
    characterData = _cData
    Init()
    
    // Setup nationalities
    nationalityOptions = nationalities
    // SetupNationalities()
    
    SetDisplay(true)

    if (characterData.characters)
        SetActiveScene(ScreenStates.SelectCharacter)
    else
        SetActiveScene(ScreenStates.CreateCharacter)

});

$(document.body).css('opacity', 1)
$(document.body).hide()