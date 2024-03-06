function Core.GetConfig()
    return CoreCFG -- Has to be CoreCFG to avoid beign overwritten
end

function Core.RegisterHUD(name, location, closeEvent)
    return CreateHUDElement(name, location, closeEvent)
end

function Core.GetHUD(name)
    return Core.HUDList[name]
end

function Core.PlayAnimation(anim, slot_flag, loop, blend_in_time, blend_out_time, play_rate, stop_all_montages)
    Events.CallRemote('pcrp-core:PlayAnimation', anim, slot_flag, loop, blend_in_time, blend_out_time, play_rate, stop_all_montages)
end

function Core.StopAnimation(anim)
    Events.CallRemote('pcrp-core:StopAnimation', anim)
end

local PromptHUD = Core.RegisterHUD('prompt', 'file://ui/modules/prompt/prompt.html')


PromptHUD.Subscribe('interaction:completed', function(key)
    if not Core.Interactions[key] then return end
    for k, v in ipairs(Core.RegisteredKeys[key]) do
        v.onPress(key)
    end
end)

function Core.RegisterInput(key, onPress, onRelease)
    if not Core.RegisteredKeys[key] then
        Core.RegisteredKeys[key] = {}
    end

    local idx = #Core.RegisteredKeys[key] + 1
    Core.RegisteredKeys[key][idx] = { onPress = onPress, onRelease = onRelease, index = idx }

    Input.Register("interaction:" .. key, key)
    Input.Bind("interaction:" .. key, InputEvent.Pressed, function()
        Core.ButtonsPressed[key] = true
        if Core.Interactions[key] then
            PromptHUD.Call("interaction:PressedKey", key)
        else
            for k, v in ipairs(Core.RegisteredKeys[key]) do
                v.onPress(key)
            end
        end
    end)
    
    Input.Bind("interaction:" .. key, InputEvent.Released, function()
        Core.ButtonsPressed[key] = false
        if Core.Interactions[key] then
            PromptHUD.Call("interaction:ReleasedKey", key)
        else
            for k, v in ipairs(Core.RegisteredKeys[key]) do
                if v.onRelease then
                    v.onRelease(key)
                end
            end
        end
    end)
end

function Core.HideHUD()
    Core.VisibleHUD = false
    
    -- HUDCanvas:SetVisible(false)
    Chat.SetVisibility(false)

    local HUD = Core.GetHUD('main')
    HUD.Call('helix-hud:ToggleHUD', false)
end

function Core.ShowHUD()
    Core.VisibleHUD = true
    -- HUDCanvas:SetVisible(true)
    Chat.SetVisibility(true)
        
    local HUD = Core.GetHUD('main')
    HUD.Call('helix-hud:ToggleHUD', true)
end

function Core.BlurScreen(bool, ms)
    if Core.ScreenBlurred == bool then return end
    Core.ScreenBlurred = bool

    Core.BlurObject:SetVisibility(bool)
    Core.BlurObject:SetMaterialScalarParameter("BlurAmount", (bool and 0.02) or 0.0)
    -- if Core.ScreenBlurred then
    --     local blurAmount = 0.0
    --     Core.BlurObject:SetVisibility(bool)
    --     Core.BlurObject:SetMaterialScalarParameter("BlurAmount", blurAmount)
    --     local blurInterval = Timer.SetInterval(function()
    --         if blurAmount > 0.02 then
    --             return Timer.ClearInterval(blurInterval)
    --         end
    --         Core.BlurObject:SetMaterialScalarParameter("BlurAmount", blurAmount)
    --         blurAmount = blurAmount + 0.001
    --     end, ms or 2)
    -- else
    --     local blurAmount = 0.02
    --     Core.BlurObject:SetMaterialScalarParameter("BlurAmount", blurAmount)
    --     local blurInterval = Timer.SetInterval(function()
    --         if blurAmount < 0.0 then
    --             Core.BlurObject:SetVisibility(bool)
    --             return Timer.ClearInterval(blurInterval)
    --         end
    --         Core.BlurObject:SetMaterialScalarParameter("BlurAmount", blurAmount)
    --         blurAmount = blurAmount - 0.001
    --     end, ms or 2)
    -- end
end

function Core.OpenActionMenu(onClick, onCancel)
    local initElements = {}
    local categories = {}

    for k, v in pairs(Core.ActionMenu) do
        if v.category then
            categories[v.category] = true
            if v.category == 'home' then
                table.insert(initElements, v.element)
            end
        end
    end

    Core.OpenMenu('action', {
        elements = initElements,
        categories = categories,
    }, onClick, onCancel)
end

function Core.ShowNotification(message, title, type, duration)
    if not message then return end

    local NotificationHUD = Core.GetHUD('main')
    local notifTitle = title or 'info'
    local notifType = type or 'info'

    if NotificationSounds[notifType] then
        NotificationSounds[notifType]:Play()
    end

    NotificationHUD.Call('helix-hud:ShowNotification', { type = notifType, text = message, title = notifTitle })
end

function Core.AddInteraction(key, text, hold, duration)
    Core.Interactions[key] = true
    if not hold and not duration then
        duration = 100
    elseif hold and not duration then
        duration = 1500
    end
    PromptHUD.Call("interaction:AddInteraction", key, text, hold, duration)
end

function Core.RemoveInteraction(key)
    Core.Interactions[key] = nil
    PromptHUD.Call("interaction:RemoveInteraction", key)
end

function Core.ScreenFadeOut(ms)
    local player = Core.PlayerData.player
    local time = ms
    local fadeInAmount = 0.0
    local increment = 100 / ms

    local timer = Timer.SetInterval(function()
        player:SetManualCameraFade(fadeInAmount, Color(0, 0, 0, 1), false)
        time = time - 1
        fadeInAmount = fadeInAmount + increment
    end, 1)

    Timer.SetTimeout(function()
        Timer.ClearInterval(timer)
    end, ms)
end

function Core.ScreenFadeIn(ms)
    local player = Core.PlayerData.player
    local time = ms
    local fadeInAmount = 1.0
    local decrement = 100 / ms

    local timer = Timer.SetInterval(function()
        player:SetManualCameraFade(fadeInAmount, Color(0, 0, 0, 1), false)
        time = time - 1
        fadeInAmount = fadeInAmount - decrement
    end, 1)

    Timer.SetTimeout(function()
        Timer.ClearInterval(timer)
    end, ms)
end

-- function Core.TriggerCallback(name, cb, ...)
--     local p
--     local arg

--     if type(cb) == 'function' then
--         arg = { ... }
--         Core.ServerCallbacks[name] = cb
--     else
--         p = promise.new()
--         arg = { cb, ... }

--         Core.ServerCallbacks[name] = p
--     end

--     Events.CallRemote('ServerTriggerCallback', name, table.unpack(arg))
    
--     if p ~= nil then
--         Await(p)
--         return p.value
--     end
-- end


-- function Core.TriggerCallback(name, cb, ...)
--     local p
--     local arg

--     if type(cb) == 'function' then
--         arg = { ... }
--         Core.ServerCallbacks[name] = cb
--     else
--         p = promise.new()
--         arg = { cb, ... }

--         Core.ServerCallbacks[name] = p
--     end

--     Events.CallRemote('ServerTriggerCallback', name, table.unpack(arg))
-- end

function Core.TriggerCallback(name, cb, ...)
    local p
    local arg

    if type(cb) == 'function' then
        arg = { ... }
        Core.ServerCallbacks[name] = cb
    else
        p = promise.new()
        arg = { cb, ... }

        Core.ServerCallbacks[name] = p
    end

    Events.CallRemote('ServerTriggerCallback', name, table.unpack(arg))
    
    if p ~= nil then
        Await(p)

        return p.value
    end
    
end

function Core.CreateMarker(obj)
    if obj.coords == nil or type(obj.coords) ~= 'table' then
        return print("CREATE MARKER FAILED, No coords given")
    end

    return CreatePoint(obj)
end

function Core.LinkMarker(name, onEnter, onExit, onUpdate)
    if not Core.Markers[name] then
        Core.Markers[name] = {}
    end
    Core.Markers[name].onEnter = onEnter
    Core.Markers[name].onExit = onExit
    Core.Markers[name].onUpdate = onUpdate
end

local current_prog_id = nil
local current_prog_canceled = false
local current_prog_disabled = nil

function Core.ProgressBar(obj)
    local mainHUD = Core.GetHUD('main');
    local duration = obj.duration or 5000
    local _duration = duration
    local label = obj.label
    
    local progress = 0

    current_prog_disabled = obj.disable

    mainHUD.Call('progressbar:ShowProgress', label)

    current_prog_canceled = false
    current_prog_id = Timer.SetInterval(function()
        if duration <= 0 then
            -- Prog complete
            Timer.ClearInterval(current_prog_id)
            current_prog_id = nil
            current_prog_disabled = nil
            
            Timer.SetTimeout(function()
                mainHUD.Call('progressbar:HideProgress')
            end, 500)
            
            obj.onFinish(false)
        elseif current_prog_canceled then
            -- Prog canceled
            Timer.SetTimeout(function()
                mainHUD.Call('progressbar:HideProgress')
            end, 500)
            
            Timer.ClearInterval(current_prog_id)
            current_prog_id = nil
            current_prog_disabled = nil

            obj.onFinish(true)
        else
            progress = progress + 1
            duration = duration - 1
            mainHUD.Call('progressbar:UpdateProgress', (progress / _duration) * 100)
        end
    end, 1)
end

Input.Register("CancelProgress", "BackSpace")
Input.Bind("CancelProgress", InputEvent.Pressed, function()
    if (current_prog_id == nil) then return end
    
    current_prog_canceled = true

    local mainHUD = Core.GetHUD('main');
    mainHUD.Call('progressbar:CancelProgress')  
end)

MovementKeys = {
    ['W'] = true,
    ['A'] = true,
    ['S'] = true,
    ['D'] = true,
    ['Space'] = true,
    ['LeftControl'] = true,
    ['Z'] = true
}

Input.Subscribe("KeyDown", function(key_name, delta)
    if current_prog_id == nil then return end
    if current_prog_disabled == nil then return end

    if current_prog_disabled.movement then
        if MovementKeys[key_name] then
            return false
        end
    end

end)

function Core.GetNearestVehicle()
	local coords = Core.PlayerData.character:GetLocation()
	local closestDist, closestVeh = nil


    if Core.PlayerData.insideVehicle then return Core.PlayerData.insideVehicle, 0.0 end
    if Vehicle.GetCount() == 0 then return closestVeh, closestDist end

    local vehicles = Vehicle.GetPairs()

	for k, v in ipairs(vehicles) do
		local vehCoords = v:GetLocation()
		local vehDist = coords:Distance(vehCoords)

		if not closestDist or vehDist < closestDist then
			closestDist = vehDist
			closestVeh = v
		end
	end

	return closestVeh, closestDist
end

function Core.GetClosestPlayer()
    local coords = Core.PlayerData.character:GetLocation()
    local closestDist, closestPlayer = nil

    if Player.GetCount() == 1 then return closestPlayer, closestDist end

    local players = Player.GetPairs()

    for k, v in ipairs(players) do
        local plyCoords = v:GetLocation()
        local plyDist = coords:Distance(plyCoords)

        if not closestDist or plyDist < closestDist then
            closestDist = plyDist
            closestPlayer = v
        end
    end

    return closestPlayer, closestDist
end

function Core.IsPlayerInAnyVehicle()
	return Core.PlayerData.insideVehicle ~= nil
end

-- @brief Function to open an interaction menu with a specific setup.
-- @param setup: The setup to use for the interaction menu. Setup example in "/interaction-menu.js".
function Core.OpenInteraction(setup)
    local InteractionHUD = Core.GetHUD('interaction');
    
    InteractionHUD.Focus(true, false)
    InteractionHUD.Call("Interaction:Open", setup)
    
    Core.InteractionSetup = setup
end

function Core.CloseInteraction()
    local InteractionHUD = Core.GetHUD('interaction');
    
    InteractionHUD.Focus(false, true)
    InteractionHUD.Call("Interaction:Close")
    print('close interaction')
    Core.InteractionSetup = nil
end