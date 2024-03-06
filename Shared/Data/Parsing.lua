-- Gets files in data folder
Package.Subscribe("Load", function()
    local path = './Packages/' .. Package.GetName() .. '/'
    for _, v in ipairs(Package.GetFiles('Data', '.json')) do
        local file = File(path .. v)
        
        local file_json = JSON.parse(file:Read(file:Size()))
        
        if file_json.Vehicle then
            Core.VehicleModels[file_json.Vehicle.name] = file_json.Vehicle
        end
    
        file:Close()
    end
end)

for k, v in pairs(Core.Items) do
    if not v.weight then
        v.weight = 0.1
    end
end