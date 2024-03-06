Core.VehicleShops = {
    ['YamieVehicleShop'] = {
        coords =  Vector(750.90002441406, -2513.8000488281, 98.199996948242),
        name = 'Yamie CarShop',
        owner = "Yamie Hasan",
        employees = {},
        vehicles = {
            ['Spot_1'] = {
                testAllowed = true, -- Is test drive allowed on this vehicle?
                company = "Toyota",
                model = "Wagon 56",
                spawn = "Wagon",
                coords = Vector(750.90002441406, -2513.8000488281, 98.199996948242),
                rotation = Rotator(0.0, 360.0, 0.0),
                price = 100,
                description = "Runs good, Reliable Car.",
                stock = 3,
            },
            -- ['Spot_2'] = {
            --     testAllowed = true, -- Is test drive allowed on this vehicle?
            --     company = "Subaru",
            --     model = "SUV 50",
            --     spawn = "SUV",
            --     coords = Vector(729.40002441406, -3315.1000976562, 98.099998474121),
            --     rotation = Rotator(0.0, 360.0, 0.0),
            --     price = 200,
            --     description = "Runs good, Reliable Suv.",
            --     stock = 2,
            -- }
        },
        test_drive = {
            TimeLimit = 20, -- in seconds
            Cost = 0,
            Spawn = {
                coords = Vector(1917.0, -2855.8000488281, 98.199996948242),
                rotation = Rotator(0.0, 360.0, 0.0),
            }
        },
        purchased_vehicle = {
            Spawn = {
                coords = Vector(1917.0, -2855.8000488281, 98.199996948242),
                rotation = Rotator(0.0, 360.0, 0.0),
            },
        }
    }
}