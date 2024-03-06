<script>
    import { inventoryData } from "../../store/stores";
    import Container from "../Inventories/Container.svelte";
    import InventoryBrowseItem from "../InventoryBrowseItem.svelte";

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

    export let data = [
        {
            "id": "9",
            "pockets": parseData([
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 4, "type": "item", "unique": true, "weight": 1 },
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 5, "type": "item", "unique": true, "weight": 1 },
            ]),
            "slots": parseData([
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 1, "type": "item", "unique": true, "weight": 1 },
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 2, "type": "item", "unique": true, "weight": 1 },
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 8, "type": "item", "unique": true, "weight": 1 },
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 9, "type": "item", "unique": true, "weight": 1 },
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 4, "type": "item", "unique": true, "weight": 1 },
                { "count": 1, "description": "Mobile phone", "label": "Phone", "name": "phone", "rarity": "Common", "slot": 3, "type": "item", "unique": true, "weight": 1 },
            ]),
            "source": {
                name: "Opod",
                profile: ""
            }
        }
    ];
</script>

<Container personal={true} data={$inventoryData} />
<div class="scroller">
    {#each data as {id, pockets, slots, source, weight, label} (id) }
        <InventoryBrowseItem label={id} data={{id, pockets, slots, source, weight, label}} identifier={id} {weight} />
    {/each}
</div>

<style>
    .scroller {
        width: 593px;
        height: 872px;
        position: absolute;
        right: 193px;
        bottom: 60px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-right: 28px;
    }

    .scroller {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.85) rgba(255, 255, 255, 0.15);
    }

    .scroller::-webkit-scrollbar {
        width: 2px;
    }

    .scroller::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.15);
    }

    .scroller::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 14px;
        border: 3px solid rgba(255, 255, 255, 0.85);
    }
</style>