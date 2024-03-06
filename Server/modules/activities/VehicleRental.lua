local man = Character(Vector(146.60000610352, -1404.3000488281, 98.199996948242), Rotator(0, -0.77287912368774, 0), "helix::SK_Male")
man:SetInvulnerable(true)
Core.AddNametag(man, "Vehicle Rental")

local current_rentals  = {}
local current_rentables = {}
local reverse_index_rentables = {}
Core.CreateMarker('scooty_rental', {
    coords = Vector(146.60000610352, -1404.3000488281, 98.199996948242),
    type = 1,
}, '', 2.0, true)


Core.CreateCommand('rentOut', function(xPlayer, args)
	print('Running Vehicle Rent Out Command')
	local player = xPlayer.player
    if not xPlayer.insideVehicle then return end
    local rentable_index = reverse_index_rentables[xPlayer.insideVehicle]
    if not rentable_index then
        Events.CallRemote('VehicleRental:ClientEvent', player, 'set_price_rent')
    else
        xPlayer.showNotification("Your vehicle is already available for renting.")
    end
end, {})


local function RentScooter(_player)
    local xPlayer = Core.GetPlayerFromId(_player:GetID())
    if current_rentals[xPlayer.identifier] then return end

	local coords = Vector(186.19999694824, -1200.70001220703, 10.0)
	local rotation = Rotator(-0.027976427227259, 0.91276961565018, -0.0002228485973319)

	coords = coords
	local veh = Core.CreateVehicle('CamperVan', coords, rotation)
	xPlayer.character:EnterVehicle(veh, 0)
    current_rentals[xPlayer.identifier] = {
        vehicle = veh,
        is_inside = true,
        type = 'npc',
    }
end

local function RentOutVehicle(_player, _price)
    local xPlayer = _player
    local price =  _price
    local veh = xPlayer.insideVehicle
    local index = #current_rentables + 1
    current_rentables[index] = {
        owner = xPlayer.identifier,
        model = "Wagon",
        vehicle = veh,
        price = price,
        location = {
            coords = veh:GetLocation(),
            rotation = veh:GetRotation(),
        },
        isRented = false,
    }
    reverse_index_rentables[veh] = index
    if current_rentables[index] then
        print("New vehicle set rentable for the price of "..price.."")
        xPlayer.character:LeaveVehicle()
    end
end


Vehicle.Subscribe("CharacterEnter", function(vehicle, character, seat)
    if seat ~= 0 then
        return
    end
    local xPlayer = Core.GetPlayerFromCharacter(character)
    local rentable_index = reverse_index_rentables[vehicle]
    if rentable_index and current_rentables[rentable_index] then
        print('Character entered a rentable vehicle')
        if not current_rentables[rentable_index].isRented then
            if current_rentals[xPlayer.identifier] then
                Timer.SetTimeout(function ()
                    xPlayer.showNotification("You're already renting from someone.")
                    xPlayer.character:LeaveVehicle()
                end, 1000)
                return
            end
            Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'got_into_rentable', current_rentables[rentable_index].price)
        else
            if current_rentables[rentable_index].renter == xPlayer.identifier then
                Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'stop_timer')
            else
                Timer.SetTimeout(function ()
                    xPlayer.character:LeaveVehicle()
                    xPlayer.showNotification("This vehicle is rented by someone else.")
                end, 1000)
            end
        end
    end

    if current_rentals[xPlayer.identifier] and current_rentals[xPlayer.identifier].type == 'npc' and vehicle == current_rentals[xPlayer.identifier].vehicle then
        current_rentals[xPlayer.identifier].is_inside = true
        Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'stop_timer')
        print('Player just entered rented vehicle')
    end
end)

Vehicle.Subscribe("CharacterLeave", function(vehicle, character, seat)
    if seat ~= 0 then
        return
    end
    local xPlayer = Core.GetPlayerFromCharacter(character)
    local rentable_index = reverse_index_rentables[vehicle]
    if rentable_index and current_rentables[rentable_index] then
        if current_rentables[rentable_index].isRented then
            if current_rentables[rentable_index].renter == xPlayer.identifier then
                print('renter existed rented vehicle.')
                Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'exiting_rentable', rentable_index)
            end
        end
        print('Character left a rentable vehicle')
    else
        if current_rentals[xPlayer.identifier] and vehicle == current_rentals[xPlayer.identifier].vehicle then
            print('Player just left rented vehicle')
            current_rentals[xPlayer.identifier].is_inside = false
            Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'start_timer')
        end
    end
end)

Events.SubscribeRemote('VehicleRental:ServerEvent',function (player, _type, _data)
    local xPlayer = Core.GetPlayerFromId(player:GetID())
    print('Got Called, ', _type)

    if _type == 'check_scooty' then
        if not current_rentals[xPlayer.identifier] then
            print('Player does not have a scooter.')
            Events.CallRemote('VehicleRental:ClientEvent', player, 'confirm_rent')
        elseif current_rentals[xPlayer.identifier] and current_rentals[xPlayer.identifier].type == 'npc' then
            print('Player already rents a scooter.')
            Events.CallRemote('VehicleRental:ClientEvent', player, 'already_renting')
        else
            xPlayer.showNotification("You're already renting from someone.")
        end
    elseif _type == 'rent_scooty' then
        RentScooter(player)
    elseif _type == 'park_rented' then
        if not current_rentals[xPlayer.identifier] then return end
        if current_rentals[xPlayer.identifier].type == 'npc' then
            local vehData = Core.GetVehicleData(current_rentals[xPlayer.identifier].vehicle)
            vehData.RemoveVehicle()
            current_rentals[xPlayer.identifier] = nil
            Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'stop_timer')
            print('An rented vehicle was deleted.')
        else
            xPlayer.showNotification("Error, no vehicle was found.",'info', 5000)
        end
    elseif _type == 'rental_timedout' then
        if not current_rentals[xPlayer.identifier] then return end
        if current_rentals[xPlayer.identifier].type == 'npc' then
            local vehData = Core.GetVehicleData(current_rentals[xPlayer.identifier].vehicle)
            vehData.RemoveVehicle()
            current_rentals[xPlayer.identifier] = nil
            print('An rented vehicle was deleted.')
            xPlayer.showNotification("Your rented vehicle was deleted for being not used.")
        elseif current_rentals[xPlayer.identifier].type == 'rentable' then
            local index = current_rentals[xPlayer.identifier].index
            print('got table index', index)
            if current_rentables[index] then
                if current_rentables[index].isRented and current_rentables[index].renter == xPlayer.identifier then
                    local vehData = Core.GetVehicleData(current_rentables[index].vehicle)
                    vehData.RemoveVehicle()
                    Timer.SetTimeout(function ()
                        local veh = Core.CreateVehicle(current_rentables[index].model, current_rentables[index].location.coords, current_rentables[index].location.rotation)
                        current_rentables[index].isRented = false
                        current_rentables[index].renter = nil
                        current_rentables[index].vehicle = veh
                        reverse_index_rentables[veh] = index
                    end, 1000)
                    xPlayer.showNotification("Your rented vehicle timedout.")
                end
            end
        end
    elseif _type == 'get_rent_price' then
        if not xPlayer.insideVehicle or not _data then return end
        local price = _data
        if price <= 0 then price = 1 end
        print('Set rental price to ', price)
        RentOutVehicle(xPlayer, price)
    elseif _type == 'rent_rentable' then
        local veh = xPlayer.insideVehicle
        local rentable_index = reverse_index_rentables[veh]
        if rentable_index and current_rentables[rentable_index] then
            if not current_rentables[rentable_index].isRented then
                local price = current_rentables[rentable_index].price
                current_rentables[rentable_index].isRented = true
                current_rentables[rentable_index].renter = xPlayer.identifier
                current_rentals[xPlayer.identifier] = {
                    vehicle = veh,
                    is_inside = true,
                    index = rentable_index,
                    type = 'rentable',
                }
                xPlayer.showNotification("You rented this vehicle for "..price.."$.")
            end
        end
    elseif _type == 'cancel_rentable' then
        local index = _data
        print('got table index', index)
        if current_rentables[index] then
            if current_rentables[index].isRented and current_rentables[index].renter == xPlayer.identifier then
                local vehData = Core.GetVehicleData(current_rentables[index].vehicle)
                vehData.RemoveVehicle()
                Timer.SetTimeout(function ()
                    local veh = Core.CreateVehicle(current_rentables[index].model, current_rentables[index].location.coords, current_rentables[index].location.rotation)
                    current_rentables[index].isRented = false
                    current_rentables[index].renter = nil
                    current_rentables[index].vehicle = veh
                    reverse_index_rentables[veh] = index
                    current_rentals[xPlayer.identifier] = nil
                end, 1000)
                xPlayer.showNotification("You returned a rented vehicle.")
            end
        end
    elseif _type == 'start_timer_rentable' then
        local index = _data
        if current_rentables[index] then
            if current_rentables[index].isRented and current_rentables[index].renter == xPlayer.identifier then
                Events.CallRemote('VehicleRental:ClientEvent', xPlayer.player, 'rentable_start_timer')
            end
        end
    elseif _type == 'kickout_vehicle' then
        xPlayer.character:LeaveVehicle()
    end
end)