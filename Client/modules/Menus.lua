Core.MenusOpened = {
    ['select'] = {},
    ['confirm'] = {},
    ['action'] = {},
    ['input'] = {}
}

Core.ActionMenu = {}

local SelectHUD = Core.RegisterHUD('select', 'file://ui/modules/select/select.html')
local InputHUD = Core.RegisterHUD('input', 'file://ui/modules/input/input.html')
local ConfirmHUD = Core.RegisterHUD('confirm', 'file://ui/modules/confirm/confirm.html')
local ActionHUD = Core.RegisterHUD('action', 'file://ui/modules/action/action.html')

local prevMouseState = false


function Core.OpenMenu(_type, options, onSubmit, onCancel)
    if Client.GetValue('isBusy') == true then return end
    
    if not Core.MenusOpened[_type] then return print('type don\'t exist') end
    local invokingPackage = debug.getinfo(2).source
    local eos = (invokingPackage):find('/') - 1
    invokingPackage = (invokingPackage):sub(1, eos)
    
    Events.Call('CloseAllMenus') -- This will close all menus that are opened 

    local TargetHUD = nil
    if _type == 'select' then
        Core.MenusOpened[_type] = { invokingPackage = invokingPackage, closeEvent = "SelectMenu:Exit", title = options.title, description = options.description, elements = options.elements, onSubmit = onSubmit, onCancel = onCancel }
        SelectHUD.Call("SelectMenu:Init", options.title, options.description, options.elements)
        TargetHUD = SelectHUD
    elseif _type == 'confirm' then
        Core.MenusOpened[_type] = { invokingPackage = invokingPackage, closeEvent = "ConfirmMenu:Exit", title = options.title, description = options.description, price = options.price, onSubmit = onSubmit, onCancel = onCancel }
        ConfirmHUD.Call("ConfirmMenu:Init", options.title, options.description, options.price)
        TargetHUD = ConfirmHUD
    elseif _type == 'action' then
        Core.MenusOpened[_type] = { invokingPackage = invokingPackage, closeEvent = "ActionMenu:Exit", title = options.title, description = options.description, elements = options.elements, categories = options.categories, onSubmit = onSubmit, onCancel = onCancel }
        ActionHUD.Call("ActionMenu:Init", options.elements, options.forceOpen)
        TargetHUD = ActionHUD
    elseif _type == 'input' then
        Core.MenusOpened[_type] = { invokingPackage = invokingPackage, closeEvent = "InputMenu:Exit", title = options.title, description = options.description, inputType = options.inputType, onSubmit = onSubmit, onCancel = onCancel }
        InputHUD.Call("InputMenu:Init", options.title, options.description)
        TargetHUD = InputHUD
    end
    
    TargetHUD.Focus(true, false)
    prevMouseState = Input.IsMouseEnabled()
end

function Core.IsMenuOpened(menu)
    return Core.MenusOpened[menu]
end

function Core.GetMenusOpened()
    local menus_opened = {}
    for k, v in pairs(Core.MenusOpened) do
        if v.elements then
            menus_opened[k] = v
        end
    end

    return menus_opened
end

function Core.AddAction(id, category, element)
    if type(id) == 'table' then
        for k, v in ipairs(id) do
            Core.AddAction(v.id, v.category, v.element)
        end
        return
    end

    Core.ActionMenu[id] = { category = category, element = element }
end

function Core.RemoveAction(id)
    Core.ActionMenu[id] = nil
end

SelectHUD.Subscribe("SelectMenu:Respond", function(id)
    local target = Core.MenusOpened["select"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["select"] = {}

        SelectHUD.Call('SelectMenu:Exit')
        SelectHUD.Focus(not prevMouseState, prevMouseState)
    end

    id = tonumber(id)
    target.onSubmit(target.elements[id], menu)
end)

ActionHUD.Subscribe("ActionMenu:Respond", function(id)
    local target = Core.MenusOpened["action"]
    if not target then return end

    id = tonumber(id)
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["action"] = {}

        ActionHUD.Call("ActionMenu:Exit")
        ActionHUD.Focus(not prevMouseState, prevMouseState)
    end

    -- Check if its triggering a category
    if target.categories[target.elements[id].value] then
        menu.close()
        local initElements = {} 
        for k, v in pairs(Core.ActionMenu) do
            if v.category == target.elements[id].value then
                table.insert(initElements, v.element)
            end
        end

        Core.OpenMenu('action', {
            elements = initElements,
            categories = target.categories,
            forceOpen = true
        }, function(data, menu)
            target.onSubmit(data, menu)
        end)
       return 
    end

    local event = target.elements[id].event
    if event then
        return Events.Call(event)
    end
    local func = target.elements[id].func
    
    if func then
        return func()
    end

    target.onSubmit(target.elements[id], menu)
end)

ConfirmHUD.Subscribe("ConfirmMenu:Respond", function()
    local target = Core.MenusOpened["confirm"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["confirm"] = {}
        
        ConfirmHUD.Call("ConfirmMenu:Exit")
        ConfirmHUD.Focus(not prevMouseState, prevMouseState)
    end

    target.onSubmit(menu)
end)

InputHUD.Subscribe("InputMenu:Respond", function(text)
    local target = Core.MenusOpened["input"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["input"] = {}
        InputHUD.Call("InputMenu:Exit")
        InputHUD.Focus(not prevMouseState, prevMouseState)
    end

    if target.inputType == 'number' then
        text = tonumber(text)
    end

    target.onSubmit(text, menu)
end)

InputHUD.Subscribe("InputMenu:Cancel", function()
    local target = Core.MenusOpened["input"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["input"] = {}
        InputHUD.Call("InputMenu:Exit")
        InputHUD.Focus(not prevMouseState, prevMouseState)
    end

    target.onCancel(menu)
end)

SelectHUD.Subscribe("SelectMenu:Cancel", function()
    local target = Core.MenusOpened["select"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["select"] = {}
        SelectHUD.Call("SelectMenu:Exit")
        SelectHUD.Focus(not prevMouseState, prevMouseState)
    end

    target.onCancel(menu)
end)

ConfirmHUD.Subscribe("ConfirmMenu:Cancel", function()
    local target = Core.MenusOpened["confirm"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["confirm"] = {}

        ConfirmHUD.Call("ConfirmMenu:Exit")
        ConfirmHUD.Focus(not prevMouseState, prevMouseState)
    end

    target.onCancel(menu)
end)

ActionHUD.Subscribe("ActionMenu:Cancel", function()
    local target = Core.MenusOpened["action"]
    if not target then return end
    
    local menu = {}
    
    function menu.close()
        Core.MenusOpened["action"] = {}
        ActionHUD.Call("ActionMenu:Exit")
        ActionHUD.Focus(not prevMouseState, prevMouseState)
    end

    target.onCancel(menu)
end)