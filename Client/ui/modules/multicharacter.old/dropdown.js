var lastActive = undefined;
var date_picker_opened = undefined;
var months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
];

var currentYear = new Date().getFullYear()
var oldValue = currentYear;

var DatePickerElements = {
    Body : $('.date__picker'),
    Days : $('.date__picker .date__options .options'),
    Month: $('.date__picker .select__month #month__label'),
    Year: $('.date__picker .select__year #year__label'),
}

var DatePicker = {}
var menuOpened = false

DatePicker.Open = () => {
    DatePickerElements.Body.addClass('active')
    menuOpened = true    
    window.currentFocus = DatePickerElements.Body;
}

DatePicker.Close = () => {
    DatePickerElements.Body.removeClass('active')
    menuOpened = false
}

DatePicker.IncreaseYear = () => {
    if (oldValue >= currentYear) return;

    oldValue++

    var picker = DatePickerElements.Body

    picker.data('year', oldValue)
    picker.find('#year__label').val(oldValue)
    picker.find('.day.disabled').removeClass('disabled')

    var daysInMonth = getDaysInMonth(picker.data('month'), oldValue);

    DatePickerElements.Day.removeClass('active')

    for (i = daysInMonth; i < 31; i++)
        DatePickerElements.Day[i].classList.add('disabled');

    picker.data('date', `${(picker.data('day') && n(picker.data('day'))) || 'DD'}/${n(picker.data('month')) || 'MM'}/${picker.data('year')  || 'YYYY'}`);
    picker[0].dataset.date = picker.data('date')
}

DatePicker.DecreaseYear = () => {
    if (oldValue <= 1990) return;

    var picker = DatePickerElements.Body

    oldValue--;
    
    picker.data('year', oldValue)
    picker.find('#year__label').val(oldValue)
    picker.find('.day.disabled').removeClass('disabled')

    var daysInMonth = getDaysInMonth(picker.data('month'), oldValue);

    DatePickerElements.Day.removeClass('active')

    for (i = daysInMonth; i < 31; i++)
        DatePickerElements.Day[i].classList.add('disabled');

    picker.data('date', `${(picker.data('day') && n(picker.data('day'))) || 'DD'}/${n(picker.data('month')) || 'MM'}/${picker.data('year')  || 'YYYY'}`);
    picker[0].dataset.date = picker.data('date')
}

DatePicker.DecreaseMonth = () => {
    var picker = DatePickerElements.Body
    var month = parseInt(picker.data('month'))

    month = month - 1 % 12
    if (month <= 0)
        month += 12

    picker.data('month', month)
    DatePickerElements.Month.text(months[month - 1])
    picker.find('.day.disabled').removeClass('disabled'); // remove all disabled days
    
    var daysInMonth = getDaysInMonth(month, oldValue); // get days in the next month

    DatePickerElements.Day.removeClass('active')

    for (i = daysInMonth; i < 31; i++)
        DatePickerElements.Day[i].classList.add('disabled')
}

DatePicker.IncreaseMonth = () => {
    var picker = DatePickerElements.Body
    var month = parseInt(picker.data('month'))

    month = month % 12

    picker.data('month', month + 1)
    DatePickerElements.Month.text(months[month]) // Set label as current money
    picker.find('.day.disabled').removeClass('disabled') // Remove disabled days

    var daysInMonth = getDaysInMonth(month + 1, oldValue); // get num of days in the month

    DatePickerElements.Day.removeClass('active')

    console.log(daysInMonth)

    // Disable the days that arent allowed
    for (i = daysInMonth; i < 31; i++)
        DatePickerElements.Day[i].classList.add('disabled');
}

DatePicker.SelectDay = day => {
    var picker = DatePickerElements.Body

    day = $(day)

    DatePickerElements.Day.removeClass('active')
    day.addClass('active')
    
    picker.data('date', `${n(day.data('day'))}/${n(picker.data('month'))}/${picker.data('year')}`);
    picker[0].dataset.date = picker.data('date');
}

const SetupDatePicker = () => {    
    var date = new Date()
    var month = date.getMonth()
    
    var picker = DatePickerElements.Body;

    DatePickerElements.Month.text(months[month])
    
    picker.data('month', month + 1) // jan = 0, so offset 1
    picker.data('year', currentYear)
    picker.data('date', 'MM/DD/YYYY')
    
    for (var i = 1; i <= 31; i++)
    {
        var dayTemplate = $(`
            <div class="day" data-day=${i}></div>
        `)
    
        dayTemplate.data('day', i)
    
        dayTemplate.appendTo(DatePickerElements.Days)
    }

    DatePickerElements.Day = $(DatePickerElements.Days.find('.day'))
}

SetupDatePicker()

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

DatePickerElements.Year.focusout(e => {
    var inputValue = e.target.value.trim();

    // Remove any non-digit characters from the input value
    inputValue = inputValue.replace(/\D/g, "");
  
    // Parse the input value as an integer
    var number = parseInt(inputValue);
  
    // Check if the number is within the desired range
    if (isNaN(number) || number < 1900 || number > 2023) {
      // Number is not within the range, clear the input
      e.target.value = oldValue;
    } else {
      // Number is valid, update the input value
      e.target.value = number;
      oldValue = number;

      var picker = DatePickerElements.Body;

      var month = picker.data('month');
      var day = picker.data('day');
      
      picker.data('year', number);

      picker.data('date', `${n(day || 0)}/${n(month)}/${number}`);
      picker[0].dataset.date = picker.data('date');  
    }
})