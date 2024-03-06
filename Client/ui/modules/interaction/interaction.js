const wrapper = $('.interaction-menu-wrapper');
const chat = $('.interaction-menu-wrapper .chat');
const options = $('.interaction-menu-wrapper .options');
const borders = $('.interaction-menu-wrapper .border');
const npcName = $('.interaction-menu-wrapper .info .npc-name');
const npcInfo = $('.interaction-menu-wrapper .info .npc-info');
const npcAvatar = $('.interaction-menu-wrapper .card .picture');

let answering = false;
let actualOptions = null;
let concatenedId = null;

let interactionSetup = null;

wrapper.css('opacity', 1)
wrapper.css('display', 'flex').hide();
hideInteraction();

options.on('click', '.option', function(e){
    if (answering) return;
    
    let option = e.target
    let close = false
    let id = option.dataset.id
    if (interactionSetup.options[id-1].options != null) {
        concatenedId = concatenedId == null ? id : concatenedId + '.' + id;
    }

    option.classList.add('clicked');
    setTimeout(() => {
        option.classList.remove('clicked');
    }, 300);

    

    let message = null;
    let response = null;

    if (interactionSetup.options[id-1].response != null) {
        if (actualOptions == null) {
            message = interactionSetup.options[id-1].option;
            response = interactionSetup.options[id-1].response;
        } else {
            message = actualOptions[id-1].option;
            response = actualOptions[id-1].response;
        }
    }
    
    if (message != null && response != null) {
        pushMessage('YOU', message, response, true);
        if (actualOptions != null) {
            setTimeout(() => {
                setupOptions(actualOptions)
            }, 1500);
        }
    }

    if (actualOptions == null) {
        close = interactionSetup.options[option.dataset.id-1].close;
    } else {
        close = actualOptions[option.dataset.id-1].close;
    }
    if (close) {
        Events.Call('Interaction:Response', concatenedId, true);
        hideInteraction();
        setTimeout(() => {
            wrapper.css('display', 'flex').hide();
            resetInteraction();
        }, 4000);
        return;
    }

    if (interactionSetup.options[id-1].options != null) {
        Events.Call('Interaction:Response', concatenedId, false);
        if (actualOptions == null) {
            actualOptions = interactionSetup.options[id-1].options;
        } else {
            actualOptions = actualOptions[id-1].options;
        }
        answering = true;
    } else {
        Events.Call('Interaction:Response', id, false);
        return;
    }
});

function initInteraction(setup){
    interactionSetup = setup;
    npcName.text(setup.npc.name);
    npcInfo.text(setup.npc.info);
    npcAvatar.attr('src', `./media/${setup.npc.avatar}`);
    
    pushMessage(setup.npc.name, setup.openMessage, false);
    setupOptions(setup.options);
    
    wrapper.css('display', 'flex').show();
    showInteraction();
}

function pushMessage(emitter, content, response, answer){
    let message = `<div class="message ${answer ? 'answer' : ''}">
        <img src="./media/${answer ? 'answer_icon.svg' : 'message_icon.svg'}">
        <div>
            <span class="emitter">${emitter}</span>
            <p class="">${content}</p>
        </div>
    </div>`

    chat.append(message);

    let messageHeight = $('.interaction-menu-wrapper .message:last-child').outerHeight(true);
    $('.interaction-menu-wrapper .message:last-child').css('display', 'none');
    $('.interaction-menu-wrapper .message').css('transition', 'transform 0.5s ease').css('transform', `translateY(-${messageHeight}px)`);
    
    
    setTimeout(() => {
        $('.interaction-menu-wrapper .message').css('transition', 'none').css('transform', `translateY(0px)`);
        $('.interaction-menu-wrapper .message:last-child').css('display', 'flex');
        checkMaxMessages()
        setTimeout(() => {
            $('.interaction-menu-wrapper .message').css('transition', 'transform 0.5s ease');
            if (answer) {
                pushResponse(response);
            }
        }, 2000);
    }, 500);
}

function pushResponse(content){
    let message = `<div class="message">
        <img src="./media/message_icon.svg">
        <div>
            <span class="emitter">${npcName.text()}</span>
            <div class="writing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>`
    
    chat.append(message);

    let messageHeight = $('.interaction-menu-wrapper .message:last-child').outerHeight(true);
    $('.interaction-menu-wrapper .message:last-child').css('display', 'none');
    $('.interaction-menu-wrapper .message').css('transform', `translateY(-${messageHeight}px)`);


    let timeWriting = content.length * 30;
    timeWriting < 1000 ? timeWriting = 1000 : "";

    setTimeout(() => {
        $('.interaction-menu-wrapper .message').css('transition', 'none').css('transform', `translateY(0px)`);
        $('.interaction-menu-wrapper .message:last-child').css('display', 'flex');
        setTimeout(() => {
            $('.interaction-menu-wrapper .message').css('transition', 'transform 0.5s ease');
            $('.interaction-menu-wrapper .message').css('transform', `translateY(${messageHeight}px)`);
            setTimeout(() => {
                $('.interaction-menu-wrapper .message:last-child').remove();
                $('.interaction-menu-wrapper .message').css('transition', 'none').css('transform', `translateY(0px)`);
                pushMessage(npcName.text(), content);
            }, 500);
        }, timeWriting);
    }, 500);

}

function setupOptions(newOptions){
    if (newOptions.length <= 4) {
        let option = $('.interaction-menu-wrapper .option');
        let parentWidth = $('.interaction-menu-wrapper .option p').parent().outerWidth(true);

        // Reset
        $('.interaction-menu-wrapper .options').removeClass('three');
        option.css('display', 'flex');

        // Hide options text
        $('.interaction-menu-wrapper .option p').css('transform', 'translateX(-' + parentWidth * 1.5 + 'px)');
        // Replace options text. If there is no option, create it
        for (let i = 0; i < newOptions.length; i++) {
            if(option[i] != undefined){
                option[i].querySelector('p').textContent = newOptions[i].option;
            } else {
                let newOption = `<div class="option" data-id="${i+1}"><p>${newOptions[i].option}</p></div>`;
                $('.interaction-menu-wrapper .options').append(newOption);
                $('.interaction-menu-wrapper .option:last-child').css('transition', 'none').css('opacity', '0');
            }
        }

        // Animate .chat and .options movement before removing or adding options
        let optionHeight = $('.interaction-menu-wrapper .option').outerHeight(true);
        let toTop = false
        if(option.length >= 3 && newOptions.length <= 2){
            $('.interaction-menu-wrapper .chat').css('transition', 'all 0.5s ease').css('transform', `translateY(${optionHeight}px)`);
            $('.interaction-menu-wrapper .options').removeClass('three').css('transition', 'all 0.5s ease').css('transform', `translateY(${optionHeight}px)`);
            toTop = true;
        } else if(option.length <= 2 && newOptions.length >= 3){
            $('.interaction-menu-wrapper .chat').css('transition', 'none').css('transform', `translateY(${optionHeight}px)`);
            $('.interaction-menu-wrapper .options').removeClass('three').css('transition', 'none').css('transform', `translateY(${optionHeight}px)`);
            toTop = false;
        }

        // Animations adjustments
        for (let i = 3; i >= newOptions.length; i--) {
            $(option[i]).css('transition', 'all 0.5s ease').css('opacity', '0');
        }
        if(newOptions.length == 1){
            $(option[0]).css('transition', 'all 0.5s ease').css('width', '200%').css('transform', 'translateX(25%)');
        }
        if(option.length == 1 && newOptions.length > 1){
            $(option[0]).css('transition', 'all 0.5s ease').css('width', '300px').css('transform', 'translateX(0%)');
        }
        if(newOptions.length == 3){
            $(option[2]).css('transition', 'all 0.5s ease').css('width', '200%').css('transform', 'translateX(25%)');
        }
        if(newOptions.length == 4 && option.length == 3){
            $(option[2]).css('transition', 'all 0.5s ease').css('width', '100%').css('transform', 'translateX(0%)');
        }


        setTimeout(() => {
            // Reset opacity with transition
            $('.interaction-menu-wrapper .option').css('transition', 'opacity 0.5s ease').css('opacity', '1').css('pointer-events', 'all');
            if(newOptions.length == 1){
                $(option[1]).css('transition', 'none').css('opacity', '0').css('pointer-events', 'none');
            }
            if(!toTop){
                $('.interaction-menu-wrapper .chat').css('transition', 'all 0.5s ease').css('transform', 'translateY(0)');
                $('.interaction-menu-wrapper .options').css('transition', 'all 0.5s ease').css('transform', 'translateY(0)');
            }
            // Reset transform with transition
            $('.interaction-menu-wrapper .option p').css('transition', 'all 0.5s ease').css('transform', 'translateX(0)');
            // Reset chat transform
            if(toTop){
                $('.interaction-menu-wrapper .chat').css('transition', 'none').css('transform', 'translateY(0)');
                $('.interaction-menu-wrapper .options').css('transition', 'none').css('transform', 'translateY(0)');
            }
            if(newOptions.length == 4 && option.length == 3){
                $(option[2]).css('transition', 'none').css('width', '100%').css('transform', 'translateX(0)')
            }
            if(newOptions.length == 3){
                $('.interaction-menu-wrapper .options').addClass('three');
                $('.interaction-menu-wrapper .option')[2].style.width = '100%';
                $('.interaction-menu-wrapper .option')[2].style.transform = 'translateX(0)';
            }
            for (let i = 3; i >= newOptions.length; i--) {
                if(i != 1){
                    $(option[i]).remove();
                }
            }
            setTimeout(() => {
                $('.interaction-menu-wrapper .option').css('transition', 'all 0.5s ease');
            }, 500);
        }, 500);
        answering = false;
    }
}

function hideInteraction(){
    $('.interaction-menu-wrapper .chat').css('transition', 'transform 0.5s ease').css('transform', `translateY(200%)`);
    borders.fadeOut(500);
    setTimeout(() => {
        $('.interaction-menu-wrapper .options').css('transition', 'transform 0.5s ease').css('transform', `translateY(200%)`);
        $('.interaction-menu-wrapper .card').css('transition', 'transform 0.5s ease').css('transform', `translateY(-300%)`);
    }, 500);
}

function showInteraction(){
    $('.interaction-menu-wrapper .options').css('transition', 'transform 0.5s ease').css('transform', `translateY(0)`);
    $('.interaction-menu-wrapper .card').css('transition', 'transform 0.5s ease').css('transform', `translateY(0)`);
    borders.fadeIn(500);
    setTimeout(() => {
        $('.interaction-menu-wrapper .chat').css('transition', 'transform 0.5s ease').css('transform', `translateY(0)`);
    }, 500);
}

function resetInteraction(){
    $('.interaction-menu-wrapper .message').remove();
    $('.interaction-menu-wrapper .options').removeClass('three');
    // clear div options
    actualOptions = null;
    concatOptions = null;
    concatenedId = null;
}

function checkMaxMessages(){
    let messages = $('.interaction-menu-wrapper .message');

    // make 4th message opacity 0.5 and remove it after 4th message
    if (messages.length > 4) {
        $('.interaction-menu-wrapper .message:nth-child(1)').css('transition', 'opacity 0.5s ease').css('opacity', '0');
        $('.interaction-menu-wrapper .message:nth-child(2)').css('transition', 'opacity 0.5s ease').css('opacity', '0.5');
        if (messages.length > 5) {
            setTimeout(() => {
                $('.interaction-menu-wrapper .message:nth-child(1)').remove();
            }, 500);
        }
    }
}


Events.Subscribe('Interaction:Open', (setup) => {
    resetInteraction();
    setTimeout(() => {
        initInteraction(setup);
    }, 500);
});

Events.Subscribe('Interaction:Close', () => {
    hideInteraction();
    setTimeout(() => {
        resetInteraction();
    }, 500);
});

/* 
SETUP EXAMPLE (LUA Table)

local interactionSetup = {
        npc = {
            name = "NPC Name",
            info = "NPC Info",
            avatar = "img.png" -- Isn't path requited because js concat it with the path (./media/). [FOR NOW]
        },
        openMessage = "This is the first message",
        options = {
            {
                option = "Option 1",
                response = "This is the response for option 1",
                close = false,
                fnc = function(id)
                    Client.SendChatMessage("Option 1 test"..id)
                end,
                options = {
                    {
                        option = "Option 1.1",
                        close = true,
                        fnc = function(id)
                            Client.SendChatMessage("test 2"..id)
                        end,
                    },
                    {
                        option = "Option 1.2",
                        response = "This is the response for option 1.2",
                        close = false,
                        options = {
                            {
                                option = "Option 1.2.1",
                                close = true
                            },
                            {
                                option = "Option 1.2.2",
                                close = true
                            },
                            {
                                option = "Option 1.2.3",
                                response = "This is the response for option 1.1.3",
                                options = {
                                    {
                                        option = "Option 1.2.3.1",
                                        close = true
                                    },
                                    {
                                        option = "Option 1.2.3.2",
                                        close = true
                                    },
                                    {
                                        option = "Option 1.2.3.3",
                                        close = true
                                    },
                                    {
                                        option = "Option 1.2.3.4",
                                        response = "This is the response for option 1.2.3.4",
                                        options = {
                                            {
                                                option = "Option 1.2.3.4.1",
                                                close = true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                option = "Option 2",
                close = true
            },
            {
                option = "Option 3",
                close = true
            },
            {
                option = "Option 4",
                fnc = function(id)
                    Client.SendChatMessage("test 4"..id)
                end,
            }
        }
    }


-- Debuging by chat
Client.Subscribe('Chat', function(text, player)
    local interactionSetup = {
        npc = {
            name = "NPC Name",
            info = "NPC Info",
            avatar = "img.png" -- Isn't path requited because js concat it with the path (./media/). [FOR NOW]
        },
        openMessage = "This is the first message",
        options = {
            {
                option = "Option 1",
                response = "This is the response for option 1",
                close = false,
                fnc = function(id)
                    Client.SendChatMessage("Option 1 test"..id)
                end,
                options = {
                    {
                        option = "Option 1.1",
                        close = true,
                        fnc = function(id)
                            Client.SendChatMessage("test 2"..id)
                        end,
                    },
                    {
                        option = "Option 1.2",
                        response = "This is the response for option 1.2",
                        close = false,
                        options = {
                            {
                                option = "Option 1.2.1",
                                close = true
                            },
                            {
                                option = "Option 1.2.2",
                                close = true
                            },
                            {
                                option = "Option 1.2.3",
                                response = "This is the response for option 1.1.3",
                                options = {
                                    {
                                        option = "Option 1.2.3.1",
                                        close = true
                                    },
                                    {
                                        option = "Option 1.2.3.2",
                                        close = true
                                    },
                                    {
                                        option = "Option 1.2.3.3",
                                        close = true
                                    },
                                    {
                                        option = "Option 1.2.3.4",
                                        response = "This is the response for option 1.2.3.4",
                                        options = {
                                            {
                                                option = "Option 1.2.3.4.1",
                                                close = true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                option = "Option 2",
                close = true
            },
            {
                option = "Option 3",
                close = true
            },
            {
                option = "Option 4",
                fnc = function(id)
                    Client.SendChatMessage("test 4"..id)
                end,
            }
        }
    }
    if text == '/in' then
        Core.OpenInteraction(interactionSetup)
    end
    return true
end)

*/