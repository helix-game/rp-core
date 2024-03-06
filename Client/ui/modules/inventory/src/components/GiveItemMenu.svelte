<script>
    import ConfirmMenu from "./ConfirmMenu/ConfirmMenu.svelte";
    import PlayerListMenu from "./PlayerList/PlayerListMenu.svelte";

    export let data;
    export let active;

    var playerSelected = false;
    var payload = {};

    const onConfirmMenuCancelled = e => {
        active = false
    }
    
    const onConfirmMenuConfirmed = e => {
        active = false
        if (typeof Events !== 'undefined')
            Events.Call("GiveItem", { item: payload.item, inventory: data.inventory, target: data.target.source })
    }

    const handlePlayerSelected = e => {
        payload.item = {};
        payload.item.count = e.detail.itemAmount; 
        payload.item.name = data.item.name;

        data.target = e.detail.target

        playerSelected = true;
    }
</script>

{#if playerSelected}
    <ConfirmMenu on:menuCancelled={onConfirmMenuCancelled} on:menuConfirmed={onConfirmMenuConfirmed} {data} {payload} />
{:else}
    <PlayerListMenu {data} on:playerSelected={handlePlayerSelected} />
{/if}