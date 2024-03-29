<script>
    import { onMount } from "svelte";
    import DropdownOptionComponent from "./DropdownOptionComponent.svelte";

    export let label = 'nationality';

    export let options = [
        'Afghan',
        'Albanian',
        'Algerian',
        'American',
        'Andorran',
        'Angolan',
        'Anguillan',
        'Citizen of Antigua and Barbuda',
        'Argentine',
        'Armenian',
        'Australian',
        'Austrian',
        'Azerbaijani',
        'Bahamian',
        'Bahraini',
        'Bangladeshi',
        'Barbadian',
        'Belarusian',
        'Belgian',
        'Belizean',
        'Beninese',
        'Bermudian',
        'Bhutanese',
        'Bolivian',
        'Citizen of Bosnia and Herzegovina',
        'Botswanan',
        'Brazilian',
        'British',
        'British Virgin Islander',
        'Bruneian',
        'Bulgarian',
        'Burkinan',
        'Burmese',
        'Burundian',
        'Cambodian',
        'Cameroonian',
        'Canadian',
        'Cape Verdean',
        'Cayman Islander',
        'Central African',
        'Chadian',
        'Chilean',
        'Chinese',
        'Colombian',
        'Comoran',
        'Congolese (Congo)',
        'Congolese (DRC)',
        'Cook Islander',
        'Costa Rican',
        'Croatian',
        'Cuban',
        'Cymraes',
        'Cymro',
        'Cypriot',
        'Czech',
        'Danish',
        'Djiboutian',
        'Dominican',
        'Citizen of the Dominican Republic',
        'Dutch',
        'East Timorese',
        'Ecuadorean',
        'Egyptian',
        'Emirati',
        'English',
        'Equatorial',
        'Guinean',
        'Eritrean',
        'Estonian',
        'Ethiopian',
        'Faroese',
        'Fijian',
        'Filipino',
        'Finnish',
        'French',
        'Gabonese',
        'Gambian',
        'Georgian',
        'German',
        'Ghanaian',
        'Gibraltarian',
        'Greek',
        'Greenlandic',
        'Grenadian',
        'Guamanian',
        'Guatemalan',
        'Citizen of Guinea-Bissau',
        'Guinean',
        'Guyanese',
        'Haitian',
        'Honduran',
        'Hong Konger',
        'Hungarian',
        'Icelandic',
        'Indian',
        'Indonesian',
        'Iranian',
        'Iraqi',
        'Irish',
        'Israeli',
        'Italian',
        'Ivorian',
        'Jamaican',
        'Japanese',
        'Jordanian',
        'Kazakh',
        'Kenyan',
        'Kittitian',
        'Citizen of Kiribati',
        'Kosovan',
        'Kuwaiti',
        'Kyrgyz',
        'Lao',
        'Latvian',
        'Lebanese',
        'Liberian',
        'Libyan',
        'Liechtenstein citizen',
        'Lithuanian',
        'Luxembourger',
        'Macanese',
        'Macedonian',
        'Malagasy',
        'Malawian',
        'Malaysian',
        'Maldivian',
        'Malian',
        'Maltese',
        'Marshallese',
        'Martiniquais',
        'Mauritanian',
        'Mauritian',
        'Mexican',
        'Micronesian',
        'Moldovan',
        'Monegasque',
        'Mongolian',
        'Montenegrin',
        'Montserratian',
        'Moroccan',
        'Mosotho',
        'Mozambican',
        'Namibian',
        'Nauruan',
        'Nepalese',
        'New Zealander',
        'Nicaraguan',
        'Nigerian',
        'Nigerien',
        'Niuean',
        'North Korean',
        'Northern Irish',
        'Norwegian',
        'Omani',
        'Pakistani',
        'Palauan',
        'Palestinian',
        'Panamanian',
        'Papua New Guinean',
        'Paraguayan',
        'Peruvian',
        'Pitcairn Islander',
        'Polish',
        'Portuguese',
        'Prydeinig',
        'Puerto Rican',
        'Qatari',
        'Romanian',
        'Russian',
        'Rwandan',
        'Salvadorean',
        'Sammarinese',
        'Samoan',
        'Sao Tomean',
        'Saudi Arabian',
        'Scottish',
        'Senegalese',
        'Serbian',
        'Citizen of Seychelles',
        'Sierra Leonean',
        'Singaporean',
        'Slovak',
        'Slovenian',
        'Solomon Islander',
        'Somali',
        'South African',
        'South Korean',
        'South',
        'Sudanese',
        'Spanish',
        'Sri Lankan',
        'St Helenian',
        'St Lucian',
        'Stateless',
        'Sudanese',
        'Surinamese',
        'Swazi',
        'Swedish',
        'Swiss',
        'Syrian',
        'Taiwanese',
        'Tajik',
        'Tanzanian',
        'Thai',
        'Togolese',
        'Tongan',
        'Trinidadian',
        'Tristanian',
        'Tunisian',
        'Turkish',
        'Turkmen',
        'Turks and Caicos Islander',
        'Tuvaluan',
        'Ugandan',
        'Ukrainian',
        'Uruguayan',
        'Uzbek',
        'Vatican citizen',
        'Citizen of Vanuatu',
        'Venezuelan',
        'Vietnamese',
        'Vincentian',
        'Wallisian',
        'Welsh',
        'Yemeni',
        'Zambian',
        'Zimbabwean',
    ]

    export let currentOption = 2
    export let computedOption = options[currentOption];

    const handleScroll = e => {
        const focusActive = e.target.closest('.dropdown--input, .dropdown--option')

        if (!focusActive) return;

        const scrollUp = e.deltaY < 0

        if (scrollUp)
            currentOption--
        else 
            currentOption++


        if (currentOption < 0)
            computedOption = options[options.length + currentOption]
        else if (currentOption >= options.length)
            computedOption = options[currentOption - options.length + 1]
        else
            computedOption = options[currentOption]
    }

    let dropdownActive = false;

    const toggleDropdown = () => {
        dropdownActive = !dropdownActive
    }

    const handleDropdownClick = ({detail: id}) => {
        currentOption -= 3 - id
        if (currentOption < 0)
            computedOption = options[currentOption + options.length]
        if (currentOption >= options.length)
            computedOption = options[currentOption - options.length + 1]
        else
            computedOption = options[currentOption]
    }

    onMount(() => {
        currentOption = 2;
        computedOption = options[currentOption];
    })
</script>

<svelte:window on:mousewheel={handleScroll} />

<div class="input--group">
    {#if label}
        <div class="label">{label}</div>
    {/if}

    <button on:click={toggleDropdown} class="input dropdown--input"
        class:active={dropdownActive}
    >
        <div class="group">
            <span>{computedOption}</span>
            <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_837_3956)">
                <path d="M0 0.982715C6.87492 -0.297111 10.6035 -0.357702 17 0.982715C23.5123 2.5658 27.2466 2.51806 34 0.982715V22.9827C27.3623 24.1841 23.638 24.3122 17 22.9827C10.1204 21.59 6.40335 21.6351 0 22.9827V0.982715Z" fill="white"/>
                </g>
                <defs>
                <filter id="filter0_i_837_3956" x="0" y="0" width="34" height="23.9324" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_837_3956"/>
                </filter>
                </defs>
            </svg>                
        </div>

        <div class="dropdown--button">
            <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.333416 0.333335L7.00008 7L13.6667 0.333334L0.333416 0.333335Z" fill="white" fill-opacity="0.65"/>
            </svg>                
        </div>
    </button>

    {#if dropdownActive}
        <div class="dropdown--options">
            {#each Array(5) as _, i (i)}
                {@const value = currentOption - 2 + i}
                {#if value < 0}
                    <DropdownOptionComponent on:click={handleDropdownClick} label={options[options.length + value]} id={i + 1} />
                {:else if value >= options.length}
                    <DropdownOptionComponent on:click={handleDropdownClick} label={options[value - options.length + 1]} id={i + 1} />
                {:else}
                    <DropdownOptionComponent on:click={handleDropdownClick} label={options[value]} id={i + 1} />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .input.active {
        background: rgba(0, 217, 178, 0.25);
        border: 1px solid rgba(0, 217, 178, 0.65);
        box-shadow: 0px 0px 137px rgba(0, 0, 0, 0.45), inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 18px;
    }
    .input.active .dropdown--button {
        background: #FFFFFF;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;
        transform: rotate(90deg);
    }

    .input.active .dropdown--button path {
        fill: #000;
        fill-opacity: 1.0;
    }
    .dropdown--options::before {
        content: '';
        display: block;

        position: absolute;
        left: -8px;

        top: 50%;
        transform: translateY(-50%);

        width: 8px;
        height: 24px;

        border-top-left-radius: 100%;
        border-bottom-left-radius: 100%;

        background: #0B8170;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 8px 0px 0px 8px;
    }
    .dropdown--options {
        z-index: 4;
        position: absolute;
        right: -80%;
        top: -75%;

        display: flex;
        flex-direction: column;
        align-items: center;

        width: fit-content;
    }
    .dropdown--button {
        width: 44px;
        height: 44px;

        position: relative;

        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        flex-shrink: 0;

        transition: transform 75ms ease-in-out;
    }
    .dropdown--button > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .label {
        z-index: 3;
        padding-inline: 15px;
        padding-block: 12px;

        background: #FFFFFF;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        width: fit-content;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #000000;
    }
    .input--group {
        position: relative;

        min-width: 400px;
        min-height: 100px;
    }
    .label {
        position: absolute;
        left: 25px;
        top: 0; 
    }
    .group {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .group > span {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: max-content;
    }
    .input {
        cursor: pointer;

        max-height: 100px;

        width: 100%;

        margin-top: 31px;

        padding-inline: 44px;
        padding-block: 36px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0.05em;
        color: #FFFFFF;

        background: rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 18px;

        outline: 0;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>