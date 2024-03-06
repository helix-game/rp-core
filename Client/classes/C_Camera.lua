local active_camera = nil

function CreateCamera(coords, rotation)
    local self = {}

    self.player = Client.GetLocalPlayer()
    self.active = false
    self.freeCam = false

    -- TODO: FILTERS

    function self.SetCamActive(bool)
        if self.active == bool then return end
        self.active = bool

        if bool == true then
            active_camera = self
        else
            if self == active_camera then
                active_camera = nil
            end
        end

        self.EnableFreecam(self.freeCam)
        Events.CallRemote("pcrp-core:SetCamActive", bool)
    end

    function self.EnableFreecam(bool)        
        self.freeCam = bool
    end

    function self.SetPosition(vector)
        self.player:SetCameraLocation(vector)

        return vector
    end

    function self.SetRotation(rotation)
        self.player:RotateCameraTo(rotation)

        return rotation
    end

    function self.Destroy()
        self.SetCamActive(false)
        self = nil
    end

    self.position = (coords and self.SetPosition(coords)) or self.player:GetCameraLocation()
    self.rotation = (rotation and self.SetRotation(rotation)) or self.player:GetCameraRotation()

    return self
end
