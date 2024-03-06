local SkillLevels = CoreCFG.Skills.SkillLevels
local SkillData = CoreCFG.Skills.SkillData
local RootSkills = CoreCFG.Skills.RootSkills

local SkillTasks = {}

Core.RegisterSavedVariable('skillTasksCompleted', 'users', nil, {})
Core.RegisterSavedVariable('skillLevels', 'users', nil, {})

for k, v in pairs(SkillData) do
    local skillLevels = SkillLevels[k]
    if skillLevels then
        v.maxLevel = #skillLevels
    end
end

for k, v in pairs(CoreCFG.Skills.Workshops) do
    SkillTasks[v.unit] = true
end

Core.CreateCallback('skilltree:CheckForSkill', function(player, cb, task)
    local pid = player:GetID()
    local xPlayer = Core.GetPlayerFromId(pid)
    local levels = xPlayer.get('skillLevels')

    local skill = FindSkillFromTask(task, levels)

    cb(HasSkillUnlocked(xPlayer, skill))
end)

Events.SubscribeRemote('skilltree:AttemptPurchase', function(player, skill)
    local pid = player:GetID()
    local xPlayer = Core.GetPlayerFromId(pid)
    

    if HasSkillUnlocked(xPlayer, skill) then
        return xPlayer.showNotification("You already own this!")
    end

    if CanSkillUnlock(xPlayer, skill) == false then
        return xPlayer.showNotification("You can't unlock this yet!")
    end
    
    UnlockSkill(xPlayer, skill)
    xPlayer.showNotification("You unlocked a new skill!")
end)

Events.SubscribeRemote('skilltree:FinishTask', function(player, task)
    if SkillTasks[task] == nil then return end

    local pid = player:GetID()
    local xPlayer = Core.GetPlayerFromId(pid)
    local skillsCompleted = xPlayer.get('skillTasksCompleted')
    skillsCompleted[task] = (skillsCompleted[task] or 0) + 1

    
    local levels = xPlayer.get('skillLevels')
    local skill = FindSkillFromTask(task, levels)
    if not HasSkillUnlocked(xPlayer, skill) then
        return print('skill not unlocked')
    end
    
    local level = levels[skill]
    local required = SkillLevels[skill][level]

    local canLevelup, maxLevelReached = CheckForLevelUp(required, skillsCompleted, skill, level)
    if canLevelup then
        for i = 1, #required do
            local v = required[i]
            skillsCompleted[v.unit] = skillsCompleted[v.unit] - v.required
            if skillsCompleted[v.unit] < 0 then
                skillsCompleted[v.unit] = 0
            end
        end

        xPlayer.showNotification("You leveled up!")
    end
    
    if maxLevelReached then
        xPlayer.showNotification("You reached max level!")
    end

    xPlayer.set('skillTasksCompleted', skillsCompleted)
end)

function UnlockSkill(xPlayer, skill)
    local unlockedSkills = xPlayer.get('skillLevels')

    unlockedSkills[skill] = 1

    xPlayer.set('skillLevels', unlockedSkills)
end

function FindSkillFromTask(task, p_levels)
    for skill, levels in pairs(SkillLevels) do
        if p_levels[skill] then
            local requiredUnits = levels[p_levels[skill]] -- v[1] -- v[level]
            for i = 1, #requiredUnits do
                local y = requiredUnits[i]
                if y.unit == task then
                    return skill
                end
            end
        end
    end
end

function HasSkillUnlocked(xPlayer, skill)
    local unlockedSkills = xPlayer.get('skillLevels')
    return unlockedSkills[skill] ~= nil or RootSkills[skill] ~= nil
end

function CanSkillUnlock(xPlayer, skill)
    local unlockedSkills = xPlayer.get('skillLevels')
    local target_skill_data = SkillData[skill]

    if unlockedSkills[target_skill_data.skill_required] == nil and CoreCFG.Skills.RootSkills[target_skill_data.skill_required] == nil then
        return false
    end

    if target_skill_data.level_required and (unlockedSkills[target_skill_data.skill_required] < target_skill_data.level_required and CoreCFG.Skills.RootSkills[target_skill_data.level_required] == nil) then
        return false
    end

    return true
end

function CheckForLevelUp(required, skillsCompleted, skill, level)
    for i = 1, #required do
        local v = required[i]
        local amount = skillsCompleted[v.unit] or 0
        if amount < v.required then
            return false
        end
    end

    local maxLevel = level == SkillData[skill].maxLevel 

    return level - 1 < SkillData[skill].maxLevel, maxLevel
end