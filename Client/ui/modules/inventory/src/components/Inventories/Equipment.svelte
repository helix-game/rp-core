<script>
    import Slot from "./Slot.svelte";

    export let invert = false;
</script>

<figure class="equipment {invert ? 'invert ': ''}">
    <div class="label">
        <div class="icon">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0.449198C20 0.187166 19.7822 0 19.5281 0H19.2377H2.14155H2.03266C1.77858 0 1.59709 0.224599 1.59709 0.486631V2.05882L1.56079 2.24599C1.56079 2.24599 1.27041 2.43316 1.27041 2.73262C1.27041 3.03209 1.4519 3.25668 1.70598 3.29412C1.96006 3.29412 2.39564 3.21925 2.9038 3.85561C3.41197 4.52941 3.19418 5.61497 2.10525 7.8984C1.01633 10.1818 0.435563 10.893 0.108884 12.1658C-0.217794 13.4385 0.254075 13.9626 1.12522 13.9626C2.03266 13.9626 3.15789 13.9626 4.71868 13.9626C4.82758 13.9626 4.97277 13.9626 5.04536 13.9251C5.33574 13.9251 5.66242 13.8503 5.9528 13.6631C6.31578 13.4385 6.31578 12.9893 6.31578 12.8021C6.42467 10.6684 7.94917 7.52406 7.98547 7.41176C7.98547 7.41176 8.20326 6.8877 8.56623 6.85027C8.92921 6.81283 9.0381 7.07487 10.0181 7.14973C10.5989 7.18717 13.0308 7.18717 13.5753 7.18717C14.1198 7.18717 14.1561 7.03743 14.0109 6.81283C13.8657 6.58824 13.7931 6.36364 13.7931 6.1016C13.7931 5.83957 13.7931 5.95187 13.7931 5.24064C13.7931 4.52941 14.265 3.96791 15.0635 3.96791C15.1361 3.96791 15.1724 3.96791 15.245 3.96791H15.6806C16.6243 3.93048 16.4065 3.93048 17.2414 3.89305H17.8947C18.5481 3.89305 19.1288 3.85561 19.4555 3.85561C19.7096 3.85561 19.8911 3.66845 19.8911 3.40642L20 0.449198ZM12.2323 6.73797C11.2523 6.81283 10.6352 6.81283 10.0907 6.7754C9.54627 6.73797 8.96551 6.62567 8.92921 5.57754C8.92921 5.42781 8.92921 5.31551 8.96551 5.16578C9.1833 5.35294 9.61887 5.46524 9.61887 5.46524C9.83665 5.9893 10.2359 6.3262 10.3811 6.4385C10.4174 6.47594 10.4537 6.47594 10.49 6.4385L10.5989 6.36364C10.6352 6.3262 10.6352 6.28877 10.5989 6.25134C10.5263 6.17647 10.4537 5.9893 10.3811 5.65241C10.2722 5.20321 10.4174 4.49198 10.4537 4.26738C10.49 4.26738 10.49 4.26738 10.5263 4.26738C11.6152 4.15508 12.4138 3.96791 12.8494 4.30481C13.176 4.56684 13.2849 4.82888 13.2849 5.46524C13.2849 6.06417 13.2123 6.6631 12.2323 6.73797Z" fill="black"/>
            </svg>                    
        </div>
        <div class="text">
        </div>
    </div>
    <div class="slots">
        <div class="indicators">
            <svg class="top--left--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13V13C1 6.37258 6.37258 1 13 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
            </svg>
            <svg class="top--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13V13C12 6.37258 6.62742 1 0 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
            </svg>            
            <svg class="bottom--left--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0V0C1 6.62742 6.37258 12 13 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
            </svg>            
            <svg class="bottom--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0V0C12 6.62742 6.62742 12 -1.78814e-07 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
            </svg>

            <svg class="top--middle--bar" width="378" height="1" viewBox="0 0 378 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="378" height="1" fill="white" fill-opacity="0.08"/>
            </svg>
            <svg class="bottom--middle--bar" width="378" height="1" viewBox="0 0 378 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="378" height="1" fill="white" fill-opacity="0.08"/>
            </svg>
            <svg class="right--middle-bar" width="1" height="44" viewBox="0 0 1 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1" height="44" fill="white" fill-opacity="0.08"/>
            </svg>                
            <svg class="left--middle-bar" width="1" height="44" viewBox="0 0 1 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1" height="44" fill="white" fill-opacity="0.08"/>
            </svg>                
        </div>
        <div class="content">
            <Slot type={'equipment'} name={'weapon'} />
            <Slot type={'equipment'} name={'ammo'} />
            <Slot type={'equipment'} name={'backpack'} />
            <Slot type={'equipment'} name={'phone'} />
        </div>
    </div>
</figure>

<style>
    .indicators {
        position: absolute;
        inset: 0;
    }
    .indicators svg {
        position: absolute;
    }
    .top--left--corner {
        top: 0;
        left: 0;
    }
    .top--right--corner {
        top: 0;
        right: 0;
    }
    .bottom--right--corner {
        bottom: 0;
        right: 0;
    }
    .bottom--left--corner {
        bottom: 0;
        left: 0;
    }

    .top--middle--bar {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .bottom--middle--bar {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .right--middle-bar {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .left--middle-bar {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .equipment .label {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    .equipment .label .icon {
        width: 36px;
        height: 36px;
        background: #FFFFFF;
        box-shadow: 0px 0px 35px rgba(255, 255, 255, 0.25);
        border-radius: 10px;
        position: relative;
    }

    .equipment .label .icon svg {
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);
    }

    .equipment .label .text {
        width: 122px;
        height: 60px;
        background-image: url('/static/equipment.png');
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    .equipment.invert, .equipment.invert .label {
        flex-direction: row-reverse;
    }
    .equipment.invert .text {
        background-image: url('/static/equipment_i.png');
    }

    .equipment .slots {
        width: 480px;
        height: 156px;
        position: relative;
    }
    .equipment .content {
        box-sizing: border-box;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 458px;
        height: 134px;
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.0062) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 25px;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        justify-items: center;
        width: fit-content;
        padding-inline: 20px;
        gap: 14px;
    }

    figure.equipment {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }

</style>