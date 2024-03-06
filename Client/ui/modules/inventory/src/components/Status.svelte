<script>
    import { onMount } from "svelte";

    let arc;

    export let status = 10;
    export let maxStatus = 100;
    export let color = "#fff";

    const handleArcUpdate = () => {
        var progress = (status / maxStatus) * 100;

        progress = progress > 100 ? 100 : progress;
        progress = progress < 0 ? 0 : progress;

        if (arc) {
            var strokeDashArray = 2 * Math.PI * 39.5;
            var strokeDashOffset = strokeDashArray * ((100 - progress) / 100);

            arc.style.strokeDasharray = strokeDashArray;
            arc.style.strokeDashoffset = strokeDashOffset;
        }
    };

    const generateBackground = (hex) => {
        var rgb_color = hexToRgb(hex).slice(4, -1)
        
        return `radial-gradient( 89.53% 69.19% at 35.47% 23.84%, rgba(${rgb_color}, 0.02) 0%, rgba(${rgb_color}, 0) 54.08%, rgba(${rgb_color}, 0) 100% ), rgba(${rgb_color}, 0.1)`
    }
    
    const generateShadow = (hex) => {
        var rgb_color = hexToRgb(hex).slice(4, -1)
        return `0px 0px 35px rgba(${rgb_color}, 0.05)`;
    }

    const hexToRgb = (hex) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split("");
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = "0x" + c.join("");
            return (
                "rgb(" +
                [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ")"
            );
        }
        throw new Error("Bad Hex");
    }

    onMount(() => {
        handleArcUpdate();
    });

    $: status && handleArcUpdate();
    $: backgroundColor = color && generateBackground(color)
    $: shadowColor = color && generateShadow(color)
</script>

<div class="status">
    <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="40" cy="40" r="39.5" stroke={color} stroke-opacity="0.1" />
        <circle
            id="arc"
            bind:this={arc}
            cx="40"
            cy="40"
            r="39.5"
            stroke={color}
            stroke-opacity="1"
            stroke-width="1.5"
        />
    </svg>

    <div class="status--container" style="{`background: ${backgroundColor}; box-shadow: ${shadowColor};`}">
        <slot />
    </div>
</div>

<style>
    #arc {
        transition: all ease-in-out 150ms;
    }
    .status {
        width: 80px;
        height: 80px;
        position: relative;
    }
    .status--container {
        width: 60px;
        height: 60px;

        position: absolute;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        background: radial-gradient(
                89.53% 69.19% at 35.47% 23.84%,
                rgba(255, 255, 255, 0.02) 0%,
                rgba(255, 255, 255, 0) 54.08%,
                rgba(255, 255, 255, 0) 100%
            ),
            rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0px 0px 35px rgba(255, 255, 255, 0.05);
        border-radius: 37px;
    }
    .status--container > :global(svg) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
