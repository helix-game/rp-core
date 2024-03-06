Core.HUDList = {}


UiStack = {}
UiStackReg = {}

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


Client.Subscribe("AttemptOpenInGameMenu", function()
    if #UiStack > 0 then
        Core.HUDList[UiStack[#UiStack]].Hide()
        return false
    end
end)


-- Package.Require('/Client/utils/MessagePack.lua')
-- Package.Require('/Client/utils/Promises.lua')
-- Package.Require('/Client/utils/Threading.lua')

Package.Require('/Client/Functions.lua')
Package.Require('/Client/modules/Menus.lua')
Package.Require('/Client/modules/Multichar.lua')
Package.Require('/Client/modules/Interaction.lua')
Package.Require('/Client/modules/Notifications.lua')
-- Package.Require('/Client/modules/Jobs.lua')
Package.Require('/Client/modules/JobLevels.lua')
Package.Require('/Client/modules/Inventory.lua')
Package.Require('/Client/modules/HUD.lua')
Package.Require('/Client/modules/Tags.lua')
Package.Require('/Client/modules/SpawnMenu.lua')
Package.Require('/Client/modules/VehicleHUD.lua')


Package.Require('/Client/classes/C_Markers.lua')
Package.Require('/Client/classes/C_Camera.lua')

-- Package.Require('/Client/modules/jobs/TaxiJob.lua')

Package.Require('/Client/modules/activities/GasStation.lua')

Package.Require('/Client/modules/SkillTree.lua')

-- Core.RegisterInput('E', function(key)
--     if not Core.PlayerData.CurrentMarker then
--         return
--     end
--     if Core.PlayerData.CurrentMarker.name ~= 'fuel_pump' then return end
-- end)

Core.RegisterInput('Q', function(key)
    local menusOpened = Core.GetMenusOpened()
    if not menusOpened then return end

    for k, v in pairs(menusOpened) do
        local HUD = Core.GetHUD(k)
        HUD.Call(v.closeEvent)
        HUD.Focus(false, true)
        Core.MenusOpened[k] = {}
    end
end)


--- @brief Event to close all menus (created to close menus that open UI's or menus that open menus)
Events.Subscribe("CloseAllMenus", function ()
    local menusOpened = Core.GetMenusOpened()
    if not menusOpened then return end

    for k, v in pairs(menusOpened) do
        local HUD = Core.GetHUD(k)
        HUD.Call(v.closeEvent)
        HUD.Focus(false, true)

        Core.MenusOpened[k] = {}
    end
end)


Core.RegisterInput('LeftControl', function(key)
    if not Core.PlayerData.insideVehicle then return end
    local vehicle = Core.PlayerData.insideVehicle
    if vehicle:GetValue('running') then return end

    Events.CallRemote("core:onVehicleEngineStart", vehicle)
    Core.RemoveInteraction("LeftControl")

end)

Events.Subscribe("Core:VehicleCreated", function(_, vehiclesSpawned)
    Core.VehiclesSpawned = vehiclesSpawned;
end)


-- Core.RegisterInput('X', function(key)
--     if next(Core.IsMenuOpened('action')) then return end

--     Core.OpenActionMenu(function(data, menu)
--         menu.close()
--     end, function(menu)
--         menu.close()
--     end)
-- end)


Player.Subscribe("VOIP", function(self, is_talking)
    local HUD = Core.GetHUD('main')
    HUD.Call('helix-hud:UpdateVOIP', 'voip', is_talking)
end)

--[[
Character.Subscribe("EnterVehicle", function(self, vehicle, seat_index)
    local charPly = self:GetPlayer()

    if charPly == nil then return end

    if (charPly:GetAccountID() ~= Client.GetLocalPlayer():GetAccountID()) then
        return
    end

    if seat_index ~= 0 then
		return
	end
    
    Core.AddInteraction("LeftControl", "START ENGINE", true, 500)
    Core.ToggleSpeedometer(true)
end)

Character.Subscribe("LeaveVehicle", function(self, vehicle)
    local charPly = self:GetPlayer()

    if charPly == nil then return end

    if (charPly:GetAccountID() ~= Client.GetLocalPlayer():GetAccountID()) then
        return
    end

    Chat.AddMessage("Left Vehicle")
    Core.RemoveInteraction("LeftControl")
    
    Core.ToggleSpeedometer(false)
end)
]]

HELIXCharacter.Subscribe("EnterVehicle", function(self, vehicle, seat_index)
    local charPly = self:GetPlayer()

    if charPly == nil then return end

    if (charPly:GetAccountID() ~= Client.GetLocalPlayer():GetAccountID()) then
        return
    end

    if seat_index ~= 0 then
        return
    end
    
    -- Core.AddInteraction("LeftControl", "START ENGINE", true, 500)
    Core.ToggleSpeedometer(true)
end)

HELIXCharacter.Subscribe("LeaveVehicle", function(self, vehicle)
    local charPly = self:GetPlayer()

    if charPly == nil then return end

    if (charPly:GetAccountID() ~= Client.GetLocalPlayer():GetAccountID()) then
        return
    end

    Chat.AddMessage("Left Vehicle")
    Core.RemoveInteraction("LeftControl")
    
    Core.ToggleSpeedometer(false)
end)

Character.Subscribe("HealthChange", function(self, old_health, new_health)
    local charPly = self:GetPlayer()

    if charPly == nil then return end

    if (charPly:GetAccountID() ~= Client.GetLocalPlayer():GetAccountID()) then
        return
    end


    local char = charPly:GetControlledCharacter()

    local maxHealth = char:GetMaxHealth()

    print(new_health, maxHealth)
    
    local stat = {
        health = { value = new_health, max = maxHealth }
    }
    
    HUD.Call('helix-hud:UpdateStatus', stat)
    -- HealthChange was called
end)

Client.Subscribe("SpawnLocalPlayer", function(local_player)
    local_player:Subscribe('ValueChange', function(local_player, key, value)
        if key == 'playerData' then
            Core.PlayerData = value
            for k, v in pairs(Core.Markers) do
                if v.onUpdate then
                    v.onUpdate()
                end
            end
        end
    end)
end)

Character.Subscribe("HealthChange", function(self, old_health, new_health)
    print('Health change')
    print(self, old_health, new_health)

	-- HealthChange was called
    InventoryHUD.Call('StatusUpdate', { status = { name = 'health', value = new_health, colour = '#FF5555' } })
end)

local DEBUG_COORDS = Canvas(
  true,
  Color.TRANSPARENT,
  0,
  true
)

-- Subscribes for Update, we can only Draw inside this event
DEBUG_COORDS:Subscribe("Update", function(self, width, height)
    -- print(Core.PlayerData.character)
    -- local player = Core.PlayerData.character:GetLocation()
    local player = Client.GetLocalPlayer()
    if not player then return end
    player = player:GetCameraLocation()

    local str = "X = " .. player.X .. ", Y = " .. player.Y .. ", Z = " .. player.Z
    -- Draws a Text in the middle of the screen
    self:DrawText(str, Vector2D(width * 0.5, height * 0.15))
end)

-- Forces the canvas to repaint, this will make it trigger the Update event
--[[ s ]]


local HUD = Core.GetHUD('main')
local InventoryHUD = Core.GetHUD('inventory')
Events.SubscribeRemote("core:onStatusTick", function(stats)
    if not Core.PlayerData then
        Core.PlayerData = {}
    end
    
    Core.PlayerData.stats = stats

    for k, v in ipairs(stats) do
        if (v.name == 'hunger' or v.name == 'thirst') and v.value <= 100 then
            -- Client.GetLocalPlayer():GetControlledCharacter():ApplyDamage(10)
        end

        -- InventoryHUD.Call('StatusUpdate', { status = { name = v.name, value = v.value, colour = '#ffffff' } })
    end

    
    HUD.Call('helix-hud:UpdateStatus', stats)
end)


Events.SubscribeRemote('ClientFromServerTriggerCallback', function(name, ...)
    if Core.ServerCallbacks[name] == nil then
        return
    end

    if type(Core.ServerCallbacks[name]) == 'function' then
        Core.ServerCallbacks[name](...)
    else
        Core.ServerCallbacks[name]:resolve(...)
    end

    Core.ServerCallbacks[name] = nil
end)

Events.SubscribeRemote('InitialiseMarkers', function(markerTbl)
    for k, v in pairs(markerTbl) do
        if Core.Markers[k] then
            Core.Markers[k].marker = v.marker
        else
            Core.Markers[k] = { marker = v.marker }
        end
    end
end)

Events.SubscribeRemote('ShowNotification', function(msg, duration, ...)
    Core.ShowNotification(msg, duration)
end)

Events.SubscribeRemote('core:onEnterMarker', function(marker, dist, name)
    Core.Markers[name].onEnter(marker, dist)
end)

Events.SubscribeRemote('core:onLeaveMarker', function(marker, dist, name)
    if not Core.Markers[name].onExit then return end
    Core.Markers[name].onExit(marker, dist)
end)

Events.SubscribeRemote("Client:BlurScreen", function(state)
    Core.BlurScreen(state)
end)

-- Blurring System
Core.BlurObject = StaticMesh(Vector(-1204.9000244141, 903.40002441406, 0.0), Rotator(0, 0, 0), "helix::SM_Cube", 2)
Core.BlurObject:SetMaterial("core-assets::M_BlurScreen", -1)
Core.BlurObject:SetMaterialScalarParameter("BlurAmount", 0.01)
Core.BlurObject:SetVisibility(false)

Client.Subscribe("Tick", function(delta_time)
    if not Core then return end

    if Core.ScreenBlurred and Core.BlurObject then
        local viewport_2D_center = Viewport.GetViewportSize() / 2
        local viewport_3D = Viewport.DeprojectScreenToWorld(viewport_2D_center)
        local start_location = viewport_3D.Position
    
        local end_location = (viewport_3D.Position + viewport_3D.Direction * 68.0)
        
        local rotation = viewport_3D.Direction:Rotation()
        
        Core.BlurObject:SetLocation(end_location)
        Core.BlurObject:SetRotation(rotation)
    end
end)

Events.SubscribeRemote("pcrp-core:HideHUD", function()
    Core.CloseInventory()
    Core.HideHUD()
end)