<script>
    import { createEventDispatcher } from "svelte";

    export let id = 1;

    export let label;

    const dispatch = createEventDispatcher();

    const handleSelection = () => {
        dispatch('click', id)
    }
</script>

<button
    on:click={handleSelection}
    class="dropdown--option n{id}">
    <div class="content">
        <span>
            {label}
        </span>
    
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_837_4024)">
            <path d="M0 0.867102C6.06611 -0.262157 9.35602 -0.31562 15 0.867102C20.7461 2.26394 24.0411 2.22182 30 0.867102V20.2789C24.1432 21.3389 20.857 21.452 15 20.2789C8.9298 19.05 5.65001 19.0898 0 20.2789V0.867102Z" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_i_837_4024" x="0" y="0" width="30" height="21.1168" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="4"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_837_4024"/>
            </filter>
            </defs>
        </svg>      
    </div>
</button>


<style>
    .dropdown--option:hover .content {
        scale: 1.05;
    }
    .dropdown--option .content {
        transform-origin: 0 0;
        transition: scale 100ms ease-in;
    }
    .dropdown--option {
        cursor: pointer;

        border: 0;
        outline: 0;
        text-align: left;

        background: radial-gradient(151% 176.92% at 138.43% 141%, rgba(0, 217, 178, 0.45) 0.81%, rgba(0, 217, 178, 0.1395) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #0B7C6B;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        height: 76px;
        width: 350px;

        
        position: relative;
    }
    
    .dropdown--option .content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-inline: 36px 40px;
        
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 25px;
        letter-spacing: 0.05em;

        color: #fff;
    }

    .dropdown--option.n1, .dropdown--option.n5 {
        width: 312px;
        height: 70px;

        background: radial-gradient(151% 176.92% at 138.43% 141%, rgba(0, 217, 178, 0.15) 0.81%, rgba(0, 217, 178, 0.0465) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #132623;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px 10px 0px 0px;
    }
    .dropdown--option.n1 .content, .dropdown--option.n5 .content {
        padding-inline: 25px;
    }

    .dropdown--option.n2, .dropdown--option.n4 {
        width: 332px;
        height: 72px;

        background: radial-gradient(151% 176.92% at 138.43% 141%, rgba(0, 217, 178, 0.45) 0.81%, rgba(0, 217, 178, 0.1395) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #103731;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px 10px 0px 0px;
    }
    
    .dropdown--option.n1 .content, .dropdown--option.n5 .content {
        padding-inline: 31px 34px;
    }
    .dropdown--option.n5, .dropdown--option.n4 {
        border-radius: 0px 0px 10px 10px;
    }
</style>