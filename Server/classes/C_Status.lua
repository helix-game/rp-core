function CreateStatus(name, value)
    local self = {}

    self.max    = value
    self.value  = value
    self.name   = name

    function self.UpdateValue(amount)
        self.value = amount
    end

    function self.AddValue(amount)
        self.value = self.value + amount
    end

    function self.RemoveValue(amount)
        self.value = self.value - amount
    end

    function self.Reset()
        self.value = self.max
    end

    function self.Serialise()
        return { value = self.value, max = self.max, name = self.name }
    end

    return self
end