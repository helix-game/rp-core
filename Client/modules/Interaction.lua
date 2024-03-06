local InteractionMenu = Core.RegisterHUD('interaction', 'file://ui/modules/interaction/interaction.html')


local gmatch = string.gmatch
-- @brief Event that is called when the player interacts with an NPC and selects an option from the interaction menu.
-- @param id: The id of the option selected. The id is in the format "a.b.c" where a, b, and c are integers representing the index of the option in the options table.
-- @param closed: A boolean representing if the interaction menu is closed or open.
InteractionMenu.Subscribe('Interaction:Response', function(id, closed)
    if closed then
        InteractionMenu.Focus(false, true)
    end

    if not id then
        return
    end

    -- @brief Function that traverses the options table to find the option with the corresponding id.
    -- @param options: The options table to traverse.
    -- @param idTable: The table containing the integers of the id (node path).
    -- @return The option with the corresponding id or nil if it doesn't exist.
    function getOption(options, idTable)
        local option = options
        -- Iterate through the idTable and access the corresponding option in the options table.
        for i=1, #idTable do
            if option then
                option = option.options[idTable[i]]
            else
                return nil
            end
        end
        return option
    end

    local idTable = {}
    -- Split the id string into a table of integers.
    for i in gmatch(id, "[^.]+") do
        table.insert(idTable, tonumber(i))
    end

    -- Get the option with the corresponding id.
    local option = getOption(Core.InteractionSetup, idTable)
    -- If the option has a fnc field, call the function.
    if option and option.fnc then
        Timer.SetTimeout(function()
            option.fnc(id)
        end, 2000)
    end
end)