<script>
    import Slot from "./Slot.svelte";

    export let invert = false;
    export let pockets;
    export let invId;

    console.log(pockets)
</script>

<aside>
    <figure class="fast--slots">
        <div class="indicators {invert ? "invert": ""}">
            {#if invert}
                <svg class="top--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13V13C12 6.37258 6.62742 1 -1.78814e-07 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                </svg>                                
                
                <svg class="middle--right--bar" width="1" height="575" viewBox="0 0 1 575" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1" height="575" transform="matrix(-1 0 0 1 1 0)" fill="white" fill-opacity="0.08"/>
                </svg>                            
                
                <svg class="bottom--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0V0C12 6.62742 6.62742 12 -1.78814e-07 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                </svg>
            {:else}
                <div class="top--left--corner">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13V13C1 6.37258 6.37258 1 13 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                    </svg>            
                </div>
                
                <div class="middle--left--bar">
                    <svg width="1" height="575" viewBox="0 0 1 575" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="1" height="575" transform="matrix(-1 0 0 1 1 0)" fill="white" fill-opacity="0.08"/>
                    </svg>
                </div>
                
                <div class="bottom--left--corner">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0V0C1 6.62742 6.37258 12 13 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                    </svg>            
                </div>
            {/if}

            <svg class="top--bar" width="68" height="1" viewBox="0 0 68 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="68" width="1" height="68" transform="rotate(90 68 0)" fill="white" fill-opacity="0.08"/>
            </svg>                                                                       
    
            <svg class="bottom--bar" width="68" height="1" viewBox="0 0 68 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1" height="68" transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)" fill="white" fill-opacity="0.08"/>
            </svg>
        </div>
    
        <div class="content {invert ? "invert": ""}">
            {#each Array(6) as _, index (index)}
                <Slot invId={invId} data={pockets[index + 1]} empty={pockets[index + 1] == undefined} type={'pockets'} slot={index + 1} {invert} />
            {/each}
        </div>
    </figure>
</aside>

<style>
    figure.fast--slots {
        height: 661px;
        width: 118px;
        position: relative;
    }

    figure.fast--slots .content {
        padding-top: 25px;
        padding-bottom: 32px;
        padding-left: 24px;

        width: 100%;
        height: 100%;

        display: flex;
        gap: 8px;
        flex-direction: column;
    }
    .content.invert {
        padding-left: 0!important;
        padding-right: 24px;
    }

    .middle--right--bar, .middle--left--bar {
        width: fit-content;
        position: absolute;

        top: 50%;
        transform: translateY(-50%);
    }

    .middle--left--bar {
        left: 0;
    }

    .middle--right--bar {
        right: 0;
    }

    .bottom--bar, .top--bar {
        width: fit-content;
        position: absolute;
    }

    .top--bar {
        top: 1px;
        left: 41px;
    }

    .indicators.invert .bottom--bar, .indicators.invert .top--bar {
        left: 0;
        right: 41px;
    }
    .bottom--bar {
        bottom: 1px;
        left: 41px;
    }

    .top--left--corner,
    .top--right--corner,
    .bottom--left--corner,
    .bottom--right--corner
    {
        position: absolute;
    }

    .top--left--corner, .top--right--corner {
        top: 0;
    }

    .bottom--left--corner, .bottom--right--corner {
        bottom: 0;
    }

    .top--left--corner, .bottom--left--corner {
        left: 0;
    }
    .top--right--corner, .bottom--right--corner {
        right: 0;
    }

    .indicators {
        position: absolute;
        inset: 0;
    }
</style>