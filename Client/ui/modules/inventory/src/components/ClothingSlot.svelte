<script>
    export let style = ""
    export let type;
</script>

<div class="slot--outer" {style}>
    <div class="slot--inner">
        <slot></slot>
    </div>
</div>

<style>
    .slot--inner {
        border-radius: 18px;
        /* position: relative; */
    }
    .slot--outer {
        border-radius: 24px;
    }
    .slot--outer {
        width: 88px;
        height: 88px;
        border: 1px solid rgba(255, 255, 255, 0.04);
        background: rgba(255, 255, 255, 0.03);
        
        /* position: relative; */
        position: absolute;
    }
    .slot--inner {
        position: absolute;
        inset: 9px;
        
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-style: dashed;
    }
    .slot--inner > :global(svg) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        opacity: 0.35;
    }
</style>