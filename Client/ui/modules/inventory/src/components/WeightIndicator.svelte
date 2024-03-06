<script>
    import { onMount } from 'svelte';
    
    export let weight = [0, 0];
    export let invert = false;
    
    let arc;

    const handleArcUpdate = () => {
        var progress = (weight[0] / weight[1]) * 100;
        progress = (progress > 100) ? 100 : progress;
        progress = (progress < 0) ? 0 : progress;

        if (arc) {
            var prog = (progress / 100) * 53.9
            var strokeDashArray = 2 * Math.PI * 150;
            var strokeDashOffset = strokeDashArray * ((100 - prog) / 100);

            arc.style.strokeDasharray = strokeDashArray;
            arc.style.strokeDashoffset = strokeDashOffset;
        }

        console.log('weight updated', weight)
    }

    onMount(() => {
        arc = document.getElementById("control--progress");
        handleArcUpdate();
    });

    $: weight[0], weight[1], handleArcUpdate();
</script>

<div class="weight--indicator {invert ? 'invert' : ''}">
    <svg width="306" height="175" viewBox="0 0 306 175" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="153" cy="153" r="150" stroke="white" stroke-opacity="0.15" stroke-width="2.5" stroke-dasharray="25 25"/>
        <circle id="control--progress" cx="153" cy="153" r="150" stroke="white" stroke-opacity="1" stroke-width="6" stroke-linecap="round"/>
    </svg>        
    <div class="content">
        <div class="center">
            <div class="icon">                                      
            </div>
            <div class="labels">
                <div class="current--weight">{weight[0]} KG</div>
                <div class="max--weight">/ {weight[1]} KG</div>
            </div>
        </div>
    </div>
</div>

<style>
    #control--progress {
        transform: rotate(173deg);
        transform-origin: 153px 153px;
        transition: stroke-dasharray 150ms ease-in-out, stroke-dashoffset 150ms ease-in-out;
    }
    .center {
        position: absolute;
        left: 50%;
        top: 65px;
        transform: translateX(-50%);
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: center;
    }
    .icon {
        width: 33.33px;
        height: 30px;

        background-image: url('/static/weight.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        /* background-color: #fff; */
    }
    .current--weight {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 800;
        font-size: 18px;
        
        letter-spacing: 0.12em;
        text-transform: uppercase;

        color: #FFFFFF;
    }
    .labels {
        width: max-content;
    }
    .max--weight {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.08em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.65);
    }
    .weight--indicator
    {
        width: 306px;
        height: 306px;

        position: absolute;
        left: 2%;
        bottom: -15%;
    }

    .weight--indicator.invert {
        left: unset;
        right: 2%;
    }
    .weight--indicator > svg {
        top: -28px;
        left: -28px;
        position: absolute;
    }

    .content {
        box-sizing: border-box;

        width: 250px;
        height: 250px;

        position: relative;
        
        background: radial-gradient(89.96% 118.23% at 30.64% 6.02%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 54.04%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.02);
        border: 2px solid rgba(255, 255, 255, 0.05);
        border-radius: 100%;
    }
</style>