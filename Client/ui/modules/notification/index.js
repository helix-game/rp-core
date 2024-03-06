
$().ready(() => {
    var notificationContainer = $('.grid-container')
    
    const showNotification = ({type, text, title, duration}) => {
        if (!type) type = 'info'
        if (!duration) duration = 5000

        var text = text.replace("<focus>",`<focus id="${type}-text">`);
        var id = Date.now();

        var element = $(`
        <span class="grid-item" id="${id}">
            <div class="text">
                <span class="title">${title}</span>
                <span class="label">${text}</span>
            </div>
            <image class="icon" id="${type}-icon" src="images/${type}-icon.svg"></image>
        </span>
        `);

        notificationContainer.append(element);
        
        element.css('position', 'relative').css('right', '-110%').css('opacity', 0.0)
        
        element.animate({ right: '0', opacity: 1 }, 150, 'linear')
        
        setTimeout(element => {
            element.animate({ right: '-110%', opacity: 0 }, 150, 'linear', () => {
                element.remove()
            })
        }, duration, element)
    }

    Events.Subscribe("showNotification", showNotification);
});