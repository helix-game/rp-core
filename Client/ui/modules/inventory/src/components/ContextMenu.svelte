<script>
    import { closeContext, inventoryData } from "../store/stores";

    var showContext = false;

    let pos = { x: 0, y: 0 }

    let xPosValue;
    let xPosType;
    let xPosReset;

    let yPosValue;
    let yPosType;
    let yPosReset;

    let transformOrigin;

    let contextItemData = {}

    const handleContextMenu = e => {
        const slotElement = e.target.closest('.slot');

        if (!slotElement) return;

        if (slotElement.dataset.empty === 'true') return;

        const extra = slotElement.dataset.extra === 'default' ? 'slots' : slotElement.dataset.extra;
        const slot = slotElement.dataset.slot; 

        contextItemData = $inventoryData[extra][slot];
        contextItemData.extra = extra;

        const { x, y, width, height } = slotElement.getBoundingClientRect();
        const xCenter = x + width / 2;
        const yCenter = y + height / 2;
        const xPositionType = window.innerWidth / 2 > xCenter ? "left" : "right";
        const yPositionType = window.innerHeight / 2 > yCenter ? "top" : "bottom";
        
        const xPosition =
            xPositionType === "left" ? x + width : window.innerWidth - x;
        const yPosition =
            yPositionType === "top" ? y : window.innerHeight - y - height;

        xPosType = xPositionType;
        yPosType = yPositionType;

        if (xPosType === 'left')
            xPosReset = 'right'
        else
            xPosReset = 'left'
        
        if (yPosType === 'left')
            yPosReset = 'right'
        else
            yPosReset = 'left'

        xPosValue = `${xPosition}px`;
        yPosValue = `${yPosition}px`;

        transformOrigin = `${xPosType} ${yPosType}`;

        pos.x = xPositionType;
        pos.y = yPositionType;
        showContext = true;
    }

    
    const handleCloseContext = () => {
        showContext = false;
    }
    
    const handleUseButton = () => {
        Events.Call('UseItem', {extra: contextItemData.extra, slot: contextItemData.slot})
    }
    
    const handleDropButton = () => {
        
    }
    
    const handleSplitButton = () => {
        
    }
    
    closeContext.set(handleCloseContext)
</script>

{#if showContext}
    <div class="context--menu" style="transform-origin:{transformOrigin};{xPosReset}:auto;{yPosReset}:auto;{xPosType}:{xPosValue};{yPosType}:{yPosValue};">
        <div class="information" data-x="{xPosType}" data-y="{yPosType}">
            <div class="item--description--content">
                <div class="item--label">
                    {contextItemData.label}
                </div>
                <div class="item--description">
                    {contextItemData.description}
                </div>

                <div class="item--rarity">
                    {contextItemData.rarity}
                </div>
            </div>
            <div class="item--weight">
                {contextItemData.weight * contextItemData.count}kg
            </div>
        </div>
        <div class="utility--buttons">
            <button class="use--button" on:click={handleUseButton}>
                <div class="icon"></div>
                <div class="label">Use</div>
            </button>
            <button class="divide--button">
                <div class="icon"></div>
                <div class="label">Divide</div>
            </button>
            <button class="drop--button">
                <div class="icon"></div>
                <div class="label">Drop</div>
            </button>
        </div>
    </div>
{/if}

<svelte:window on:contextmenu|preventDefault={handleContextMenu} on:click={handleCloseContext} />

<style>
    .context--menu .information::before {
        content: '';
        display: inline-block;
        position: absolute;

        width: 16px;
        height: 16px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.25);
        box-shadow: 0px 2px 45px rgba(0, 0, 0, 0.25);
        border-radius: 11px;

        position: absolute;
        transition: top .48s cubic-bezier(0.83, 0, 0.17, 1);
        
        z-index: 50;
        --offsety: 0;
        transform: translateX(var(--offsetX)) translateY(var(--offsetY))
    }

    .context--menu .information[data-x="left"]::before {
        left: 0;
        --offsetx: -50%
    }

    .context--menu .information[data-x="right"]::before {
        right: 0;
        --offsetx: 50%
    }

    .context--menu .information[data-y="top"]::before {
        top: 35px
    }

    .context--menu .information[data-y="bottom"]::before {
        top: calc(100% - 35px - 16px)
    }

    .item--weight {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;

        color: #000000;

        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.25);
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.35);
        border-radius: 10px;

        display: inline-block;
        height: 30px;
        padding-inline: 10px;
        line-height: 30px;


        margin-top: 30px;
        margin-right: 28px;
    }

    .information {
        display: flex;
        justify-content: space-between;
    }

    .item--label {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.15em;
        text-transform: uppercase;

        color: #FFFFFF;
    }

    .item--description {
        margin-top: 6px;
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 0.5px;

        color: rgba(255, 255, 255, 0.6);
    }

    .item--description--content {
        margin-top: 32px;
        margin-left: 34px;
    }

    .item--rarity::before {
        content: '';
        display: block;
        
        width: 33px;
        height: 2px;

        background: #00D9B1;
        box-shadow: 0px 0px 22px rgba(11, 170, 148, 0.15);
        border-radius: 8px;
    }
    .item--rarity {
        margin-top: 22px; 

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 0.15em;
        text-transform: uppercase;

        color: #00D9B1;

        display: flex;
        align-items: center;
        gap: 12px;
    }

    .context--menu {
        width: 200px;
        height: 200px;
        position: absolute;
        left: 50%;
        z-index: 9999999;
        width: 398px;
    }

    .utility--buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2px;
    }

    .utility--buttons button {
        display: flex;
        align-items: center;
        gap: 11px;
        padding-inline: 13px 19px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 0.1em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.85);
        cursor: pointer;
    }
    .utility--buttons button:hover {
        background: radial-gradient(104.96% 104.96% at 35.47% 23.84%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(116.63deg, rgba(0, 0, 0, 0.25) 40.44%, rgba(0, 0, 0, 0) 90.62%), #135347;
    }
    .utility--buttons button:hover .icon {
        background-color: #13957D;
    }

    .information {
        background: linear-gradient(249.39deg, rgba(0, 217, 177, 0.15) -3.72%, rgba(0, 217, 177, 0) 77.22%), linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), radial-gradient(104.96% 104.96% at 35.47% 23.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(0deg, rgba(0, 217, 177, 0.1), rgba(0, 217, 177, 0.1)), rgba(0, 0, 0, 0.98);
        box-shadow: 0px 0px 100px #000000;
        
        border-radius: 22px 22px 0px 0px;
        width: 100%;
        height: 182px;
    }
    .use--button {
        border-radius: 0px 0px 0px 18px;
        width: 113px;
        height: 66px;

        position: relative;
    }
    .use--button .icon {
        width: 40px;
        height: 40px;

        background: rgba(19, 149, 125, 0.65);
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0px 0px 65px rgba(0, 0, 0, 0.35);
        border-radius: 12px;

        background-image: url('/static/context_use.png');
        background-repeat: no-repeat;
        background-size: 26px 26px;
        background-position: center;
    }

    .divide--button {
        width: 152px;
        height: 66px;
    }
    .divide--button .icon {
        width: 50px;
        height: 40px;

        background: rgba(19, 149, 125, 0.65);
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0px 0px 65px rgba(0, 0, 0, 0.35);
        border-radius: 12px;

        background-image: url('/static/context_divide.png');
        background-repeat: no-repeat;
        background-size: 30px 14px;
        background-position: center;
    }
    .drop--button {
        width: 129px;
        height: 66px;
        border-radius: 0px 0px 18px 0px;
    }
    .drop--button .icon {
        width: 40px;
        height: 40px;

        background: rgba(19, 149, 125, 0.65);
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0px 0px 65px rgba(0, 0, 0, 0.35);
        border-radius: 12px;

        background-image: url('/static/context_drop.png');
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: center;
    }

    button {
        outline: 0;
        position: relative;
        border: 0;

        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(116.63deg, rgba(0, 0, 0, 0.25) 40.44%, rgba(0, 0, 0, 0) 90.62%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #135347;
        border-bottom: 2px solid rgba(19, 149, 125, 0.15);
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
    }

    button .content {
        position: absolute;
        inset: 0;
        z-index: 2;
    }

    .information p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>