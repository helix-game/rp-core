local day = 0 -- DONT TOUCH

-- TIME EVERY DAY IT RESETS (midnight)
local _hour = 22 
local _min = 37
local _sec = 00

Events.Subscribe("CollectReward", function(player) -- give the money to the player 
    local id = player:GetID()
    local xPlayer = Core.GetPlayerFromId(id)

    if not xPlayer.get('nextCollectTime') then return end -- Possible injection

    if (os.time() - xPlayer.get('nextCollectTime') - 5 > 0) then return end -- Possible injection

    xPlayer.set('nextCollectTime', nil)
    
    local current_time = os.date("*t")
    local query = string.format("INSERT INTO daily_free (identifier, last_day) VALUES ('%s', :0) ON DUPLICATE KEY UPDATE last_day = :0", xPlayer.identifier)

    DB:Execute(query, current_time.yday, current_time.yday);
    
    ClaimReward(xPlayer)
end)

function ClaimReward(xPlayer)
	-- xPlayer.addMoney(Core.DailyReward) -- event to add money 
    xPlayer.showNotification("You earned the daily reward!");
end

function InitializeDailyReward(player)
    local id = player:GetID()
    local xPlayer = Core.GetPlayerFromId(id)
	local identifier = xPlayer.identifier
    local current_time = os.date("*t")

    local lastCollectedDate = DB:Select("SELECT last_day FROM daily_free WHERE identifier = :0", identifier)
    local canCollect = true

    if #lastCollectedDate ~= 0 then
        canCollect = current_time.yday ~= lastCollectedDate[1].last_day
    end

    if not canCollect then return end

    xPlayer.set("nextCollectTime", os.time() + Core.DailyTime * 60 * 60)
    xPlayer.call("Reward:Client:ToggleUI", true)
end

function getEpochTime(hour, minute, second)
    -- Get the current date and time
    local currentTime = os.date("*t")
  
    -- Set the day, hour, minute, and second to the specified values
    currentTime.day = currentTime.day + day
    currentTime.hour = hour
    currentTime.min = minute
    currentTime.sec = second
  
    -- Convert the modified date and time to epoch time
    local epochTime = os.time(currentTime)
  
    return epochTime
  end
  

function InitDayCount()
    local current_time = os.date("*t")
    local hour = current_time.hour
    local min = current_time.min
    local sec = current_time.sec
    
    if hour >= _hour and min >= _min and sec >= _sec then
        day = day + 1
    end
    
    local timer = Timer.SetTimeout(function()
        day = day + 1

        for k, v in pairs(Core.Players) do
            v.call('Reward:Client:Reset')
            InitializeDailyReward(v.player)
        end

        return InitDayCount()
    end, (getEpochTime(_hour, _min, _sec) - os.time()) * 1000)
end

InitDayCount()