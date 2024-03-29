<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let selected = false;
    export let locked = false;
    export let isNew = false;
    
    export let index;
    export let identifier;
    export let firstName;
    export let lastName;

    const dispatch = createEventDispatcher()

    const handleClick = () =>
    {
        if (locked && !isNew) return;
        if (selected) return;

        dispatch('characterSelected', { identifier, isNew, index })
    }
</script>

<button
    on:click={handleClick}
    class:selected={!locked && selected}
    class:locked={!isNew && locked}
    class:new={isNew}
>
    {#if !isNew && locked}
        <div class="locked--icon">
            <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.99999 18.3334C1.54166 18.3334 1.14944 18.1703 0.823328 17.8442C0.496661 17.5175 0.333328 17.125 0.333328 16.6667V8.33337C0.333328 7.87504 0.496661 7.48254 0.823328 7.15587C1.14944 6.82976 1.54166 6.66671 1.99999 6.66671H2.83333V5.00004C2.83333 3.84726 3.23972 2.86449 4.0525 2.05171C4.86472 1.23949 5.84722 0.833374 6.99999 0.833374C8.15277 0.833374 9.13555 1.23949 9.94833 2.05171C10.7606 2.86449 11.1667 3.84726 11.1667 5.00004V6.66671H12C12.4583 6.66671 12.8508 6.82976 13.1775 7.15587C13.5036 7.48254 13.6667 7.87504 13.6667 8.33337V16.6667C13.6667 17.125 13.5036 17.5175 13.1775 17.8442C12.8508 18.1703 12.4583 18.3334 12 18.3334H1.99999ZM6.99999 14.1667C7.45833 14.1667 7.85083 14.0037 8.1775 13.6775C8.50361 13.3509 8.66666 12.9584 8.66666 12.5C8.66666 12.0417 8.50361 11.6492 8.1775 11.3225C7.85083 10.9964 7.45833 10.8334 6.99999 10.8334C6.54166 10.8334 6.14944 10.9964 5.82333 11.3225C5.49666 11.6492 5.33333 12.0417 5.33333 12.5C5.33333 12.9584 5.49666 13.3509 5.82333 13.6775C6.14944 14.0037 6.54166 14.1667 6.99999 14.1667ZM4.49999 6.66671H9.49999V5.00004C9.49999 4.3056 9.25694 3.71532 8.77083 3.22921C8.28472 2.7431 7.69444 2.50004 6.99999 2.50004C6.30555 2.50004 5.71527 2.7431 5.22916 3.22921C4.74305 3.71532 4.49999 4.3056 4.49999 5.00004V6.66671Z" fill="black"/>
            </svg>                
        </div>
    {/if}

    {#if !isNew}
        <p>
            <span class="identifier">{identifier}</span><br>
            <span class="name"><span>{firstName}</span> {lastName}</span>
        </p>
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.61 21.5201C24.0032 19.7791 22.0532 18.3897 19.8829 17.4394C17.7127 16.4891 15.3692 15.9985 13 15.9985C10.6308 15.9985 8.2873 16.4891 6.11706 17.4394C3.94681 18.3897 1.99685 19.7791 0.39 21.5201C0.141917 21.7944 0.00314229 22.1502 0 22.5201V28.5201C0.00525845 28.9144 0.165612 29.2908 0.446349 29.5678C0.727085 29.8448 1.10562 30.0001 1.5 30.0001H24.5C24.8978 30.0001 25.2794 29.8421 25.5607 29.5607C25.842 29.2794 26 28.8979 26 28.5001V22.5001C25.992 22.1372 25.8536 21.7893 25.61 21.5201Z" fill="white"/>
            <path d="M13 14C16.866 14 20 10.866 20 7C20 3.13401 16.866 0 13 0C9.13401 0 6 3.13401 6 7C6 10.866 9.13401 14 13 14Z" fill="white"/>
        </svg>        
    {:else}
        <p>
            <span class="create--top">Create</span><br>
            <span class="create--btm">New Character</span>
        </p>
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23" cy="23" r="23" fill="white" fill-opacity="0.05"/>
            <path d="M21.8854 14.5293H24.1145C24.3127 14.5293 24.4118 14.592 24.4118 14.7175V31.2822C24.4118 31.4077 24.3127 31.4705 24.1145 31.4705H21.8854C21.6873 31.4705 21.5882 31.4077 21.5882 31.2822V14.7175C21.5882 14.592 21.6873 14.5293 21.8854 14.5293Z" fill="white"/>
            <path d="M15.4159 21.5881H30.5841C30.7045 21.5881 30.7647 21.6872 30.7647 21.8853V24.1144C30.7647 24.3126 30.7045 24.4116 30.5841 24.4116H15.4159C15.2955 24.4116 15.2353 24.3126 15.2353 24.1144V21.8853C15.2353 21.6872 15.2955 21.5881 15.4159 21.5881Z" fill="white"/>
        </svg>            
    {/if}
    
</button>

<style>
    .create--top {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 97.5%;
        letter-spacing: 1px;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.5);
    }
    .create--btm {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 97.5%;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #FFFFFF;
    }

    button.new {
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 18px;
    }
    button.new svg {
        opacity: 1.0;
    }
    button.new:not(.selected):hover {
        background: radial-gradient(86.73% 106.46% at 102.21% 88.85%, rgba(255, 255, 255, 0.1) 0.81%, rgba(255, 255, 255, 0.031) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
    }
    button.new:not(.selected):hover circle {
        fill: #fff;
        fill-opacity: 1.0;
    }
    button.new:not(.selected):hover path {
        fill: #000;
        fill-opacity: 1.0;
    }
    .locked--icon {
        position: absolute;
        left: -20px;

        width: 40px;
        height: 40px;

        border-radius: 100%;
        background-color: #fff;
        z-index: 2;
    }

    .locked--icon > svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1.0;
    }

    button.locked {
        background: radial-gradient(100.22% 166.86% at 96.68% 100%, rgba(172, 52, 52, 0.45) 0.81%, rgba(172, 52, 52, 0.1395) 54.08%, rgba(172, 52, 52, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(172, 52, 52, 0.1);
        border: 1px solid rgba(172, 52, 52, 0.45);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        position: relative;

        cursor: unset;
    }
    button.selected {
        background: radial-gradient(100.22% 166.86% at 96.68% 100%, rgba(0, 217, 178, 0.65) 0.81%, rgba(0, 217, 178, 0.2015) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(65, 204, 177, 0.25);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        position: relative;
        cursor: unset;
    }
    button.selected::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        inset-inline: 69px;
        height: 3px;

        background: #41CCB1;
        border-radius: 8px 8px 0 0;
    }
    button.selected > svg {
        opacity: 1.0;
    }

    button:not(.selected, .locked):hover > svg {
        opacity: 0.65;
    }
    button:not(.selected, .locked):hover {
        background: radial-gradient(100.22% 166.86% at 96.68% 100%, rgba(255, 255, 255, 0.25) 0.81%, rgba(255, 255, 255, 0.0775) 54.08%, rgba(172, 52, 52, 0) 100%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.05);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
    }

    button:not(.selected, .locked, .new) svg {
        opacity: 0.5;
    }
    .identifier {
        font-size: 20px;
        font-weight: 600;
        opacity: 0.35;

        letter-spacing: 1px;
    }

    .name {
        opacity: 1;
        letter-spacing: 2.64px;
        font-size: 22px;
    }
    
    button {
        background: transparent;
        border: 0;
        outline: 0;
        cursor: pointer;
        
        padding-block: 42px;
        padding-inline: 50px;
        
        background-color: red;

        background: rgba(255, 255, 255, 0.05);

        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 18px;

        display: flex;
        justify-content: flex-end;
        gap: 32px;

        align-items: center;

        min-width: 450px;
    }
    
    p {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 110%;
        text-align: right;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        
        color: #fff;
    }
    </style>