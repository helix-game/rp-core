const interactionWrapper = document.querySelector('.interaction-wrapper')

var interactionMap = {}

var keysBeingPressed = new Map();
var interationOngoing = new Map();

Events.Subscribe("interaction:AddInteraction", (key, text, hold, duration) => {
    CreateInteraction(key, text, hold, duration)
});

Events.Subscribe("interaction:RemoveInteraction", (key) => {

    var interaction = interactionMap[key];

    if (!interaction) return;

    var interactionElement = interaction.element;
    
    delete interactionMap[key]
        
    $(interactionElement).fadeOut(150, () => {
        interactionElement.remove()
    });

});
Events.Subscribe("interaction:ReleasedKey", (key) => {
    keysBeingPressed.delete(key);
});
Events.Subscribe("interaction:PressedKey", (key) => {
    keysBeingPressed.set(key, true);
    
    var interaction = interactionMap[key];
    
    if (!interaction) return;
    
    if (!interaction.hold && interationOngoing.get(key)) return;

    let interactionDuration = interaction.duration / 100;
    let interactionElement = interaction.element;

    let circle = interactionElement.querySelector("#circle")

    circle.setAttribute("stroke-dasharray", "0, 100");
    circle.setAttribute("stroke", "rgba(233, 233, 233, 0.7)");

    if (!interaction.hold) interationOngoing.set(key, true);
    console.log(interactionDuration)

    let dash = circle.getAttribute("stroke-dasharray").split(",");
    let progAmount = parseInt(dash[0]) + 1;

    let interval = setInterval( (interaction, key) => {
        if (interaction.hold && keysBeingPressed.get(key) == undefined) {
            return StopInteraction(key, interval, false);
        }

        progAmount++;
        circle.setAttribute("stroke-dasharray", progAmount + ", 100");
        if (progAmount >= 100) {
            StopInteraction(key, interval, true);
        }
    }, interactionDuration, interaction, key);
});

function StopInteraction(key, interval, completed) {
    
    let interaction = interactionMap[key];

    if (!interaction) return;

    let interactionElement = interaction.element;

    let circle = interactionElement.querySelector("#circle")
    
    circle.setAttribute("stroke-dasharray", "0, 100");
    circle.setAttribute("stroke", "transparent");
    
    clearInterval(interval);
    
    if (completed)
    {
        interationOngoing.delete(key)

        console.log("interaction completed")
        Events.Call("interaction:completed", key);
    }
}

function CreateInteraction(key, text, hold, duration) {
    if (interactionMap[key]) 
    {
        var element = $(interactionMap[key].element)

        interactionMap[key].hold = hold
        interactionMap[key].duration = duration

        element.find('text').text(key)
        element.find('.interaction-message').text(text)
        
        return
    }

    let interactionTemplate = `
            <div class="interaction-group">
                    <div class="interaction-button">
                        <div class="circle">
                            <svg viewBox="0 0 36 36">
                                <path
                                    id="circle"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="transparent";
                                    stroke-width="2";
                                    stroke-dasharray="0, 100"
                                />
                                <path
                                    id="back_circle"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.4)"; 
                                    stroke-width="2";
                                    stroke-dasharray="100, 100"
                                />
                                <text x="50%" y="50%" text-anchor="middle" stroke="rgba(233, 233, 233, 0.9)" stroke-width="1px" dy=".3em">${key}</text>
                            </svg>
                        </div>
                    </div>
                    <h1 class="interaction-message">${text}</h1>
                </div>
            `;

    let interactionElement = document.createElement('div');
    interactionElement.innerHTML = interactionTemplate;

    interactionWrapper.append(interactionElement);

    $(interactionElement).hide();

    $(interactionElement).fadeIn(150)
    interactionMap[key] = {element: interactionElement, hold, duration }
}