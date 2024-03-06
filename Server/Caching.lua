-- Precaching, when a player is loading into the server it will load these models, reducing any major lag.
-- NEEDS MORE TESTING
for vehicleModel, cfg in pairs(Core.VehicleModels) do
    Assets.Precache(cfg.asset, AssetType.StaticMesh)
end