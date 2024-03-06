--[[ local activeVehicleMarkers = {}
for _, v in pairs(Core.VehicleShops) do
    for key, value in pairs(v.vehicles) do
        local markerName = _.."-"..key
        activeVehicleMarkers[markerName] = true
        Core.LinkMarker(markerName, function(marker, dist)
            Core.AddInteraction("F", "INTERACTION", false)
            Client.SendChatMessage("In Zone")
        end, function(marker, dist)
            Core.RemoveInteraction("F")
            Client.SendChatMessage("Out of Zone")
        end, function(marker, dist)
        end)
    end
end

function StartTestTimer(_data)
    TimerCanvas = Canvas(true, Color.TRANSPARENT, 0, true)
    local seconds_left = _data.TimeLimit
    local seconds = seconds_left

    Timeout = Timer.SetInterval(function ()
        seconds_left = seconds_left - 1
        seconds = seconds_left
        if seconds_left == 0 then
            seconds_left = 0
            Timer.ClearInterval(Timeout)
            Events.CallRemote('VehicleShop:ServerEvent', 'test_drive_timedout')
        end
        if seconds_left == 60 or seconds_left == 10 or seconds_left == 5 then
            Core.ShowNotification(seconds..' Seconds left for test drive.')
        end
    end, 1000)

    TimerCanvas:Subscribe("Update", function(self, width, height)
        if seconds_left ~= 0  then
            self:DrawText("VEHICLE TEST DRIVE", Vector2D(150, 810), 0, 12, Color.WHITE, 0, true, true)
            self:DrawText("WILL END IN "..seconds.." SECONDS", Vector2D(150, 826), 0, 12, Color.WHITE, 0, true, true)
        end
    end)
end

function StartTestTimer()
    if TimerCanvas then
        TimerCanvas:Destroy()
    end
    if Timeout then
        Timer.ClearInterval(Timeout)
    end
end


Events.SubscribeRemote('VehicleShop:ClientEvent',function (_type, _data)
    Client.SendChatMessage("Got ".._type)

    if _type == 'vehicle_menu_01' and _data then
        local data = _data.data
        local elm = {}
        local des = nil
        if data.stock > 0 then
            elm[#elm+1] = { label = "Purchase for $"..data.price.."", value = "purchase_vehicle" }
            --des = data.description.." In Stock : "..data.stock..""
            des = data.description
        else
            des = "Out of Stock!"
        end

        if data.testAllowed then
            elm[#elm+1] = { label = "Test drive", value = "test_drive_vehicle" }
        end

        Core.OpenMenu("select", {
            title = data.company..", "..data.model..".",
            description = des,
            elements = elm
        }, function(data, menu)
            print(NanosUtils.Dump(data))
            menu.close()
            if data.value then
                Events.CallRemote('VehicleShop:ServerEvent', data.value)
            end
        end, function(menu)
            menu.close()
        end)
    elseif _type == 'on_test_timer' and _data then
        StartTestTimer(_data)
    elseif _type == 'on_test_timer_end' then
        StartTestTimer()
    end
end)

Core.RegisterInput('F', function(key)
    if not Core.PlayerData.currentMarker then
        return
    end
    --- wokring to add a optimized table check 
    if activeVehicleMarkers[Core.PlayerData.currentMarker.name] then
        Client.SendChatMessage("Tried to access shop vehicle "..Core.PlayerData.currentMarker.name)
        Events.CallRemote('VehicleShop:ServerEvent', 'shop_interact_vehicle')
        Core.RemoveInteraction("F")
    end

end, function(key)
    print(key)
end) ]]