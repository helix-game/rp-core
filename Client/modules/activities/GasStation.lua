

GasPumps = {}
GasPumps.Markers = {}

local ui = {}

function createMarker(info)
    local point = Core.CreateMarker({
        coords = info.marker_pos,
        distance = 1000,
        marker = {
            type = "pco-markers::SM_MarkerCylinder",
        },
        text = {
            text = "Fuel Pump"
        },
        prompt = {
            text = "Interact Fuel Pump",
            key = "F"
        },
        interactions = "F"
    })
    
    function point:onEnter()
        self:showMarker()
    end

    function point:nearby()

        if self.currentDistance <= 100.0 then
            self:showText()
            self:showPrompt()

            if self:isKeyJustReleased("F") then
                Events.CallRemote("gaspumps::client:openPump",info.key)
            end
        else
            self:hidePrompt()
            self:hideText() 
        end
    end
    
    function point:onExit()
        self:hideText()
        self:hidePrompt()
        self:hideMarker()
    end

    table.insert(GasPumps.Markers,point)

    return point
end




function GasPumps.LoadMarker(markers)
    if markers then
        GasPumps.Markers = markers
    end
        --print(#markers)
    for i,xPump in pairs(GasPumps.Markers) do
        --print(xPump)
        createMarker(xPump)
    end
end
Events.SubscribeRemote("gaspumps::server::LoadMarkers",GasPumps.LoadMarker)


function GasPumps.NewMarker(xPump)
    createMarker(xPump)
end
Events.SubscribeRemote("gaspumps::server::NewMarker",GasPumps.NewMarker)



function GasPumps.ShowPump(cash,xPump,xVehicle)
  
if not ui.main then 

    local gaspump_ui = Core.RegisterHUD("GasPump","file://ui/gas/index.html")
    ui.main = gaspump_ui
    gaspump_ui.Focus(true,false)
    --print(cash,xVehicle.fuel,xVehicle.maxfuel)
    local info = {cash = cash, fuel = xVehicle.fuel, maxfuel = xVehicle.maxfuel }

    gaspump_ui.hud:CallEvent("PumpSetUp",info)
    Input.SetMouseEnabled(true)
    gaspump_ui.hud:Subscribe("confirmPurchase",function (fuel)
        --print(xPump.key,fuel)
        Events.CallRemote("gaspumps::client:PurchaseRequest",xPump.key,fuel)
    
        gaspump_ui.RemoveHUD()
    
        ui.main = false
    end)
end
  
  --[[
    Core.OpenMenu("input", {
        title = "GAS STATION $3.9 PER GALLON [PLACEHOLDER]",
        description = "Input amount of Fuel you want into your Vehicle.",
        inputType = 'number',
    }, 
        function(gallons, menu)
            print(xPump.key,gallons)
            Events.CallRemote("gaspumps::client:PurchaseRequest",xPump.key,gallons)
            menu.close()

        end, function(menu)
        
            menu.close()

    end)
]]

end
Events.SubscribeRemote("gaspumps::server:ShowPump",GasPumps.ShowPump)

--old code

--[[
local GasStationUI = {
    state = false,
    vehicle = nil
}

Core.RegisterInput('F', function(key)
    if not Core.PlayerData.currentMarker then
        return
    end
    if Core.PlayerData.currentMarker.name ~= 'fuel_pump' then return end
    
    local closestVeh, closestDist = Core.GetNearestVehicle()
    
    if closestDist > 500.0 then
        return
    end
    
    Events.CallRemote("AttemptToFuelVehicle", closestVeh)
end)


Core.LinkMarker("fuel_pump", function(marker, dist)
    Core.AddInteraction("F", "INTERACTION", false)
end, function(marker, dist)
    Core.RemoveInteraction("F")
end)

Events.Subscribe('StartGasPumpInteraction', function(vehicle, fuel)
    if Core.PlayerData.currentMarker.name ~= 'fuel_pump' then return end
    
    GasStationUI.vehicle = vehicle
    GasStationUI.state = true

    -- Core.HUD:CallEvent("GasStation:Init", {
    --     state = GasStationUI.state,
    --     vehicleFuel = fuel
    -- })

    Input.SetMouseEnabled(true)
    Input.SetInputEnabled(false)
end)

-- Core.HUD:Subscribe('GasStation:ChargeFuel', function(addedFuel)
--     if GasStationUI.vehicle:GetValue('fuel') + addedFuel >= 100 then
--         Core.ShowNotification("Your vehicle's fuel tank is now full!", 'warning', 5000, 'top|right')
--     else
--         Core.ShowNotification("You fueled your vehicle!", 'info', 5000, 'top|right')
--     end
--     Events.CallRemote("GasStation:RefuelVehicle", GasStationUI.vehicle, addedFuel)
-- end)

Core.RegisterInput('Q', function(key)
    if not GasStationUI.state then return end
    if not Core.PlayerData.currentMarker then
        return
    end
    if Core.PlayerData.currentMarker.name ~= 'fuel_pump' then return end
    
    GasStationUI.state = false
    GasStationUI.vehicle = nil
    
    Input.SetMouseEnabled(false)
    Input.SetInputEnabled(true)

    -- Core.HUD:CallEvent("GasStation:Init", {
    --     state = GasStationUI.state
    -- })    
end)
]]