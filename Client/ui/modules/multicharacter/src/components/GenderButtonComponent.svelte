<script>
    import { createEventDispatcher } from "svelte";

    export let male = true;
    export let active = false;

    const dispatch = createEventDispatcher()

    const handleClick = () => {
        dispatch('click', male)
    }
</script>

<div class="gender--grouping">
    <div class="label"
    >
        {male ? 'Male' : 'Female'}
    </div>
    <button
        on:click={handleClick}
        class:male={male}
        class:female={!male}
        class:active={active}
    >
        <div class="content">
            {#if male}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5916 10.6512L29.0724 4.16667H20.6666V0.5H35.3333V15.1667H31.6666V6.759L25.1821 13.2435C27.2975 16.0164 28.2801 19.4897 27.9309 22.9599C27.5818 26.43 25.9269 29.6379 23.3015 31.9338C20.676 34.2297 17.2762 35.4422 13.7905 35.3256C10.3047 35.209 6.99348 33.7722 4.52729 31.306C2.0611 28.8398 0.624254 25.5286 0.507689 22.0428C0.391124 18.557 1.60355 15.1572 3.89948 12.5318C6.1954 9.90637 9.40323 8.25152 12.8734 7.90235C16.3436 7.55317 19.8168 8.53577 22.5898 10.6512H22.5916ZM14.2499 31.6667C16.9242 31.6667 19.4889 30.6043 21.3799 28.7133C23.2709 26.8223 24.3333 24.2576 24.3333 21.5833C24.3333 18.9091 23.2709 16.3443 21.3799 14.4533C19.4889 12.5623 16.9242 11.5 14.2499 11.5C11.5757 11.5 9.01094 12.5623 7.11995 14.4533C5.22896 16.3443 4.16661 18.9091 4.16661 21.5833C4.16661 24.2576 5.22896 26.8223 7.11995 28.7133C9.01094 30.6043 11.5757 31.6667 14.2499 31.6667Z" fill="white"/>
                </svg>        
            {:else}
                <svg width="28" height="43" viewBox="0 0 28 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1666 28.2123C8.71249 27.744 5.56507 25.9815 3.36084 23.2812C1.15661 20.5809 0.0600679 17.1442 0.292955 13.6663C0.525843 10.1884 2.07078 6.92863 4.61535 4.5463C7.15992 2.16398 10.5142 0.836835 14 0.833258C17.4899 0.829894 20.8506 2.15376 23.4007 4.53646C25.9507 6.91917 27.4993 10.1824 27.7325 13.6646C27.9657 17.1468 26.866 20.5873 24.6563 23.2888C22.4467 25.9902 19.2926 27.7503 15.8333 28.2123V31.9999H25V35.6666H15.8333V42.9999H12.1666V35.6666H2.99995V31.9999H12.1666V28.2123ZM14 24.6666C16.6742 24.6666 19.239 23.6042 21.1299 21.7133C23.0209 19.8223 24.0833 17.2575 24.0833 14.5833C24.0833 11.909 23.0209 9.34426 21.1299 7.45327C19.239 5.56227 16.6742 4.49993 14 4.49993C11.3257 4.49993 8.76095 5.56227 6.86996 7.45327C4.97896 9.34426 3.91662 11.909 3.91662 14.5833C3.91662 17.2575 4.97896 19.8223 6.86996 21.7133C8.76095 23.6042 11.3257 24.6666 14 24.6666Z" fill="white"/>
                </svg>        
            {/if}
        </div>
    </button>
</div>

<style>
    .gender--grouping {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
    }
    .label {
        padding-inline: 17px;
        padding-block: 12px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #000000;

        background: #FFFFFF;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        width: fit-content;

        /* margin-inline: auto; */
    }
    button {
        width: 116px;
        height: 116px;

        border-radius: 100%;
        
        outline: none;
        border: 0;
        
        position: relative;

        cursor: pointer;
    }

    button .content {
        border-radius: 100%;
        position: absolute;
        width: 84px;
        height: 84px;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    button:hover .content > svg {
        fill-opacity: 0.75;
    }
    button .content > svg {
        fill-opacity: 0.35;
    }
    button.active .content > svg {
        fill-opacity: 1;
    }

    /* Male Default */
    button.male {
        background: linear-gradient(0deg, rgba(65, 204, 177, 0.15), rgba(65, 204, 177, 0.15)), rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button.male .content {
        background: linear-gradient(0deg, rgba(65, 204, 177, 0.25), rgba(65, 204, 177, 0.25)), rgba(0, 0, 0, 0.05);
    }

    /* Male Active */
    button.male.active {
        background: linear-gradient(0deg, rgba(65, 204, 177, 0.35), rgba(65, 204, 177, 0.35)), rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button.male.active .content {
        background: linear-gradient(0deg, rgba(65, 204, 177, 0.75), rgba(65, 204, 177, 0.75)), rgba(0, 0, 0, 0.05);
    }

    /* Male Hover */
    button.male:hover {
        background: linear-gradient(0deg, rgba(65, 204, 177, 0.22), rgba(65, 204, 177, 0.22)), rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button.male:hover .content {
        background: linear-gradient(0deg, rgba(65, 204, 177, 0.45), rgba(65, 204, 177, 0.45)), rgba(0, 0, 0, 0.05);
    }
    
    /* Female Default */
    button.female {
        background: linear-gradient(0deg, rgba(211, 77, 174, 0.15), rgba(211, 77, 174, 0.15)), rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button.female .content {
        background: linear-gradient(0deg, rgba(211, 77, 174, 0.25), rgba(211, 77, 174, 0.25)), rgba(0, 0, 0, 0.05);
    }
        
    /* Female Active */
    button.female.active {
        background: linear-gradient(0deg, rgba(211, 77, 174, 0.35), rgba(211, 77, 174, 0.35)), rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button.female.active .content {
        background: linear-gradient(0deg, rgba(211, 77, 174, 0.75), rgba(211, 77, 174, 0.75)), rgba(0, 0, 0, 0.05);
    }

    /* Female Hover */
    button.female:hover {
        background: linear-gradient(0deg, rgba(211, 77, 174, 0.22), rgba(211, 77, 174, 0.22)), rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    button.female:hover .content {
        background: linear-gradient(0deg, rgba(211, 77, 174, 0.45), rgba(211, 77, 174, 0.45)), rgba(0, 0, 0, 0.05);
    }

    button .content > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>