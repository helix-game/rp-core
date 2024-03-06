--[[ local shopVehicles = {}
local shopMarkers = {}
local vehicleOnTest = {}

Package.Subscribe("Load", function()
    for _, v in pairs(Core.VehicleShops) do
        for key, value in pairs(v.vehicles) do
            -- print(value.spawn, value.coords, value.rotation)
            local veh = Core.CreateVehicle(value.spawn, value.coords, value.rotation)
            -- local text_render = TextRender(
            --     Vector(value.coords.X, value.coords.Y, value.coords.Z + 100),
            --     Rotator(),
            --     value.model,
            --     Vector(0.2, 0.25, 0.25),
            --     Color(1, 1, 1),
            --     FontType.Roboto,
            --     TextRenderAlignCamera.AlignCameraRotation
            -- )
            -- local markerName = _.."-"..key
            -- Core.CreateMarker(markerName, {
            --     coords = value.coords,
            --     type = 1,
            -- }, '', 5.0, true)
            -- shopMarkers[markerName] = {
            --     spot = key,
            --     marker = markerName,
            --     shop = _,
            --     vehicle = veh,
            --     data = value,
            -- }
            -- shopVehicles[veh] = {
            --     shop = _,
            --     vehicle = veh,
            --     marker_name = markerName,
            -- }
            -- print("New vehicle spawned at shop ".._..", name of vehicle : "..value.model..", stock of : "..value.stock..", marker name : "..markerName.."")
        end
    end
end)

Vehicle.Subscribe("CharacterAttemptEnter", function(vehicle, character, seat)
    if seat ~= 0 then
        return false
    end
    local xPlayer = Core.GetPlayerFromCharacter(character)
    if shopVehicles[vehicle] then
       xPlayer.showNotification("You cannot a shop vehicle!")
        return false
    end
end)

Vehicle.Subscribe("CharacterLeave", function(vehicle, character, seat)
    if seat ~= 0 then
        return
    end
    local xPlayer = Core.GetPlayerFromCharacter(character)
    if vehicleOnTest[vehicle] then
        print('Player left a on test vehicle')
        local veh = Core.GetVehicleData(vehicle)
        Timer.SetTimeout(function ()
            if not vehicle or not vehicleOnTest[vehicle] then return end
            veh.RemoveVehicle()
            xPlayer.showNotification("You left an on test vehicle.")
            Events.CallRemote('VehicleShop:ClientEvent', xPlayer.player, 'on_test_timer_end')
            vehicleOnTest[vehicle] = nil
        end, 1000)
    end
end)

local function PurchaseVehicle(_player)
    local xPlayer = _player
    local intialTable = shopMarkers[xPlayer.currentMarker.name]
    local mainTable = Core.VehicleShops[intialTable.shop].vehicles[intialTable.spot]
    print(intialTable.shop, intialTable.spot)
    if not mainTable then return end
    if mainTable.stock <= 0 then print('The vehicle has no more stock left.') return end

    mainTable.stock = mainTable.stock - 1

    local coords = Core.VehicleShops[intialTable.shop].purchased_vehicle.Spawn.coords
    local rotator = Core.VehicleShops[intialTable.shop].purchased_vehicle.Spawn.rotation
    local veh = Core.CreateVehicle(mainTable.spawn, coords, rotator)
    Timer.SetTimeout(function ()
        xPlayer.character:EnterVehicle(veh, 0)
        xPlayer.showNotification("You bought a "..mainTable.model.." for $"..mainTable.price..".")
    end, 1000)
    print("")
end

local function TestDriveVehicle(_player)
    local xPlayer = _player
    local intialTable = shopMarkers[xPlayer.currentMarker.name]
    local mainTable = Core.VehicleShops[intialTable.shop].test_drive
    print("Requested Test Drive.", intialTable.shop, mainTable.TimeLimit)
    if not mainTable then return end
    local coords = mainTable.Spawn.coords
    local rotation = mainTable.Spawn.rotation
    local vehileToSpawn = Core.VehicleShops[intialTable.shop].vehicles[intialTable.spot].spawn
    local veh = Core.CreateVehicle(vehileToSpawn, coords, rotation)
    if veh then
        vehicleOnTest[veh] = {
            shop = intialTable.shop,
            spot = intialTable.spot,
        }
        Timer.SetTimeout(function ()
            xPlayer.character:EnterVehicle(veh, 0)
            Events.CallRemote('VehicleShop:ClientEvent', xPlayer.player, 'on_test_timer', mainTable)
        end, 1000)
    end
end

Events.SubscribeRemote('VehicleShop:ServerEvent',function (player, _type, _data)
    local xPlayer = Core.GetPlayerFromId(player:GetID())
    print('Got Called, ', _type)
    if _type == "shop_interact_vehicle" then
        if not shopMarkers[xPlayer.currentMarker.name] then return end
        print("found matching marker at vehicle shop "..shopMarkers[xPlayer.currentMarker.name].shop)
        Events.CallRemote('VehicleShop:ClientEvent', xPlayer.player, 'vehicle_menu_01', shopMarkers[xPlayer.currentMarker.name])
    elseif _type == "purchase_vehicle" then
        if not shopMarkers[xPlayer.currentMarker.name] then return end
        print("found matching marker at vehicle shop "..shopMarkers[xPlayer.currentMarker.name].shop)
        PurchaseVehicle(xPlayer)
    elseif _type == "test_drive_vehicle" then
        if not shopMarkers[xPlayer.currentMarker.name] then return end
        print("found matching marker at vehicle shop "..shopMarkers[xPlayer.currentMarker.name].shop)
        TestDriveVehicle(xPlayer)
    elseif _type == "test_drive_timedout" then
        if xPlayer.insideVehicle and vehicleOnTest[xPlayer.insideVehicle] then
            print('Player left a on test vehicle')
            local veh  = Core.GetVehicleData(xPlayer.insideVehicle)
            local vehicle = xPlayer.insideVehicle
            xPlayer.character:LeaveVehicle()
            veh.RemoveVehicle()
            xPlayer.showNotification("Your on test vehicle timedout.")
            vehicleOnTest[vehicle] = nil
        end
    end
end) ]]