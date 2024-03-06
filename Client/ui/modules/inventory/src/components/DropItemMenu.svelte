<script>
    import ConfirmMenu from "./ConfirmMenu/ConfirmMenu.svelte";

    export let data;
    export let active;

    const onConfirmMenuCancelled = e => {
        active = false
    }
    
    const onConfirmMenuConfirmed = e => {
        active = false
        if (typeof Events !== 'undefined')
        {
            Events.Call("DropItem", { item: data.item, inventory: data.inventory });
        }
    }

</script>

<ConfirmMenu on:menuCancelled={onConfirmMenuCancelled} on:menuConfirmed={onConfirmMenuConfirmed} {data} />