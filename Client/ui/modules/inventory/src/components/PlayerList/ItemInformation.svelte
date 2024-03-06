<script>
    import ItemQuantity from "./ItemQuantity.svelte";
    import SplitButton from "./SplitButton.svelte";

    export let itemAmount;
    export let data;

    var maxAmount = data.item.count;

</script>
<div class="item--information">
    <div class="grouping">
        <div class="item--image">
            <div class="image" style="background-image: url(./assets/items/{data.item.name}.png);"></div>
        </div>
        <div class="transaction--data">
            <div class="top">
                {data.item.label}
            </div>
            <div class="bottom">
                <ItemQuantity bind:itemAmount={itemAmount} {maxAmount} />
            </div>
        </div>
    </div>

    <div class="action--buttons">
        <SplitButton percentage={0.25} label={"25%"} bind:itemAmount={itemAmount} {maxAmount} />
        <SplitButton percentage={0.5} label={"50%"} bind:itemAmount={itemAmount} {maxAmount} />
        <SplitButton percentage={1.0} label={"Max"} bind:itemAmount={itemAmount} {maxAmount} />
    </div>
</div>

<style>
    .grouping {
        display: flex;
        gap: 20px;
    }
    .item--information {
        display: flex;
        gap: 20px;
        align-items: center;
        width: 602px;
        justify-content: space-between;
    }
    .transaction--data {
        display: flex;
        flex-direction: column;
    }
    
    .transaction--data .bottom {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }
    .transaction--data .top {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        letter-spacing: 0.02em;

        color: #FFFFFF;
        margin-bottom: 10px;
    }
    .item--image {
        width: 86px;
        height: 86px;
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 100%;

        position: relative;
    }
    .item--image .image {
        position: absolute;
        inset: 0;
        
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
    }
    .item--information {
        margin-top: 50px;
    }
</style>