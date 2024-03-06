const spawnSelector = $('.spawn-selector')
const spawn = spawnSelector.find('.spawn')

spawnSelector.css('opacity', 1)
spawnSelector.css('display', 'flex').hide()

spawnSelector.on('click', '.home', function () {
    spawnSelector.find('.spawn').not(this).addClass('hided')
    setTimeout(() => {
        $(this).css('opacity', '0')
        setTimeout(() => {
            spawnSelector.fadeOut(500)
            Events.Call("SpawnInApartment")
        }, 500)
    }, 500)
})


Events.Subscribe('Spawn:ToggleUI', (state) => {
    if (state) {
        spawnSelector.fadeIn('slow');
        Events.Call("EnableMouse");
    }
    else {
        spawnSelector.fadeOut()
    }
});