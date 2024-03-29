<script>
    import { createEventDispatcher } from "svelte";

    export let primary = true;
    export let width;

    export let label;

    const dispatch = createEventDispatcher()

    const handleClick = () => {
        dispatch('click')
    }
</script>

<button
    on:click={handleClick}
    class:primary={primary}
    class:secondary={!primary}
    style="width: {width}px;"
>
    {#if $$slots.icon}
        <slot name="icon" />
    {/if}

    {label}
</button>

<style>
    button {
        padding-block: 36px;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;

        text-align: center;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border-radius: 18px;

        outline: 0;
        border: 0;
        cursor: pointer;

        color: #FFFFFF;

        text-align: center;
    }

    .primary {
        background: rgba(0, 217, 178, 0.15);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
    }

    .primary:hover {
        background: radial-gradient(102.25% 113.32% at 96.68% 100%, rgba(0, 217, 178, 0.65) 0.81%, rgba(0, 217, 178, 0.2015) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(0, 217, 178, 0.15);
    }

    .secondary {
        background: rgba(178, 255, 250, 0.02);
        border: 1px solid rgba(178, 255, 250, 0.15);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
    }
    
    .secondary:hover {
        background: radial-gradient(86.73% 106.46% at 102.21% 88.85%, rgba(255, 255, 255, 0.1) 0.81%, rgba(255, 255, 255, 0.031) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(178, 255, 250, 0.03);
        border: 1px solid rgba(242, 255, 254, 0.25);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
    }
</style>