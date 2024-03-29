<script>
    export let label;
    export let placeholder;

    export let value;
</script>

<div class="input--group">
    {#if label}
        <div class="label">{label}</div>
    {/if}
    <input type="text" class="input" {placeholder} bind:value={value}>
</div>

<style>
    .label {
        padding-inline: 15px;
        padding-block: 12px;

        background: #FFFFFF;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        width: fit-content;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #000000;
    }
    .input--group {
        position: relative;

        min-width: 400px;
        min-height: 100px;
    }
    .label {
        position: absolute;
        left: 25px;
        top: 0; 
    }
    .input {
        width: 100%;

        margin-top: 31px;

        padding-inline: 44px;
        padding-block: 36px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0.05em;
        color: #FFFFFF;

        background: rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 18px;

        outline: 0;
    }

    .input::placeholder {
        opacity: 0.65;
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
</style>