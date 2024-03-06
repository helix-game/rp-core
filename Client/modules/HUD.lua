local HUD = Core.RegisterHUD('main', 'file://ui/modules/hud/hud.html')
local floor = math.floor
local directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" }
local lastDirection = nil

function getCompassDirection(degree)
    local index = floor(((degree % 360) / 45) + 0.5) % 8 + 1
    return directions[index]
end

Events.SubscribeRemote('core:UpdateAccountMoney', function(account, value)
    HUD.Call("helix-hud:UpdateAccountMoney", account, value)
end)

Events.SubscribeRemote('core:playerSpawned', function()
    HUD.Call("helix-hud:UpdatePlayers", Player.GetCount())
    HUD.Call("helix-hud:UpdateServerId", Core.PlayerData.player:GetID())
end)

-- Player joined server alerts all players when a new player joins
Events.SubscribeRemote('core:playerJoinedServer', function()
    HUD.Call("helix-hud:UpdatePlayers", Player.GetCount())
end)

Client.Subscribe("Tick", function(delta_time)
    if not Core then return end
    if not Core.PlayerData then return end

    if Core.PlayerData.character and Core.VisibleHUD then
        local yaw = Core.PlayerData.character:GetRotation().Yaw
        local direction = getCompassDirection(yaw)
        local player = Client.GetLocalPlayer()
        local char = player:GetControlledCharacter()

        if lastDirection ~= direction then
            lastDirection = direction
            HUD.Call("helix-hud:UpdateCompass", lastDirection)
        end

        if not char then return end
        local location       = char:GetLocation()
        local playerHeading  = char:GetRotation().Yaw
        local cameraRotation = player:GetCameraRotation().Yaw

        HUD.Call("helix-hud:UpdateMinimap", JSON.stringify({ x = location.X, y = location.Y }), playerHeading,
            cameraRotation)
    end
end)
