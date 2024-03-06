Locales = {}

Locale = {
    lang = (Config and Config.Locale) or 'en'
}

Locale.SetLocale = function(lang)
    Locale.lang = lang
end

Locale.GetLocale = function()
    return Locale.lang
end

local sformat = string.format

_U = function(str, ...)    
    if not Locales[Locale.lang][str] then return end

    return sformat(Locales[Locale.lang][str], ...)
end

Package.Export('_U', _U)