UiStack = {}
UiStackReg = {}

Client.Subscribe("AttemptOpenInGameMenu", function()
    if #UiStack > 0 then
        Core.HUDList[UiStack[#UiStack]].Hide()
        return false
    end
end)


function CreateHUDElement(name, location, closeEvent)
    local self = {}

    self.name = name
    self.location = location
    self.closeEvent = closeEvent

    self.mouseEnabled = false
    self.inputEnabled = true

    self.hud = WebUI(name, location)

    self.callbacks = {}
    
    function self.RemoveHUD()
        self.hud:Destroy()

        self.Hide()

        Core.HUDList[name] = nil
    end

    function self.Hide()
        if self.mouseEnabled == true or self.inputEnabled == false then
            self.mouseEnabled = false
            self.inputEnabled = true

            Input.SetMouseEnabled(self.mouseEnabled)
            Input.SetInputEnabled(self.inputEnabled)
        end

        -- Delete from stack
        if UiStackReg[self.name] then
            for k, v in ipairs(UiStack) do
                if v == self.name then
                    table.remove(UiStack, k)
                    break
                end
            end
            UiStackReg[self.name] = nil
        end

        print('close event => ', self.closeEvent)
        if self.closeEvent then
            self.Call(self.closeEvent)
        end
    end

    function self.SubscribeCallback(event, onCallback)
        self.callbacks[event] = onCallback
    end

    function self.Subscribe(event, func)
        self.hud:Subscribe(event, func)
    end

    function self.Call(event, ...)
        self.hud:CallEvent(event, ...)
    end

    function self.Focus(enableMouse, enableInput)
        self.hud:BringToFront()
        
        if enableMouse == nil and enableInput == nil then
            return
        end

        if enableMouse == nil then
            enableMouse = false
        end

        if enableInput == nil then
            enableInput = true
        end

        self.mouseEnabled = enableMouse
        self.inputEnabled = enableInput

        -- Move the ui to the top of the stack
        if UiStackReg[self.name] then
            for k, v in ipairs(UiStack) do
                if v == self.name then
                    table.remove(UiStack, k)
                    break
                end
            end
            UiStackReg[self.name] = nil
        end

        if self.mouseEnabled then            
            UiStackReg[self.name] = true
            UiStack[#UiStack + 1] = self.name
        end


        Input.SetMouseEnabled(enableMouse)
        Input.SetInputEnabled(enableInput)
    end

    Core.HUDList[name] = self

    self.Subscribe("EventCallback", function(event, data)
        if not self.callbacks[event] then
            return Console.Error(("Attempt to use callback (%s) but SubscribeCallback not called!"):format(event))
        end
        
        local cb = function(_data)
            self.Call("EventCallback:" .. data.callbackId, event, _data)
        end
    
        self.callbacks[event](data, cb)
    end)

    return self
end

