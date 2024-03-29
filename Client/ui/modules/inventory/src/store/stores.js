import { writable } from 'svelte/store';
import INVENTORY_STATES from '../state';


const parseData = (arr) => {
    var isArray = !Array.isArray(arr)
    if (isArray && typeof arr == 'object')
        return arr;

    if (isArray)
        return {};

    var obj = {}

    arr.forEach(x => {
        obj[x.slot] = x
    })

    return obj
}

export const closeContext = writable(() => {});

export const dragging = writable(null);

export const focusedInventory = writable();

export const inventoryData = writable(
    {
        "id": "9",
        "pockets": parseData([
            { "count": 12, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 1, "type": "item", "unique": true, "weight": 1 },
            { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 2, "type": "item", "unique": true, "weight": 1 },
        ]),
        "slots": parseData([
            // { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 1, "type": "item", "unique": true, "weight": 1 },
            // { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 2, "type": "item", "unique": true, "weight": 1 },
            // { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 8, "type": "item", "unique": true, "weight": 1 },
            // { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 9, "type": "item", "unique": true, "weight": 1 },
            // { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 4, "type": "item", "unique": true, "weight": 1 },
            // { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 3, "type": "item", "unique": true, "weight": 1 },
        ]),
        "source": {
            name: "Opod",
            profile: ""
        },
        weight: [10, 100]
    }
)

export const useOptimisationMode = writable(true)
    
export const otherInventoryData = writable()

export const inventory_visible = writable(false);

export const inventory_state = writable(INVENTORY_STATES.PERSONAL_INVENTORY);