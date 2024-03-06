local time = 250
local last_pos

local VehicleHUD = Core.RegisterHUD('vehiclehud', 'file://ui/modules/vehiclehud/index.html')
local vehicle_interval

function Calculate_MPH()
    local char = Client.GetLocalPlayer():GetControlledCharacter()

    if char then
        local car = char:GetVehicle()
        if car == nil then return end
        --if car:GetRPM() ~= 0 then
            local current_pos = char:GetLocation()

            if last_pos and car:GetVelocity():IsZero() == false then
                local distance = current_pos:Distance(last_pos)
                local speed = distance / (time) * 10
                local mph = NanosMath.Round((speed * 2.23694)) -- convert "speed" to actual mph - estimation is not perfect
                if mph == -1 then mph = 0 end
                VehicleHUD.Call("Speedometer", mph)
            end

            last_pos = current_pos
        --end
    end
end

Events.SubscribeRemote("helix-vehiclehud:UpdateCar", function(fuel, engine)
    VehicleHUD.Call("helix-vehiclehud:UpdateCar", fuel, engine)
end)

function Core.ToggleSpeedometer(state)
    if state == true then
        vehicle_interval = Timer.SetInterval(function()
            Calculate_MPH()
        end, time)
        VehicleHUD.Call('vehiclehud:Show', true)
    else
        Timer.ClearInterval(vehicle_interval)
        VehicleHUD.Call('vehiclehud:Show', false)
    end
end

