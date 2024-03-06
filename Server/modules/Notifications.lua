NotificationSounds = {}

for k, v in pairs(Package.GetFiles("Client/ui/modules/notification/sounds", '.ogg')) do
    v = v:gsub('Client/ui/modules/notification/sounds/', ''):gsub('.ogg', '')

    NotificationSounds[v] = true
end

Core.CreateCallback('RequestNotificationSounds', function(player, cb)
    cb(NotificationSounds)
end)