local GasConfig = {}

GasConfig.Pumps = {

    Station1 = {

        {
            trigger = {pos = Vector(1000, 0, 0), rot = Rotator() },
            marker = { pos = Vector(1000,300,0)},
            fueltype = "Petrol"
        },


    }


}


GasPumps = {}
GasPumps.__index = GasPumps
xPumps = {}


Default_PPG = 3.9

GasPumpTrigger = Trigger.Inherit("GasPumpTrigger")

function GasPumps.New(pump_info) --makes a petrol pump for the player to fill up on gas 
    --markers
    --trigger for car

    --print(pump_info)
    local size = Vector(400,250,300) 
    local xPump = setmetatable({},GasPumps) 

    xPump.key = math.random(1,500)

    xPump.trigger = GasPumpTrigger(pump_info.trigger.pos,pump_info.trigger.rot,size,TriggerType.Box,false)
    xPump.trigger:SetOverlapOnlyClasses({"HELIXVehicle","Vehicle"})
    xPump.trigger:SetValue("xPump",xPump.key)
    xPump.fuel = "Petrol"
    xPump.price_per_gallon = 3.9 or Default_PPG

    xPump.vehicle = false
    xPump.vehicle_marker = StaticMesh(Vector(0,0,0),Rotator(0,90,0),"pco-markers::SM_MarkerArrow",CollisionType.NoCollision)
    xPump.player = false

    
    xPump.marker_pos = pump_info.marker.pos

    xPumps[xPump.key] = xPump
    Events.BroadcastRemote("gaspumps::server::NewMarker",xPump)

    xPump.vehicle_marker:SetScale(Vector(2,2,2))
    xPump.vehicle_marker:AttachTo(xPump.trigger)
    xPump.vehicle_marker:SetRelativeRotation(Rotator(0,90,0))


    --cosmetic, just to show what it would be like
    --StaticMesh(pump_info.marker.pos+Vector(0,110,0),Rotator(),"helix::SM_HalfStack_Marshall"):SetScale(Vector(1,1,1.5))
    --

    
end

--Package.Require("Config.lua")
for i,Station in pairs(GasConfig.Pumps) do
    for i,Pump in pairs(Station) do
        GasPumps.New(Pump) --  for now

    end
end



function GasPumps.VehicleEnters(self, entity)
   
    --if entity.GetPassengers then  -- is a car, does not need this anymore, used SetOverlapOnlyClasses!
        --print("VEHICLE ENTERS!")
        local xVehicle = Core.GetVehicleData(entity)
        local xPump = xPumps[(self:GetValue("xPump"))]  
        --print(xPump)

        if not xPump.vehicle then 
            xPump.vehicle = xVehicle
            xPump.vehicle_marker:SetVisibility(false)  
        end
 
    --end

end
GasPumpTrigger.Subscribe("BeginOverlap",GasPumps.VehicleEnters)



function GasPumps.VehicleLeaves(self, entity)
    
    if entity.GetPassengers then  -- is a car
        --print("VEHICLE LEAVES!")
        local xVehicle = Core.GetVehicleData(entity)
        local xPump = xPumps[(self:GetValue("xPump"))]  
        
        if xPump.vehicle == xVehicle then
            xPump.vehicle = false  
            xPump.vehicle_marker:SetVisibility(true)  
        end

        --can now 
    end

end
GasPumpTrigger.Subscribe("EndOverlap",GasPumps.VehicleLeaves)


function GasPumps.OpenPump(player,key)
    --print("open pump!!!")
    local xPump = xPumps[key]
    local xPlayer = Core.GetPlayerFromId(player:GetID())
    local xVehicle = xPump.vehicle
    --print(xVehicle, xPump.player)
    if xPump.vehicle and not xPump.player then
        xPump.player = xPlayer --make sure when done set xplayer to false, dont do it when ui is closed - do it when fuel is added
       
        --xPump.player.character.Subscribe("Death",GasPumps.PlayerDies)
       
        --print("CONFIRM!!")
        --open UI

        Events.CallRemote("gaspumps::server:ShowPump",player,xPlayer.getMoney(),xPump,xVehicle)
    end

    if not xVehicle then 
        xPlayer.showNotification("There is no vehicle to pump gas into!")
    end

    
end
Events.SubscribeRemote('gaspumps::client:openPump', GasPumps.OpenPump)




function GasPumps.PlayerDies(self, last_damage_taken, last_bone_damaged, damage_type_reason, hit_from_direction, instigator, causer)
    --print(instigator)
--remove from pump
end



function GasPumps.PlayerLoadPumps(player)
    Events.CallRemote("gaspumps::server::LoadMarkers",player,xPumps)
end
Events.Subscribe('core:playerSpawned', GasPumps.PlayerLoadPumps)

function GasPumps.PurchaseRequest(player, key, gallons)
    --print("Meow!")
    if xPumps[key].player then
        if gallons > 0 then -- just incase people think they're funny
            --print(key, gallons)
            local xPump = xPumps[key]
            local xVehicle = xPump.vehicle
            local fuel = xVehicle.getFuel()
            local maxfuel = xVehicle.maxfuel or 20
            local xPlayer = Core.GetPlayerFromId(player:GetID())

            xPumps[key].player = false --resets after use
            --print("purchase!?!?!?")
            --print(xPump.player, xPump.vehicle)
            if maxfuel >= HELIXMath.Clamp(xVehicle.getFuel() + gallons,0,maxfuel) then
                local cost = gallons * xPump.price_per_gallon

                --print(gallons, cost)

                if xPlayer.getMoney() >= cost then
                    xPlayer.showNotification("You have put in $" .. cost .. " of fuel (" .. gallons .. " GALLONS )")
                    xPlayer.removeMoney(cost)
                    xVehicle.fuel = HELIXMath.Clamp(xVehicle.getFuel() + gallons,0,maxfuel)
                    --do the event
                    Events.CallRemote('helix-vehiclehud:UpdateCar', player, (xVehicle.getFuel()/maxfuel)*100, xVehicle.getEngineHealth())
                else
                    -- possible cheater, add preventatives on UI xPlayer.showNotification("Cannot afford fuel! Try again")
                end
            end
        end

        --print("player:",xPumps[key].player)
        
        --xPump.player.character.Unsubscribe("Death",GasPumps.PlayerDies)
        
        xPumps[key].player = false
        --print("reset player!")

    end
end
Events.SubscribeRemote('gaspumps::client:PurchaseRequest', GasPumps.PurchaseRequest)




--example car
--[[
function Test_SetUp(player)
    local xPlayer = Core.GetPlayerFromId(player:GetID())

    Timer.SetTimeout(function()
        local vehicle = Core.CreateVehicle("Charger", Vector(1000,0,0))
        local xVehicle = Core.GetVehicleData(vehicle)
        xVehicle.fuel = 5

    end, 15000)

    xPlayer.addMoney(1000,true)
    --Car_Keys.GiveKey(player, vehicle)
end

Events.Subscribe('core:playerSpawned', Test_SetUp)

--]]