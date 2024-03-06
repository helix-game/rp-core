<script>
    import { inventoryData } from "../../store/stores";
    
    
    import Clothing from "../Inventories/Clothing.svelte";
    import Container from "../Inventories/Container.svelte";
    import StatusIndicators from "../StatusIndicators.svelte";

</script>
<div class="personal--inventory">
    <Container personal={true} data={$inventoryData} />
    <Clothing />
    <StatusIndicators />
</div>