Core.VehicleVINs = {}

function CreateVehicleClass(vehicle, model, fuel, vin, maxfuel)
	local self = {}

	self.vehicle = vehicle
	self.vehicleModel = model
	self.fuel = fuel or 20
	self.maxfuel = maxfuel or 20
	self.engineHealth = 100.0
	self.running = false
	self.vin = vin or GenerateVehicleVIN()
	self.glovebox = nil

	function self.getVIN()
		return self.vin
	end

	function self.getVehicleModel()
		return self.vehicleModel
	end

	function self.setFuel(fuel)
		-- return
		-- if fuel < 0 then fuel = 0 elseif fuel > 100 then fuel = 100 end
		
		-- self.fuel = fuel
		-- self.vehicle:SetValue('fuel', fuel, true)

		-- self.updateVehicle()
	end

	function self.setEngineHealth(health)
		if health < 0 then health = 0 elseif health > 100 then health = 100.0 end

		self.engineHealth = health
		self.vehicle:SetValue('engineHealth', health, true)

		self.updateVehicle()
	end

	function self.getEngineHealth()
		return self.engineHealth
	end

	function self.updateVehicle()
		if self.fuel <= 0 or self.engineHealth <= 0 then
			self.setRunning(false)
		end
			-- 	-- vehicle:SetEngineStarted(false)
		-- elseif  self.fuel > 0 and self.engineHealth > 0 then
		-- 	self.setRunning(true)
		-- 	-- vehicle:SetEngineStarted(true)
		-- end
	end
	
	function self.getFuel()
		return self.fuel
	end
	
	function self.setRunning(bool)
		print('set running => ', bool)
		self.running = bool
		--vehicle:SetEngineStarted(bool)
		vehicle:SetValue('running', bool, true)
	end
	

	local index = #Core.VehiclesSpawned + 1
	Core.VehiclesRegistry[vehicle] = index
	Core.VehiclesSpawned[index] = self
	Core.VehicleVINs[self.vin] = self

	function self.RemoveVehicle()
		Core.VehiclesRegistry[self.vehicle] = nil
		Core.VehiclesSpawned[index] = nil
		Core.VehicleVINs[self.vin] = nil
		self.vehicle:Destroy()
	end
	
	return self
end

function Core.GetVehicleData(vehicle)
	if not Core.VehiclesRegistry[vehicle] then return end
	return Core.VehiclesSpawned[Core.VehiclesRegistry[vehicle]]
end

function Core.GetVehicleFromVIN(vin)
	return Core.VehicleVINs[vin]
end

function GenerateVehicleVIN()
    local vin = ""
    local wmi = Core.GetRandomStr(3) -- manufactor code (could integrate it)
    local vds = Core.GetRandomStr(5) -- random characters
    local vis = Core.GetRandomStr(5) -- random characters
    local checkdigit = Core.GetRandomInt(9) -- random digit between 0, 9

	vin = wmi .. vds .. vis .. checkdigit

--[[ 	if Core.VehicleVINs[vin] then
		return GenerateVehicleVIN()
	end ]]

	return vin
end