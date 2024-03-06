local NotificationHUD = Core.RegisterHUD('notification', 'file://ui/modules/notification/notification.html')

NotificationSounds = {}


Events.SubscribeRemote('core:onPlayerSpawned', function()
    Core.TriggerCallback('RequestNotificationSounds', function(notificationSounds)
        NotificationSounds = notificationSounds
        
        for k, v in pairs(NotificationSounds) do
            NotificationSounds[k] = Sound(Vector(), ("package://%s/Client/ui/modules/notification/sounds/%s.ogg"):format(Package.GetName(), k), true, false, SoundType.UI, 0)

            NotificationSounds[k]:SetVolume(1)
        end
    end)
end)