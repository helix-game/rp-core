<script>
    import ButtonComponent from "../components/ButtonComponent.svelte";
    import GenderButtonComponent from "../components/GenderButtonComponent.svelte";
    import InputComponent from "../components/InputComponent.svelte";
    import DropdownComponent from "../components/DropdownComponent/DropdownComponent.svelte";
    import DatepickerComponent from "../components/DatepickerComponent/DatepickerComponent.svelte";
    import { fly } from "svelte/transition";
    import { active_state, s_current_idx, s_nationalities, s_scale } from "../store/stores";

    import { callEvent } from "../utils/callEvent";

    let firstName;
    let lastName;
    let nationality;
    let dateOfBirth;
    let gender;

    const handleGenderChange = ({ detail: new_gender }) => {
        let isMale = new_gender;

        gender = isMale;

        callEvent('CHANGE_GENDER', gender);
    }
    
    const handleBackButton = () => {
        active_state.set(0)
    }
    
    const handleSubmitDetails = () => {
        if (!firstName) return
        if (!lastName) return
        if (!nationality) return
        if (!dateOfBirth) return
        if (!gender) return
        
        // Start game
        callEvent('CREATE_CHARACTER', {
            first_name : firstName,
            last_name : lastName,
            date_of_birth : dateOfBirth,
            nationality : nationality,
            gender : gender,
            cid : $s_current_idx
        });
    }

    const handleEscapePress = e => {
        if (e.key !== 'Escape') return;

        active_state.set(0)
    }
</script>

<svelte:window on:keydown={handleEscapePress} />

<div class="character--creating"
    in:fly={{x: '-100%'}}
    out:fly={{x: '100%'}}
>
    <div class="form"
        style="scale: {$s_scale};"
    >
        <div class="form--title">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.25 29.9375V37.75H8.0625L31.1042 14.7083L23.2917 6.8958L0.25 29.9375ZM37.1458 8.66663C37.339 8.4739 37.4922 8.24496 37.5967 7.99293C37.7013 7.7409 37.7551 7.47073 37.7551 7.19788C37.7551 6.92503 37.7013 6.65486 37.5967 6.40283C37.4922 6.1508 37.339 5.92187 37.1458 5.72913L32.2708 0.854131C32.0781 0.660999 31.8492 0.507775 31.5971 0.40323C31.3451 0.298685 31.0749 0.244873 30.8021 0.244873C30.5292 0.244873 30.2591 0.298685 30.007 0.40323C29.755 0.507775 29.5261 0.660999 29.3333 0.854131L25.5208 4.66663L33.3333 12.4791L37.1458 8.66663Z" fill="white"/>
            </svg>
            <div class="group">
                <span>
                    <span class="top">Character</span><br>
                    <span class="btm">Registration</span>
                </span>
            </div>        
        </div>
        
        <div class="form--inputs">
            <InputComponent label={"First Name"} placeholder={"John"} bind:value={firstName} />
            <InputComponent label={"Last Name"} placeholder={"Smith"} bind:value={lastName} />
            <DropdownComponent options={$s_nationalities} label={"Nationality"} bind:currentOption={nationality} />
            <DatepickerComponent label={"Date of Birth"} bind:date={dateOfBirth} />
        </div>
        
    </div>

    <div class="group--buttons"
        style="scale: {$s_scale};"
    >
        <ButtonComponent on:click={handleBackButton} width={260} label={"Go back"} primary={false}>
            <svg slot="icon" width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z" fill="white"/>
            </svg>
        </ButtonComponent>
        
        <ButtonComponent on:click={handleSubmitDetails} width={450} label={"Confirm"} />
    </div>

    <div class="gender--buttons"
        style="scale: {$s_scale};"
    >
        <GenderButtonComponent active={gender === true} on:click={handleGenderChange} male={true} />
        <GenderButtonComponent active={gender === false} on:click={handleGenderChange} male={false} />
    </div>
</div>

<style>
    .character--creating {
        position: absolute;
        inset: 0;
    }
    .gender--buttons {
        transform-origin: 100% 0;

        display: flex;
        flex-direction: column;
        gap: 50px;

        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 120px;
    }
    .form {
        position: absolute;
        left: 120px;
        top: 120px;
        transform-origin: 0 0;
    }
    .form--title {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 44px;
        line-height: 75%;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #FFFFFF;
        text-shadow: 0px 0px 88px rgba(255, 255, 255, 0.15);

        display: flex;
        gap: 56px;
        align-items: center;

        margin-bottom: 68px;
    }
    .form--title .btm {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        letter-spacing: 0.12em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.65);
        text-shadow: 0px 0px 88px rgba(255, 255, 255, 0.15);
    }
    .group--buttons {
        transform-origin: 0 100%;

        position: absolute;
        left: 120px;
        bottom: 112px;

        display: flex;
        gap: 10px;
    }

    .form--inputs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;

        max-width: 840px;
    }
</style>