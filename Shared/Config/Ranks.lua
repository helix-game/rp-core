CoreCFG.Ranks = {
    ["unemployed"] = {
        [1] = { 
            XP = 0
        }
    },
    ["taxi"] = { -- jobs always in lowercase
        [1] = {
            XP = 0,
            short_reward = 500,
            long_reward = 1000
        },
        [2] = {
            XP = 490, -- The XP required to reach this rank
            short_reward = 500,
            long_reward = 1000
        },
        [3] = { 
            XP = 2100,
            multipier = 1.2,
            short_reward = 500,
            long_reward = 1000
        },
    },

    ["electrician"] = {
        [1] = { 
            XP = 0,
            multipier = 1,
            short_reward = 500,
            long_reward = 1000
        },
        [2] = {
            XP = 800, -- The XP required to reach this rank
            short_reward = 500,
            long_reward = 1000,
        },
        [3] = { 
            XP = 2100,
            multipier = 1.2,
            short_reward = 500,
            long_reward = 1000
        },
    }
} 
