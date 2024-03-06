ActiveCameras = {}

Events.SubscribeRemote('pcrp-core:SetCamActive', function(player, bool)
    local pid = player:GetAccountID()
    
    if bool and ActiveCameras[pid] then return end
    if (not bool and not ActiveCameras[pid]) then return end

    if bool then
        ActiveCameras[pid] = player:GetControlledCharacter()
        player:UnPossess()
    else
        local oldCharacter = ActiveCameras[pid]
        player:Possess(oldCharacter)

        ActiveCameras[pid] = nil
    end
end)