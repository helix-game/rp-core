Events.Subscribe('core:playerSpawned', function(player)
	local plyId = player:GetID()
	local xPlayer = Core.Players[plyId]

	local res = DB:Select(("SELECT data, weight FROM `inventory_data` WHERE name = '%s'"):format(xPlayer.charid))
	if res[1] then
		xPlayer.inventory.Update({ data = JSON.parse(res[1].data), weight = JSON.parse(res[1].weight) })
	end
end)