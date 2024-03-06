local Levels = {}
-- local PlayerJob = "Loading"
-- local PlayerRank = "Loading"
-- local PlayerXP = "Loading"

----------------------------------------------------
--                 Canvas                         --
----------------------------------------------------
-- HUDCanvas = Canvas(true, Color.TRANSPARENT, 0, true)

--- @brief Function to initialize the player's job data.
-- @param data: The data to initialize the player's job data with. It contains XP - Job - Rank
function Levels:Init(data)
    self.CurrentXP = tonumber(data.xp)
    self.CurrentRank = tonumber(data.rank)
    self.CurrentJob = tostring(data.job)

    Client.SendChatMessage('Your current job is: ' .. self.CurrentJob)
    Client.SendChatMessage('Your current job XP is: ' .. self.CurrentXP)
    Client.SendChatMessage('Your current job rank is: ' .. self.CurrentRank)
    local info = {
        job = self.CurrentJob,
        rank = self.CurrentRank,
        xp = self.CurrentXP
    }
    UpdateStats(info)
end

-- HUDCanvas:Subscribe("Update", function(self, width, height)
--     -- Gets the Local Player
--     local local_player = Client.GetLocalPlayer()
--     if (not local_player) then return end

--     local local_character = local_player:GetControlledCharacter()
--     if (not local_character) then return end

--     self:DrawText(tostring("Player Job: "..PlayerJob), Vector2D(100, height - 120), FontType.PoiretOne, 25, Color.WHITE)
--     self:DrawText(tostring("Player Job Rank: "..PlayerRank), Vector2D(100, height - 80), FontType.PoiretOne, 25, Color.WHITE)
--     self:DrawText(tostring("Player Job XP: "..PlayerXP), Vector2D(100, height - 40), FontType.PoiretOne, 25, Color.WHITE)
-- end)

function UpdateStats(data)
    PlayerJob = data.job or PlayerJob
    PlayerRank = data.rank or PlayerRank
    PlayerXP = data.xp or PlayerXP
    -- HUDCanvas:Repaint()
    Levels:OnSave(data)
end

----------------------------------------------------
--                 SERVER EVENT                   --
----------------------------------------------------

-- @brief Event to update the player's job data.
-- @param data: The data to update the player's job data with. It contains the player's job, rank and xp.
function Levels:OnSave(data)
    Events.CallRemote('Job-Levels:Server:SaveData', self.CurrentXP, self.CurrentRank, self.CurrentJob)
end

----------------------------------------------------
--                    SETTERS                     --
----------------------------------------------------
--- @brief Function to add xp to the player's job.
-- @param xp: The amount of xp to add to the player's job.
-- @param job: The job to add the xp to.
function Levels:AddXP(xp, job)
    if not IsInt(xp) then
        return
    end

    local currentXP = self.CurrentXP
    local newXP = currentXP + xp
    self:SetData(newXP, job)
end

--- @brief Function to remove xp from the player's job.
-- @param xp: The amount of xp to remove from the player's job.
-- @param job: The job to remove the xp from.
function Levels:RemoveXP(xp, job)
    if not IsInt(xp) then
        return
    end

    local newXP = self:GetXP() - xp

    self:SetData(newXP, job)
end

--- @brief Function to set the player's job xp.
-- @param xp: The amount of xp to set the player's job to.
-- @param job: The job to set the xp to.
function Levels:SetXP(xp, job)
    if not IsInt(xp) then
        return
    end

    self:SetData(xp, job)
end

--- @brief Function to set the player's job rank.
-- @param rank: The rank to set the player's job to.
-- @param job: The job to set the rank to.
function Levels:SetRank(rank, job)
    rank = tonumber(rank)

    if not rank or not Config.Ranks[job][rank] then
        PrintError('Invalid rank (' .. tostring(rank) .. ') passed to SetRank method')
        return
    end

    local newXP = Config.Ranks[job][rank].XP

    if newXP ~= nil then
        if newXP > self.CurrentXP then
            self:AddXP(newXP - self.CurrentXP)
        elseif newXP < self.CurrentXP then
            self:RemoveXP(self.CurrentXP - newXP)
        end
    end
end

--- @brief Function to set the player's job data.
-- @param xp: The amount of xp to set the player's job to.
-- @param job: The job to set the xp to.
function Levels:SetData(xp, job)
    self.CurrentXP = self:LimitXP(xp, job)
    self.CurrentRank = self:GetRank(xp, job)
    self.CurrentJob = job
    local data = {
        job = self.CurrentJob,
        rank = self.CurrentRank,
        xp = self.CurrentXP
    }
    UpdateStats(data)
end


----------------------------------------------------
--                    GETTERS                     --
----------------------------------------------------

--- @brief Function to get the player's job XP.
function Levels:GetXP()
    return tonumber(self.CurrentXP)
end

--- @brief Function to get the job MaxXP
-- @param job: The job to get the MaxXP from.
function Levels:GetMaxXP(job)
    return Config.Ranks[job][#Config.Ranks[job]].XP
end

--- @brief Function to get the player's XPToNextRank
-- @param job: The job to get the XPToNextRank from.
function Levels:GetXPToNextRank(job)
    local currentRank = PlayerRank

    if currentRank >=  #Config.Ranks[job] then
        return "Max level"
    end

    return Config.Ranks[job][currentRank + 1].XP - tonumber(self.CurrentXP)
end

--- @brief Function to get the XP to a specific rank .
-- @param rank: The rank to get the XP to.
function Levels:GetXPToRank(rank, job)
    local GoalRank = tonumber(rank)

    if not Config.Ranks[job][rank] or not GoalRank or (GoalRank < 1 or GoalRank > #Config.Ranks[job]) then
        PrintError('Invalid rank ('.. GoalRank ..') passed to GetXPToRank method')
        return
    end

    local goalXP = tonumber(Config.Ranks[job][GoalRank].XP)

    return goalXP - self.CurrentXP
end

--- @brief Function to get the player's job rank.
-- @param xp: The amount of xp to get the player's job rank from.
-- @param job: The job to get the rank from.
function Levels:GetRank(xp, job)
    local len = #Config.Ranks[job]
    for rank = 1, len do
        if rank < len then
            if Config.Ranks[job][rank + 1].XP > tonumber(xp) then
                return rank
            end
        else
            return rank
        end
    end
end

--- @brief Function to get a job max rank.
-- @param job: The job to get the max rank from.
function Levels:GetMaxRank(job)
    return #Config.Ranks[job]
end

----------------------------------------------------
--                    UTILITIES                   --
----------------------------------------------------

-- @brief Prevent XP from going over / under limits
-- @param xp: The amount of xp to limit.
-- @param job: The job to limit the xp to.
function Levels:LimitXP(xp, job)
    local Max = tonumber(Config.Ranks[job][#Config.Ranks[job]].XP)

    if xp > Max then
        xp = Max
    elseif xp < 0 then
        xp = 0
    end

    return xp
end

----------------------------------------------------
--                 EVENT HANDLERS                 --
----------------------------------------------------

Events.Subscribe('xperience:client:init', function(...) Levels:Init(...) end)
Events.Subscribe('xperience:client:addXP', function(...) Levels:AddXP(...) end)
Events.Subscribe('xperience:client:removeXP', function(...) Levels:RemoveXP(...) end)
Events.Subscribe('xperience:client:setXP', function(...) Levels:SetXP(...) end)
Events.Subscribe('xperience:client:setRank', function(...) Levels:SetRank(...) end)

----------------------------------------------------
--                    EXPORTS                     --
----------------------------------------------------

Package.Export('AddXP', function(...) Levels:AddXP(...) end)
Package.Export('RemoveXP', function(...) return Levels:RemoveXP(...) end)
Package.Export('SetXP', function(...) return Levels:SetXP(...) end)
Package.Export('SetRank', function(...) return Levels:SetRank(...) end)
Package.Export('GetXP', function() return Levels:GetXP() end)
Package.Export('GetMaxXP', function(...) return Levels:GetMaxXP(...) end)
Package.Export('GetXPToRank', function(...) return Levels:GetXPToRank(...) end)
Package.Export('GetXPToNextRank', function(...) return Levels:GetXPToNextRank(...) end)
Package.Export('GetRank', function(...) return Levels:GetRank(...) end)
Package.Export('GetMaxRank', function(...) return Levels:GetMaxRank(...) end)

--- @brief Some debug commands 
Chat.Subscribe("PlayerSubmit", function (text, player)
    if text == "jobinfo" then
        local MaxXP = Levels:GetMaxXP("taxi")
        print('this is the max xp: '..MaxXP)
        local MaxRank = Levels:GetMaxRank("taxi")
        print('this is the max rank: '..MaxRank)
        local CurrentXP = Levels:GetXP()
        print('this is the current xp: '..CurrentXP)
        local CurrentRank = Levels:GetRank(CurrentXP, "taxi")
        print('this is the current rank: '..CurrentRank)
        local XPToNextRank = Levels:GetXPToNextRank("taxi")
        print('this is the xp to next rank: '..XPToNextRank)
        local XPToRank = Levels:GetXPToRank(2, "taxi")
        print('this is the xp to rank 2: '..XPToRank)

        if text == "add" then
            Levels:AddXP(100, "taxi")
        end

        if text == "remove" then
            Levels:RemoveXP(100, "taxi")
        end

        if text == "set" then
            Levels:SetXP(100, "taxi")
        end

        if text == "setrank" then
            Levels:SetRank(2, "taxi")
        end

    end
    return true
end)