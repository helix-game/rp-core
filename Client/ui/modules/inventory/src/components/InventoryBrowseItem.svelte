<script>
    import INVENTORY_STATES from "../state";
    import { focusedInventory, inventory_state, otherInventoryData } from "../store/stores";

    export let label;
    export let identifier;
    export let weight = [ 0, 0 ];
    export let data = {};

    const parseData = (arr) => {
        var isArray = !Array.isArray(arr)
        if (isArray && typeof arr == 'object')
            return arr;

        if (isArray)
            return {};

        var obj = {}

        arr.forEach(x => {
            obj[x.slot] = x
        })

        return obj
    }


    const handleClick = () => {
        if (data.pockets)
            data.pockets = parseData(data?.pockets)
        if (data.slots)
            data.slots = parseData(data?.slots)

        focusedInventory.set(data.id);
        otherInventoryData.set(data);
        inventory_state.set(INVENTORY_STATES.OTHER_INVENTORY);
    }
</script>

<button on:click={handleClick} class="inventory--browse">
    <div class="indicators">
        <svg class="top--middle--bar" width="482" height="1" viewBox="0 0 482 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="482" height="1" fill="white" fill-opacity="0.08"/>
        </svg>
        <svg class="bottom--middle--bar" width="482" height="1" viewBox="0 0 482 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="482" height="1" fill="white" fill-opacity="0.08"/>
        </svg>
        <svg class="top--left--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13V13C1 6.37258 6.37258 1 13 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
        </svg>
        <svg class="bottom--left--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0V0C1 6.62742 6.37258 12 13 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
        </svg>
        <svg class="bottom--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0V0C12 6.62742 6.62742 12 -1.78814e-07 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
        </svg>
        <svg class="top--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13V13C12 6.37258 6.62742 1 -1.78814e-07 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
        </svg>
        <svg class="right--middle--bar" width="1" height="54" viewBox="0 0 1 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="54" fill="white" fill-opacity="0.08"/>
        </svg>                          
        <svg class="left--middle--bar" width="1" height="54" viewBox="0 0 1 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="54" fill="white" fill-opacity="0.08"/>
        </svg>
    </div>
    <div class="wrapper">
        <div class="content">
            <div class="group inventory--data">
                <div class="icon inventory--type">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39254 5.91875L2.62969 2.3852C3.10324 1.03133 4.38047 0.125 5.81484 0.125H12.1852C13.6195 0.125 14.8957 1.03133 15.3703 2.3852L16.6078 5.91875C17.4234 6.25625 18 7.06133 18 8V14.75C18 15.3723 17.4973 15.875 16.875 15.875H15.75C15.1277 15.875 14.625 15.3723 14.625 14.75V13.0625H3.375V14.75C3.375 15.3723 2.87121 15.875 2.25 15.875H1.125C0.503789 15.875 0 15.3723 0 14.75V8C0 7.06133 0.575156 6.25625 1.39254 5.91875ZM3.83555 5.75H14.1645L13.2469 3.12734C13.0887 2.67734 12.6633 2.375 12.1852 2.375H5.81484C5.33672 2.375 4.91133 2.67734 4.75312 3.12734L3.83555 5.75ZM3.375 8C2.75379 8 2.25 8.50273 2.25 9.125C2.25 9.74727 2.75379 10.25 3.375 10.25C3.99727 10.25 4.5 9.74727 4.5 9.125C4.5 8.50273 3.99727 8 3.375 8ZM14.625 10.25C15.2473 10.25 15.75 9.74727 15.75 9.125C15.75 8.50273 15.2473 8 14.625 8C14.0027 8 13.5 8.50273 13.5 9.125C13.5 9.74727 14.0027 10.25 14.625 10.25Z" fill="white" fill-opacity="1"/>
                    </svg>                            
                </div>
                <div class="labels">
                    <div class="top">
                        {label}
                    </div>
                    <div class="bottom">
                        {identifier}
                    </div>
                </div>
            </div>
            <div class="group weight--indicator">
                <div class="inventory--weight">
                    <div class="icon"></div>
                    <div class="label">
                        {weight[0]} KG / {weight[1]} KG
                    </div>
                </div>
            </div>
        </div>
    </div>
</button>

<style>
    .inventory--browse {
        width: 100%;
        height: 138px;
        position: relative;

        cursor: pointer;

        background: transparent;
        outline: 0;
        border: 0;
    }
    .inventory--browse {
        margin-bottom: 20px;
    }
    .inventory--browse:last-child {
        margin-bottom: 0;
    }

    .indicators {
        position: absolute;
        inset: 0;
    }
    .indicators > svg {
        position: absolute;
    }
    .indicators .top--left--corner {
        top: 0;
        left: 0;
    }
    .indicators .top--right--corner {
        top: 0;
        right: 0;
    }
    .indicators .bottom--right--corner {
        bottom: 0;
        right: 0;
    }
    .indicators .bottom--left--corner {
        bottom: 0;
        left: 0;
    }
    .indicators .left--middle--bar {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .indicators .right--middle--bar {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .indicators .top--middle--bar {
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }
    .indicators .bottom--middle--bar {
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }

    .inventory--browse:hover .wrapper {
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.0124) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 25px;
    }
    .inventory--browse:hover .content {
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(0, 217, 177, 0.0062) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.01);
        border-radius: 20px;
    }
    .inventory--browse:hover .icon.inventory--type {
        background: rgba(255, 255, 255, 0.45);
        border-radius: 10px;
    }
    .inventory--browse:hover .icon.inventory--type {
        opacity: 1;
    }
    .inventory--browse .icon.inventory--type {
        opacity: 0.65;
    }
    .inventory--browse:hover .weight--indicator {
        background: #b0b0b0;
        box-shadow: 0px 0px 45px #b0b0b0a6;
    }
    .inventory--browse:hover .labels .top {
        color: rgba(255, 255, 255, 0.85)!important;
    }
    .inventory--browse:hover .labels .bottom {
        color: rgba(255, 255, 255, 0.55)!important;
    }
    
    .inventory--data.group {
        display: flex;
        gap: 18px;
        align-items: center;
    }

    .inventory--data.group .labels .top {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        /* line-height: 20px; */
        leading-trim: both;
        text-edge: cap;
        letter-spacing: 0.12em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.65);
    }

    .inventory--data.group .labels .bottom {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        /* line-height: 18px; */
        leading-trim: both;
        text-edge: cap;
        letter-spacing: 0.06em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.35);
    }

    .weight--indicator {
        background: #7b7c7b;
        box-shadow: 0px 0px 45px #7b7c7ba6;
        border-radius: 12px;

        display: flex;
        align-items: center;

        height: 36px;
        padding-inline: 12px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: 0.12em;
        text-transform: uppercase;

        color: rgba(0, 0, 0, 0.65);
    }

    .icon.inventory--type {
        width: 36px;
        height: 36px;

        background: rgba(255, 255, 255, 0.25);
        border-radius: 10px;

        position: relative;
    }

    .icon.inventory--type > svg {
        position: absolute;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }


    .inventory--browse .wrapper {
        width: 542px;
        height: 116px;
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.0062) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 25px;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .inventory--browse .wrapper .content {
        width: 502px;
        height: 70px;
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.01) 0%, rgba(0, 217, 177, 0.0031) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.02) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 20px;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        align-items: center;
        justify-content: space-between;

        
        padding-inline: 17px;
    }

    .inventory--weight {
        display: flex;
        align-items: center;
        gap: 11.5px;
    }

    .inventory--weight .icon {
        width: 15.83px;
        height: 14.25px;

        background-image: url('/static/weight_b.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>