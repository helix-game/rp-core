--- [[Events]] --- 

Events.Subscribe("CreateFriendRequest", function (player, target)
    local sender = player
    print('This is sender: '..tostring(sender))
    print('This is target: '..tostring(target))

    Events.CallRemote("OpenConfirmMenu", target, sender, target)
end)

Events.SubscribeRemote("CreateNewFriend", function (player, sender, target)
    print('this should be sender '..tostring(sender))
    print('this should be target '..tostring(target))
    local id = target:GetID()
    local xTarget = Core.GetPlayerFromId(id)
    local name = xTarget.getName()

    local targetIdentifier = xTarget.identifier
    local targetPlayer = xTarget.player
    local targetname = name

    local xPlayer = Core.GetPlayerFromId(player:GetID())
    local myIdentifier = xPlayer.identifier
    local knownPeople = {}
    local result = nil

    if name == nil then
        Chat.SendMessage(player, "Unexpected error")
        return
    end

    local friends = DB:Select("SELECT * FROM users_knownpeople WHERE identifier = :0", myIdentifier)
    if friends[1] then
        for k, v in pairs(friends) do
            -- if tonumber(v.identifier) == myIdentifier then
                local resultKnow = JSON.parse(v.known)
                for _, p in pairs(resultKnow) do
                    if p.identifier == targetIdentifier then
                        Chat.SendMessage(player, "You already <red>know</> this person")
                        table.insert(knownPeople, {["name"] = p.name, ["id"] = p.identifier})
                        break
                    else
                        print('Updating Friend List for '..myIdentifier..'')

                        table.insert(knownPeople, {["name"] = targetname, ["identifier"] = targetIdentifier})
                        result = JSON.stringify(knownPeople)
                        DB:Execute("UPDATE users_knownpeople SET known = '"..result.."' WHERE identifier = '"..myIdentifier.."'")
                        Events.CallRemote("hlx-nametags:client:AttachNametag", player, targetPlayer, targetname)
                        break
                    end
                end
            -- end
        end
    else
        table.insert(knownPeople, {["name"] = targetname, ["identifier"] = targetIdentifier})
        result = JSON.stringify(knownPeople)
        DB:Execute("INSERT INTO users_knownpeople (identifier, known) VALUES ('"..myIdentifier.."', '"..result.."')")
        print('Creating Friend List for '..myIdentifier..'')
        Events.CallRemote("hlx-nametags:client:AttachNametag", player, targetPlayer, targetname)
        return
    end
end)

Events.SubscribeRemote("Nametags::GetAllFriends", function(player)
    local id = player:GetID()
    local xPlayer = Core.GetPlayerFromId(id)
    local identifier = xPlayer.identifier
    local friends = DB:Select("SELECT * FROM users_knownpeople WHERE identifier = :0", identifier)
    local allPlayers = Player.GetAll()

    for k, v in pairs(allPlayers) do
        if v ~= player then
            local character = v:GetControlledCharacter()
            local playerID = v:GetID()
            local xTarget = Core.GetPlayerFromId(playerID)
            local xTargetIdentifier = xTarget.identifier

            if next(friends) == nil then 
                print('setting default nametag for ' .. tostring(character))
                Events.CallRemote("SetNameTag", player, character)
            end

            for _, name in pairs(friends) do
                local resultKnow = JSON.parse(name.known)
                for x, y in pairs(resultKnow) do
                    if y.identifier == xTargetIdentifier then
                        print('setting nametag for ' .. tostring(character) .. ' with name ' .. tostring(y.name))
                        Events.CallRemote("SetNameTag", player, character, y.name)
                    else
                        print('setting default nametag for ' .. tostring(character))
                        Events.CallRemote("SetNameTag", player, character)
                    end
                end
            end
        end
    end
end)

-- Events.Subscribe("Spawn", function(p)
--     InitializeNametags(p)
-- end)

Core.CreateCommand("dou", function(xPlayer, args)
    Chat.BroadcastMessage("mynameis: "..tostring(xPlayer.getName()))
end, {})

--[[ ------- Functions ------- ]]

-- function to get all the players that the player knows and assing a nametag to them
function InitializeNametags(player)
    local xPlayer = Core.GetPlayerFromId(player:GetID())
    local myIdentifier = xPlayer.identifier

    local allPlayers = Player.GetAll()

    for z, w in pairs(allPlayers) do
        local xTarget = Core.GetPlayerFromId(w:GetID())
        local targetIdentifier = xTarget.identifier
        local targetPlayer = xTarget.player

        local friends = DB:Select("SELECT * FROM user_knownpeople WHERE identifier = :0", myIdentifier)

        if friends[1] then
            for k, v in pairs(friends) do
                if tonumber(v.identifier) == myIdentifier then
                    local result = JSON.parse(v.known)
                    for _, p in pairs(result) do
                        if p.identifier == targetIdentifier then
                            Events.CallRemote("hlx-nametags:client:AttachNametag", player, targetPlayer, p.name)
                        end
                    end
                end
            end
        end
    end
end