function Core.GetConfig()
    return Config
end

local StringCharset = {}
local NumberCharset = {}


local random = math.random
local char = string.char

for i = 48, 57 do NumberCharset[#NumberCharset + 1] = char(i) end
for i = 65, 90 do StringCharset[#StringCharset + 1] = char(i) end
for i = 97, 122 do StringCharset[#StringCharset + 1] = char(i) end


function Core.GetRandomStr(length)
    if length <= 0 then return '' end
    return Core.GetRandomStr(length - 1) .. StringCharset[random(1, #StringCharset)]
end

function Core.GetRandomInt(min, max)
    if max == nil then
        max = min
        min = 1
    end

    if max <= 0 then return '' end

    return Core.GetRandomInt(min, max - 1) .. NumberCharset[random(min, #NumberCharset)]
end