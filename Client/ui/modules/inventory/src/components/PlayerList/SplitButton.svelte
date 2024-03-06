<script>
    export let label;
    export let percentage = 0.0;
    export let maxAmount = 0.0;

    export let itemAmount = 0;

    const handleClick = () => {
        if (percentage >= 1.0)
        {
            itemAmount = maxAmount;
            return
        }
        
        itemAmount = Math.floor(itemAmount * percentage)
        itemAmount = itemAmount < 1 ? 1 : itemAmount
    }
</script>

<button on:click={handleClick} class="split--button">
    {label}
    {#if percentage >= 1.0}
        <span>
            ({maxAmount})
        </span>
    {/if}
</button>

<style>
    button span {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.02em;

        color: rgba(255, 255, 255, 0.65);
    }
    button:first-child {
        border-radius: 17px 0px 0px 17px;
        padding-left: 17px;
    }
    button:last-child {
        border-radius: 0px 17px 17px 0px;
        padding-right: 17px;
    }
    button {
        text-transform: uppercase;
        background: radial-gradient(108.72% 108.72% at 30.81% 29.07%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.0465) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.35);
        padding-inline: 12px;
        height: 44px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        text-align: center;
        letter-spacing: 0.02em;

        color: #FFFFFF;

        cursor: pointer;
    }
    button:hover {
        background: radial-gradient(108.72% 108.72% at 30.81% 29.07%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.0775) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.35);
    }
</style>