Core.Weapons = {
    ['AK47'] = {
        meshes = {
            body = "helix::SK_AK47",
            mag = "helix::SM_AK47_Mag_Empty"
        },
        crosshair = "helix::MI_Crosshair_Regular",
        clip_capacity = 30,
        damage = 20,
        spread = 20,
        recoil = 0.25,
        bullet_settings = {
            count = 1,
            max_dist = nil,
            velocity = nil,
            color = nil,
            speed = nil
        },
        sight_transform = {
            location = Vector(0, 0, 0),
            rotation = Rotator(0, 0, 0)
        },
        left_hand_transform = {
            location = Vector(0, 0, 0),
            rotation = Rotator(0, 0, 0)    
        },
        right_hand_offset = Vector(0, 0, 0),
        handling_mode = HandlingMode.DoubleHandedWeapon,
        wallbang_settings = {
            max_dist = nil,
            damage_multi = 0.8
        },
        particles = {
            bullet_trail = "helix::P_Bullet_Trail",
            barell_smoke = "helix::P_Weapon_BarrelSmoke",
            shell_eject = "helix::P_Weapon_Shells_762x39",
        },
        sounds = {
            dry = "helix::A_Rifle_Dry",
            load = "helix::A_Rifle_Load",
            unload = "helix::A_Rifle_Unload",
            zoom = "helix::A_AimZoom",
            scope = "helix::A_Rattle",
            shoot = "helix::A_AK47_Shot"
        },
        animations = {
            player_shoot = "helix::AM_Mannequin_Sight_Fire",
            reload = "helix::AM_Mannequin_Reload_Rifle",
            shoot = "helix::A_AK47_Fire",
        },
    },
}