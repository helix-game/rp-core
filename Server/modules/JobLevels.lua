local Levels = {}
-- DB = Database(DatabaseEngine.MySQL, "db=nanos-life user=root host=localhost")


----------------------------------------------------
--                 SUBSCRIBE                 --
----------------------------------------------------

Package.Subscribe("Load", function()
    local packages = Server.GetPackages(true)

    for _, package in pairs(packages) do
        if package == 'pcrp-core' then
            Levels:Init()
            print('Initializing XP System')
        end
    end
end)

Events.Subscribe('core:playerSpawned',function(player)
    if not player.job then return end

    Levels:Load(player, player.job.job)
end)

Events.SubscribeRemote('Job-Levels:Server:SaveData',function(player, xp, rank, job)
    Levels:Save(player, xp, rank, job)
end)

Events.Subscribe("OnJobUpdate", function(player, job)
    local id = player:GetID()
    local xPlayer = Core.GetPlayerFromId(id)
    Levels:Load(xPlayer, job)
end)

----------------------------------------------------
--                 Functions                 --
----------------------------------------------------
--- @brief Function to initialize the database.
function Levels:Init()
    self.ready = true
end

--- @brief Function to load player data from database
-- @param xPlayer Player to load data
-- @param job Job to load data
function Levels:Load(xPlayer, job)
    for k, v in pairs(CoreCFG.Ranks) do
        if k == job then
            local identifier = xPlayer.identifier
            local player = xPlayer.player
            local Ranks = self:CheckRanks(job)

            if #Ranks > 0 then
                PrintTable(Ranks)
                return
            end

            if self.ready then
                local resp, res = false, nil
                DB:Select('SELECT * FROM jobs_levels WHERE identifier = "'..identifier..'" AND job = "'..job..'"', function(rows)
                    if rows[1] then
                        res = {}
                        res.xp = tonumber(rows[1].xp)
                        res.rank = tonumber(rows[1].rank)
                        res.job = rows[1].job
                        resp = true
                        print(string.format("[Job-LVL] LOADED DATA FOR PLAYER: %s (XP %s, Rank %s, , JOB %s)", player:GetName(), res.xp, res.rank, res.job))
                        Events.CallRemote('xperience:client:init', xPlayer.player, res)

                    else
                        DB:Execute("INSERT INTO jobs_levels (identifier, xp, rank, job) VALUES ('"..identifier.."', 0, 1, '"..job.."')")
                        local newData = {
                            xp = 0,
                            rank = 1,
                            job = job
                        }
                        print(string.format("[Job-LVL] NEW PLAYER REGISTERED: %s (XP %s, Rank %s, JOB %s)", player:GetAccountName(), '0', '1', job))
                        Events.CallRemote('xperience:client:init', xPlayer.player, newData)
                    end
                end)
            end
        end
    end
end

--- @brief Function to update player data in database
function Levels:Save(player, xp, rank, job)
    local id = player:GetID()
    local xPlayer = Core.GetPlayerFromId(id)
    local identifier = xPlayer.identifier
    DB:Execute("UPDATE jobs_levels SET xp = "..xp..", rank = "..rank.." WHERE identifier = '"..identifier.."' AND job = '"..job.."'", function(affectedRows)
        if affectedRows then
            print("Updated")
        else
            print("Failed to update")
        end
    end)
end

--- @brief Function to get the playerXP from the database
function Levels:GetPlayerXP(xPlayer)
    local job = xPlayer.job.job or "unemployed"
    local identifier = xPlayer.identifier

    local xp = DB:Select('SELECT * FROM jobs_levels WHERE identifier = "'..identifier..'" AND job = "'..job..'"')
    if xp then
        return xp[1].xp
    else
        return false
    end
end

--- @brief Function to get the playerRank from the database
function Levels:GetPlayerRank(xPlayer)
    local identifier = xPlayer.identifier
    local job = xPlayer.job.job or "unemployed"
    local rank = DB:Select('SELECT * FROM jobs_levels WHERE identifier = "'..identifier..'" AND job = "'..job..'"')
    if rank then
        return rank[1].rank
    else
        return false
    end
end

--- @brief Function to get the playerXP to the next rank
function Levels:GetPlayerXPToNextRank(xPlayer)
    local job = xPlayer.job.job or "unemployed"
    local currentXP = self:GetPlayerXP(xPlayer)
    local currentRank = self:GetPlayerRank(xPlayer)

    if currentRank >=  #CoreCFG.Ranks[job] then
        return "Max level"
    end

    return (tonumber(CoreCFG.Ranks[job][currentRank + 1].XP) - tonumber(currentXP)) or currentRank
end

--- @brief Function to get the playerXP to a specific rank
function Levels:GetPlayerXPToRank(xPlayer, rank)
    local currentXP = self:GetPlayerXP(xPlayer)
    local job = xPlayer.job.job or "unemployed"
    rank = tonumber(rank)

    -- Check for valid rank
    if not rank or (rank < 1 or rank > #CoreCFG.Ranks[job]) then
        PrintError('Invalid rank ('.. rank ..') passed to GetPlayerXPToRank method')
        return
    end

    local goalXP = tonumber(CoreCFG.Ranks[job][rank].XP)

    return goalXP - currentXP
end

--- @brief Function to check rank
function Levels:CheckRanks(job)
    local Limit = #CoreCFG.Ranks[job]
    local InValid = {}

    for i = 1, Limit do
        local RankXP = CoreCFG.Ranks[job][i].XP

        if not IsInt(RankXP) then
            table.insert(InValid, string.format('Rank %s: %s', i,  RankXP))
            PrintError(string.format('Invalid XP (%s) for Rank %s', RankXP, i))
        end

    end

    return InValid
end

----------------------------------------------------
--                    EXPORTS                     --
----------------------------------------------------

Package.Export('GetPlayerXP', function(xPlayer) return Levels:GetPlayerXP(xPlayer) end) -- working
Package.Export('GetPlayerRank', function(xPlayer) return Levels:GetPlayerRank(xPlayer) end) -- working
Package.Export('GetPlayerXPToRank', function(playerId, rank) return Levels:GetPlayerXPToRank(playerId, rank) end) -- working
Package.Export('GetPlayerXPToNextRank', function(playerId) return Levels:GetPlayerXPToNextRank(playerId) end) -- working