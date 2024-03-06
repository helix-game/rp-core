<script>
    import { inventoryData, otherInventoryData } from "../../store/stores";
    import Container from "../Inventories/Container.svelte";
</script>

<div class="other--view--wrapper">
    <Container data={$inventoryData} showIndicator={false}/>
    <Container data={$otherInventoryData} showIndicator={false} invert={true} />
</div>

<style>
    .other--view--wrapper {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        gap: 94px;
    }
</style>