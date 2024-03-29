<script>
    export let label;
    export let value;
</script>

<div class="character--stat">
    <div class="icon">
        <slot name="icon" />
    </div>
    <div class="group">
        <div class="label">
            {label}
        </div>
        <div class="value">
            <p>{value}</p>

            <slot name="suffixIcon" />
        </div>
    </div>
</div>

<style>
    .character--stat {
        display: flex;
        gap: 24px;
        align-items: center;
    }

    .character--stat .label {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.65);
    }
    .character--stat .value {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #FFFFFF;

        display: flex;
        align-items: center;
        gap: 13px;
    }
    .character--stat .icon {
        width: 64px;
        height: 64px;
        margin: 20px;

        position: relative;

        background: rgba(0, 0, 0, 0.3);
        border-radius: 100%;
        outline: 20px solid rgba(0, 0, 0, 0.05);
    }
    .character--stat .icon > :global(svg) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>