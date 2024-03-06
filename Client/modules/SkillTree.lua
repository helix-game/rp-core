-- CoreCFG.Skills.Workshops
local isBusy = false

for k, v in ipairs(CoreCFG.Skills.Degrees) do
    local point = Core.CreateMarker({
        coords = v.coords,
        distance = v.distance,
        marker = {
            type = Markers.Cylinder,
        },
        text = {
            text = 'Press [F] to buy degrees'
        },
        prompt = {
            text = 'Purchase Degree',
            key = 'F'
        },
        interactions = 'F'
    })
    
    function point:onEnter()
        if isBusy then return end
        self:showMarker()
    end

    function point:nearby()
        if isBusy then return end

        if self.currentDistance <= 100.0 then
            self:showText()
            self:showPrompt()

            if self:isKeyJustReleased('F') then
                local elements = {}

                for k, v in ipairs(v.degrees) do
                    table.insert(elements, { label = ("%s - $%d"):format(v.degree, v.price), degree = v.degree, price = v.price } )
                end

                Core.OpenMenu("select", {
                    title = "Purchase Degrees",
                    description = "Some degrees may be unavailable due to your level",
                    elements = elements
                }, function(data, menu)
                    Events.CallRemote('skilltree:AttemptPurchase', data.degree)
                    menu.close()
                end, function(menu)
                    menu.close()
                end)
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

    CoreCFG.Skills.Degrees[k].marker = point
end

for k, v in ipairs(CoreCFG.Skills.Workshops) do
    local point = Core.CreateMarker({
        coords = v.coords,
        distance = v.distance,
        marker = {
            type = Markers.Cylinder,
        },
        text = {
            text = 'Press [F] to perform task'
        },
        interactions = 'F'
    })

    function point:onEnter()
        if isBusy then return end
        self:showMarker()
    end
    
    function point:nearby()
        if isBusy then return end
        
        if self.currentDistance <= 100.0 then
            self:showText()
            
            if self:isKeyJustReleased('F') then
                Core.TriggerCallback('skilltree:CheckForSkill', function(hasSkill)
                    if not hasSkill then
                        return Core.ShowNotification("You don't have this skill!")
                    end
    
                    isBusy = true
                    self:hideMarker()
                    self:hideText()
                    
                    Core.ProgressBar({
                        duration = 500,
                        label = v.label,
                        disable = {
                            movement = true
                        },
                        onFinish = function(canceled)
                            isBusy = false
                            self:showMarker()
                            
                            if canceled then
                                return Core.ShowNotification("You CANCELLED your task!")
                            end
                            
                            Core.ShowNotification("You FINISHED your task!")
                            
                            Events.CallRemote('skilltree:FinishTask', v.unit)
                        end
                    })
                end, v.unit)
            end
        else
            self:hideText() 
        end
    end
    
    function point:onExit()
        self:hideText()
        self:hideMarker()
    end

    CoreCFG.Skills.Workshops[k].marker = point
end