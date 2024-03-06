<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { inventoryData } from "../../store/stores";

    import PlayerCard from "./PlayerCard.svelte";

    export let data = {};
    export let payload = {};

    let name, image;

    const dispatch = createEventDispatcher()

    onMount(() => {
        inventoryData.subscribe((e) => {
            name = e.source.name;
            image = e.source.profile;
        })
    })

    const onConfirmPressed = () => {
        dispatch('menuConfirmed')
    }
    
    const onCancelPressed = () => {
        dispatch('menuCancelled')
    }
</script>

<div class="content {data.type}">
    <div class="wrapper">
        <div class="icon">
            {#if data.type == 'positive'}
                <svg width="53" height="28" viewBox="0 0 53 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48 15.5C49.5 15.5 50.75 16 51.75 17C52.5 18 53 19.25 53 20.5L33 28L15.5 23V0.5H20.25L38.5 7.25C39.75 7.75 40.5 8.75 40.5 10C40.5 10.75 40.25 11.5 39.75 12C39.25 12.5 38.25 13 37.5 13H30.5L26 11.25L25.25 13.5L30.5 15.5H48ZM0.5 0.5H10.5V28H0.5V0.5Z" fill="white"/>
                </svg>
            {:else if data.type == 'negative'}
                <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 40.5C3 43.25 5.25 45.5 8 45.5H28C30.75 45.5 33 43.25 33 40.5V15.5C33 12.75 30.75 10.5 28 10.5H8C5.25 10.5 3 12.75 3 15.5V40.5ZM17.125 18.875C17.625 18.375 18.4 18.375 18.9 18.875L28 28H23V38H13V28H8L17.125 18.875ZM26.75 3L24.975 1.225C24.525 0.775 23.875 0.5 23.225 0.5H12.775C12.125 0.5 11.475 0.775 11.025 1.225L9.25 3H3C1.625 3 0.5 4.125 0.5 5.5C0.5 6.875 1.625 8 3 8H33C34.375 8 35.5 6.875 35.5 5.5C35.5 4.125 34.375 3 33 3H26.75Z" fill="white"/>
                </svg>                
            {/if}                        
        </div>
        <div class="confirmation--text">
            <div class="top">
                Confirmation
            </div>
            <div class="bottom">
                Are you sure?
            </div>
        </div>
        <div class="transaction--information">
            <PlayerCard {name} source={true} {image} />
            <div class="arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525 18.025C12.1917 18.2417 11.8543 18.2543 11.513 18.063C11.1717 17.8717 11.0007 17.5757 11 17.175V13H3C2.71667 13 2.479 12.904 2.287 12.712C2.095 12.52 1.99934 12.2827 2 12C2 11.7167 2.096 11.479 2.288 11.287C2.48 11.095 2.71734 10.9993 3 11H11V6.825C11 6.425 11.171 6.129 11.513 5.937C11.855 5.745 12.1923 5.75767 12.525 5.975L20.675 11.15C20.9917 11.35 21.15 11.6333 21.15 12C21.15 12.3667 20.9917 12.65 20.675 12.85L12.525 18.025Z" fill="white"/>
                </svg>                    
            </div>
            
            <div class="item--information">
                <div class="image" style="background-image: url(./assets/items/{payload?.item?.name || data?.item?.name}.png);" ></div>
                <div class="count">{payload?.item?.count || data?.item?.count}</div>
            </div>

            {#if data.type == 'positive'}
                <div class="arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.525 18.025C12.1917 18.2417 11.8543 18.2543 11.513 18.063C11.1717 17.8717 11.0007 17.5757 11 17.175V13H3C2.71667 13 2.479 12.904 2.287 12.712C2.095 12.52 1.99934 12.2827 2 12C2 11.7167 2.096 11.479 2.288 11.287C2.48 11.095 2.71734 10.9993 3 11H11V6.825C11 6.425 11.171 6.129 11.513 5.937C11.855 5.745 12.1923 5.75767 12.525 5.975L20.675 11.15C20.9917 11.35 21.15 11.6333 21.15 12C21.15 12.3667 20.9917 12.65 20.675 12.85L12.525 18.025Z" fill="white"/>
                    </svg>                    
                </div>
                <PlayerCard name={data.target.name} image={data.target.profile} />
            {/if}
        </div>
        <div class="caution">
            <div class="icon">
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.212401 12.0302L6.20408 0.903203C6.62877 0.114297 7.7601 0.114297 8.18514 0.903203L14.1765 12.0302C14.2687 12.2014 14.3149 12.3937 14.3106 12.5881C14.3064 12.7826 14.2518 12.9726 14.1521 13.1397C14.0525 13.3068 13.9113 13.4451 13.7422 13.5413C13.5731 13.6375 13.382 13.6882 13.1875 13.6885H1.2031C1.00844 13.6885 0.81711 13.638 0.647802 13.542C0.478495 13.4459 0.337008 13.3076 0.237175 13.1404C0.137341 12.9733 0.0825768 12.7832 0.0782347 12.5886C0.0738926 12.394 0.120121 12.2016 0.212401 12.0302ZM7.19443 11.9658C7.3335 11.9658 7.46944 11.9246 7.58507 11.8473C7.7007 11.7701 7.79082 11.6602 7.84404 11.5318C7.89725 11.4033 7.91118 11.2619 7.88405 11.1255C7.85692 10.9891 7.78995 10.8638 7.69162 10.7655C7.59328 10.6672 7.468 10.6002 7.33161 10.5731C7.19521 10.546 7.05384 10.5599 6.92536 10.6131C6.79688 10.6663 6.68707 10.7564 6.60981 10.8721C6.53255 10.9877 6.49131 11.1236 6.49131 11.2627C6.49131 11.4492 6.56539 11.628 6.69725 11.7599C6.82911 11.8917 7.00795 11.9658 7.19443 11.9658ZM6.43084 4.89414L6.63264 9.1832C6.63264 9.33239 6.6919 9.47546 6.79739 9.58095C6.90288 9.68644 7.04595 9.7457 7.19514 9.7457C7.34432 9.7457 7.4874 9.68644 7.59288 9.58095C7.69837 9.47546 7.75764 9.33239 7.75764 9.1832L7.95943 4.8959C7.96397 4.79345 7.94783 4.69114 7.91198 4.59506C7.87613 4.49898 7.82131 4.4111 7.75077 4.33666C7.68024 4.26222 7.59544 4.20274 7.50143 4.16178C7.40742 4.12081 7.30612 4.09919 7.20357 4.0982H7.19619C7.09295 4.09815 6.99076 4.11901 6.89581 4.15954C6.80085 4.20006 6.71508 4.2594 6.64369 4.33399C6.5723 4.40857 6.51675 4.49684 6.48041 4.59347C6.44407 4.69011 6.42769 4.79311 6.43225 4.89625L6.43084 4.89414Z" fill="white"/>
                </svg>                                    
            </div>
            <div class="message">You will lose this items</div>
        </div>

        <div class="action--buttons {data.type}">
            <button on:click={onCancelPressed} class="cancel--button">Cancel</button>
            <button on:click={onConfirmPressed} class="confirm--button">Done</button>
        </div>
    </div>
</div>
<div class="backdrop">
</div>

<style>
    .action--buttons {
        margin-top: 50px;
        display: flex;
        gap: 10px;
    }
    .action--buttons.negative .confirm--button {
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(224, 50, 50, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
    }
    .action--buttons.negative .confirm--button:hover {
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(224, 50, 50, 0.65);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
    }
    .cancel--button {
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;

        padding-block: 20px;
        padding-inline: 36px;

        min-width: 140px;
        text-align: center;
        
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        
        color: rgba(255, 255, 255, 0.95);

        cursor: pointer;
    }
    .cancel--button:hover {
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
    }
    .confirm--button {
        
        min-width: 140px;
        text-align: center;

        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(0, 217, 178, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.05em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.95);
        
        padding-block: 20px;
        text-align: center;

        cursor: pointer;
    }
    .confirm--button:hover {
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(0, 217, 178, 0.65);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
    }
    .caution {
        display: flex;
        gap: 9px;
        align-items: center;
        margin-top: 18px;
    }
    .caution .message {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: 0.05em;

        color: #FFFFFF;
    }
    .caution .icon {
        width: 30px;
        height: 30px;

        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.15);
        border-radius: 115555px;

        position: relative;
    }
    .caution .icon > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .transaction--information {
        display: flex;
        align-items: center;
        gap: 18px;
    }
    .item--information {
        /* margin-top: 50px; */
        width: 60px;
        height: 60px;
        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 115555px;

        position: relative;
    }
    .item--information .image {
        position: absolute;
        inset: 0;

        background-position: center;
        background-repeat: no-repeat;
        background-size: 50%;
    }
    .item--information .count {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -25%;
        display: inline-block;
        padding-inline: 10px;
        padding-block: 6px;

        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 10px;


        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.05em;

        color: #000000;
    }

    .backdrop, .content {
        position: absolute;
        inset: 0;
    }
    .wrapper {
        position: absolute;
        
        top: 21%;
        
        left: 50%;
        transform: translateX(-50%);

        /* background-color: red; */

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wrapper > .icon {
        margin-bottom: 27px;
    }
    .confirmation--text {
        margin-bottom: 50px;
    }
    .confirmation--text .top {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;

        text-align: center;

        letter-spacing: 0.05em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.45);
        margin-bottom: 1px;
    }
    .confirmation--text .bottom {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        align-items: center;
        text-align: center;
        letter-spacing: 0.15em;
        text-transform: uppercase;

        color: #FFFFFF;
    }
    .backdrop {
        z-index: 1;
        background: linear-gradient(0deg, rgba(35, 147, 125, 0.05), rgba(35, 147, 125, 0.05)), rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(12.5px);
    }
    .content.negative {
        background-image: url('/static/confirm-backdrop-negative.png');
    }
    .content {
        z-index: 2;
        inset: 0;
        background-image: url('/static/confirm-backdrop-positive.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>