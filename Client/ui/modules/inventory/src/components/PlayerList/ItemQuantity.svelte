<script>
    export let itemAmount = 1;
    export let maxAmount = 1;

    const decreaseAmount = () => {
        if (itemAmount <= 1) return;
        itemAmount--;
    }
    const increaseAmount = () => {
        if (itemAmount >= maxAmount) return;
        itemAmount++;
    }
</script>

<input value={itemAmount} type="number" class="item--quantity">
<div class="buttons">
    <button on:click={decreaseAmount} class="minus--amount">
        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.8333 1.83164H0.166656V0.164978H11.8333V1.83164Z" fill="white"/>
        </svg>                            
    </button>
    <button on:click={increaseAmount} class="positive--amount">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.8333 6.83165H6.83334V11.8316H5.16667V6.83165H0.166672V5.16498H5.16667V0.164978H6.83334V5.16498H11.8333V6.83165Z" fill="white"/>
        </svg>                            
    </button>
</div>

<style>
    .buttons {
        gap: 3px;
    }
    .buttons button {
        width: 34px;
        height: 34px;
        
        background: radial-gradient(108.72% 108.72% at 30.81% 29.07%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.0465) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 17px;
        
        position: relative;
        cursor: pointer;
    }
    .buttons button:hover {
        background: radial-gradient(108.72% 108.72% at 30.81% 29.07%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.0775) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 17px;
    }
    .buttons button > svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .item--quantity {
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        width: 60px;
        height: 34px;
        text-align: center;
        outline: 0;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: 0.05em;
        padding-inline: 4px;

        color: #000000;
    }
    .item--quantity::-webkit-outer-spin-button,
    .item--quantity::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>