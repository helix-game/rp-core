Events.SubscribeRemote("SendToApartment", function (ply)
    local char = ply:GetControlledCharacter()

    char:SetLocation(Vector(0,0,0))

    Core.GetPlayerFromCharacter(char).call('core:onPlayerSpawned')
end)