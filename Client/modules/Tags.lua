local friends = {}

Timer.SetInterval(function ()
    local player = Client.GetLocalPlayer()
    Events.CallRemote('Nametags::GetAllFriends')
end, 10000)

Chat.Subscribe("PlayerSubmit", function (text, player)
    if text == "add" then
        local nearestPlayer = GetNearestPlayer()

        if nearestPlayer == "none" then Client.SendChatMessage('no player nearby') return end

        Events.CallRemote("CreateFriendRequest", nearestPlayer)
    end

    return true
end)

Events.SubscribeRemote("OpenConfirmMenu", function (player, target)
    local sender = player
    OpenRequestMenu(sender, target)
end)

function OpenRequestMenu(sender, target)
    local playerId = sender:GetID()
    Core.OpenMenu("confirm", {
        title = "Share your name",
        description = "Do you want to share your name with player "..playerId.."?",
    }, function(menu)
        Events.CallRemote("CreateNewFriend", sender, target)
        menu.close()
    end, function(menu)
        menu.close()
    end)
end

--- [{Events}] --- 


Chat.Subscribe("PlayerSubmit", function (text, player)
    if text == "set" then 
        SetDefaultNametags()
    end
    return true
end)

Events.SubscribeRemote('SetDefaultNametags', function() SetDefaultNametags() end)

function SetDefaultNametags()
    local allPlayers = Player.GetAll()
    local player = Client.GetLocalPlayer()
    for k, v in pairs(allPlayers) do
        if v ~= player then
            local character = v:GetControlledCharacter()
            SetNameTag(character)
        end
    end
end

Events.SubscribeRemote("SetNameTag", function (character, name)
    SetNameTag(character, name)
end)

-- Function to add a Nametag to a Player
function SetNameTag(character, name)
    if (character == nil) then return end
    local player = character:GetPlayer()

    RemoveUnknownNameTag(player, character)
    -- Removes the old Nametag, if any

    -- RemoveUnknownNameTag(player, character)

    local defaultName = 'Stranger #'..player:GetID()

    local playerName = name or defaultName
    -- Spawns the Nametag (TextRender)

    -- print('setting nametag for ' .. tostring(character) .. ' with name ' .. tostring(playerName))

    local nametag = TextRender(
        Vector(),               -- Any Location
        Rotator(),              -- Any Rotation
        playerName,       -- Player Name
        Vector(0.25, 0.25, 0.25),  -- 50% Scale
        Color(1, 1, 1),         -- White
        FontType.Roboto,        -- Roboto Font
        TextRenderAlignCamera.AlignCameraRotation -- Follow Camera Rotation
    )

    -- Attaches it to the character and saves it to the player's values
    nametag:AttachTo(character)
    nametag:SetRelativeLocation(Vector(0, 0, 120))
    nametag:SetTextSettings()

    player:SetValue("Nametag", nametag)
end

-- Function to remove a Nametag from  a Player
function RemoveUnknownNameTag(player, character)
    if (character == nil) then return end

    -- Gets the Nametag from the player, if any, and destroys it
    local text_render = player:GetValue("Nametag")
    if (text_render and text_render:IsValid()) then
        text_render:Destroy()
    end
end

function GetNearestPlayer()
    local player = Client.GetLocalPlayer()
    local my_char = player:GetControlledCharacter()
    local all = Player.GetAll()
    local minDin = 0
    local nearestPlayer = nil
    for k, v in pairs(all) do
        print('pase for')
        if v ~= player then
            print('soy distinto de mi mismo')
            local char = v:GetControlledCharacter()
            local playerCoords = my_char:GetLocation()
            local otherCoords = char:GetLocation()
            local distance = playerCoords:Distance(otherCoords)
            if distance < 500 then
                print('distancia es menor')
                print('asigno al primero mas cercano')
                minDin = distance
                nearestPlayer = v

                if distance < minDin then
                    print('asigno al mas cercano')
                    minDin = distance
                    nearestPlayer = v
                end
            end
        end
    end
    if nearestPlayer ~= nil then
        return nearestPlayer
    else
        return "none"
    end
end