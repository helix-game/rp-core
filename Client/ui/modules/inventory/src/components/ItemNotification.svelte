<script>
    import { fade } from "svelte/transition";

    export let type;
    export let item;
    export let count = 0;

    let node;
</script>

<div bind:this={node} transition:fade class="notification {type == "added" ? "added" : "removed"}">
    <div class="image" style="background-image: url('./assets/items/{item}.png');">
        <div class="indicator">
            {#if type == 'added'}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.42857 7H2.57143C2.41988 7 2.27453 6.89464 2.16737 6.70711C2.0602 6.51957 2 6.26522 2 6C2 5.73478 2.0602 5.48043 2.16737 5.29289C2.27453 5.10536 2.41988 5 2.57143 5H9.42857C9.58012 5 9.72547 5.10536 9.83263 5.29289C9.9398 5.48043 10 5.73478 10 6C10 6.26522 9.9398 6.51957 9.83263 6.70711C9.72547 6.89464 9.58012 7 9.42857 7Z" fill="white"/>
                    <path d="M5 9.42857L5 2.57143C5 2.41988 5.10536 2.27453 5.29289 2.16737C5.48043 2.0602 5.73478 2 6 2C6.26522 2 6.51957 2.0602 6.70711 2.16737C6.89464 2.27453 7 2.41988 7 2.57143L7 9.42857C7 9.58012 6.89464 9.72547 6.70711 9.83263C6.51957 9.9398 6.26522 10 6 10C5.73478 10 5.48043 9.9398 5.29289 9.83263C5.10536 9.72547 5 9.58012 5 9.42857Z" fill="white"/>
                </svg>
            {:else if type == 'removed'}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.42857 7H2.57143C2.41988 7 2.27453 6.89464 2.16737 6.70711C2.0602 6.51957 2 6.26522 2 6C2 5.73478 2.0602 5.48043 2.16737 5.29289C2.27453 5.10536 2.41988 5 2.57143 5H9.42857C9.58012 5 9.72547 5.10536 9.83263 5.29289C9.9398 5.48043 10 5.73478 10 6C10 6.26522 9.9398 6.51957 9.83263 6.70711C9.72547 6.89464 9.58012 7 9.42857 7Z" fill="white"/>
                </svg>                    
            {/if}
        </div>
        <div class="amount">
            x{count}
        </div>
    </div>
    <div class="label">
        <div class="top">{type == 'added' ? "ADDED" : "REMOVED"}</div>
        <div class="bottom">{item}</div>
    </div>
</div>

<style>
    .notification .amount {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        line-height: 13px;

        color: #000000;

        padding-inline: 6px;
        padding-block: 3px;

        width: fit-content;

        background: linear-gradient(0deg, rgba(255, 62, 62, 0.05), rgba(255, 62, 62, 0.05)), #FFFFFF;
        border-bottom: 1px solid rgba(0, 0, 0, 0.35);
        border-radius: 8px;

        position: absolute;
        right: -5px;
        top: -5px;

        text-transform:none;
    }

    .notification .image {
        position: relative;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .notification {
        padding-left: 9px;
        padding-top: 9px;

        padding-right: 28px;
        padding-bottom: 14px;
        border-radius: 17px;
        width: fit-content;

        position: relative;

        display: flex;
        align-items: center;
        
        gap: 9px;

        margin-bottom: 6px;

        margin-inline: auto;
    }

    .notification:last-child {
        margin-bottom: 0;
    }

    .notification .image {
        width: 50px;
        height: 50px;
        
        border-radius: 12px;
    }

    .notification .label {
        position: relative;
        top: 2px;
    }


    .notification .indicator {
        width: 18px;
        height: 18px;
        position: relative;
        top: -3px;
        left: -3px;
    }
    .notification .indicator svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .notification.added .indicator {
        background: #42C857;
        border-bottom: 1px solid rgba(0, 0, 0, 0.35);
        border-radius: 11px;
    }
    .notification.removed .indicator {
        background: #FF3E3E;
        border-bottom: 1px solid rgba(0, 0, 0, 0.35);
        border-radius: 11px;
    }

    .notification.added .image {
        background: linear-gradient(347.55deg, rgba(62, 255, 93, 0.25) 8.94%, rgba(62, 255, 93, 0) 75.09%), linear-gradient(0deg, rgba(62, 255, 93, 0.08), rgba(62, 255, 93, 0.08)), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgba(0, 0, 0, 0.7);
        border-bottom: 1px solid rgba(62, 255, 93, 0.45);
    }
    .notification.added {
        background: radial-gradient(178.32% 464.37% at -19.12% 191.07%, rgba(62, 255, 93, 0.45) 0%, rgba(255, 62, 62, 0) 100%, rgba(62, 255, 93, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(55.16% 69.23% at 50% 91.14%, rgba(62, 255, 93, 0.25) 0%, rgba(62, 255, 93, 0) 100%), linear-gradient(0deg, rgba(15, 38, 20, 0.76), rgba(15, 38, 20, 0.76)), rgba(0, 0, 0, 0.76);

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 19px;
        letter-spacing: 0.02em;
        text-transform: uppercase;

        color: #3EFF5D;
    }
    .notification.removed .image {
        background: linear-gradient(347.55deg, rgba(255, 62, 62, 0.25) 8.94%, rgba(255, 62, 62, 0) 75.09%), linear-gradient(0deg, rgba(255, 62, 62, 0.08), rgba(255, 62, 62, 0.08)), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgba(0, 0, 0, 0.7);
        border-bottom: 1px solid rgba(255, 62, 62, 0.45);
    }
    .notification .bottom {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        color: #FFFFFF;

        position: relative;
        top: -4px;
    }
    .notification.removed {
        background: radial-gradient(178.32% 464.37% at -19.12% 191.07%, rgba(255, 62, 62, 0.45) 0%, rgba(255, 62, 62, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(55.16% 69.23% at 50% 91.14%, rgba(255, 62, 62, 0.25) 0%, rgba(255, 62, 62, 0) 100%), linear-gradient(0deg, rgba(38, 15, 15, 0.76), rgba(38, 15, 15, 0.76)), rgba(0, 0, 0, 0.76);

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        text-align: left;
        letter-spacing: 0.02em;
        text-transform: uppercase;

        color: #FF3E3E;
    }
</style>