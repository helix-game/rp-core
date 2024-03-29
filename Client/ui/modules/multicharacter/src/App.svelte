<script>
    import { active_state, s_nationalities, s_characters, s_scale } from './store/stores'

    import CharacterSelectionScreen from "./views/CharacterSelectionScreen.svelte";
    import CharacterCreatingScreen from "./views/CharacterCreatingScreen.svelte";
    import { useEvent } from './utils/useEvent';
    import { callEvent } from './utils/callEvent';
    
    import { onMount } from 'svelte';


    useEvent('Initialise', (data) => {
        s_nationalities.set(data.nationalities)
        s_characters.set(data.characterData.characters)
    })

    active_state.subscribe(x => {
        if (x === 0)
            callEvent('CHOOSE_CHARACTER_CAMERA')
        else if (x === 1)
            callEvent('CREATE_CHARACTER_CAMERA')
    })

    function scaleElement() {
        var baseHeight = 1080
    
        var currentHeight = window.innerHeight;

        var scale = currentHeight / baseHeight;
        if (scale > 1.0)
            scale = 1.0

        s_scale.set(scale)
    }

    onMount(() => {
        scaleElement()
    })
</script>

<svelte:window on:resize={scaleElement} />

{#if $active_state === 0}
    <CharacterSelectionScreen />
{:else}
    <CharacterCreatingScreen />
{/if}