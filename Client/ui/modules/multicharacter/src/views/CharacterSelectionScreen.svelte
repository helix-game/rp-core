<script>
    import { fly } from "svelte/transition";
    import CharacterSelectionButton from "../components/CharacterSelectionButton.svelte";
    import CharacterStat from "../components/CharacterStat.svelte";
    import PlayButton from "../components/PlayButton.svelte";
    import { active_state, s_characters, s_current_idx, s_scale } from "../store/stores";
    import { callEvent } from "../utils/callEvent";


    let selected = undefined;
    let selectedData = undefined;

    let characterNew = false;

    const handleSelection = ({ detail }) => {
        const { identifier, index, isNew } = detail;
        
        characterNew = isNew;
        selected = index;


        s_current_idx.set(index + 1);

        if (isNew) return;

        selectedData = $s_characters.find(x => x.identifier === identifier)
    }

    const handleStartGame = () => {
        if (characterNew)
            return active_state.set(1)

        // Start game
        callEvent('CHOOSE_CHARACTER', selectedData.identifier)
    }
</script>

<main 
    in:fly={{y: '-100%', delay: 150}}
    out:fly={{y: '100%'}}
class="character--selection">
    {#if selected !== undefined && !characterNew}
        <div 
            transition:fly={{ x: '-100%', duration: 150 }}
            style="scale: {$s_scale};"
        class="character--stats">
            <CharacterStat label={"Cash Money"} value={selectedData?.cash || 0}>
                <svg slot="icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_22200_44)">
                    <path d="M26 13.75C26 15.8211 23.3137 17.5 20 17.5C16.6863 17.5 14 16.0711 14 14C14 11.9289 16.6863 10 20 10C23.3137 10 26 11.6789 26 13.75Z" fill="white" fill-opacity="0.65"/>
                    <path d="M13 4.25C13 6.32107 10.2018 8 6.75 8C3.29822 8 0.5 6.57107 0.5 4.5C0.5 2.42893 3.29822 0.5 6.75 0.5C10.2018 0.5 13 2.17893 13 4.25Z" fill="white" fill-opacity="0.65"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9635 17.3337C24.7311 18.3335 22.5212 19 20 19C17.4876 19 15.2843 18.4367 14.0495 17.5117C14.0168 17.673 14 17.836 14 18C14 20.071 16.6863 21.5 20 21.5C23.3137 21.5 26 19.821 26 17.75C26 17.6093 25.9876 17.4704 25.9635 17.3337Z" fill="white" fill-opacity="0.65"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9619 16.3337C11.6782 17.3335 9.37626 18 6.75 18C4.13289 18 1.83782 17.4367 0.551521 16.5117C0.517528 16.673 0.5 16.836 0.5 16.9999C0.5 19.071 3.29822 20.4999 6.75 20.4999C10.2018 20.4999 13 18.821 13 16.7499C13 16.6093 12.9871 16.4704 12.9619 16.3337Z" fill="white" fill-opacity="0.65"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7135 12.25C11.4811 13.2498 9.27122 13.9162 6.75004 13.9162C4.23759 13.9162 2.0343 13.3529 0.799465 12.4279C0.766829 12.5892 0.75 12.7522 0.75 12.9162C0.75 14.9872 3.43629 16.4162 6.75 16.4162C10.0637 16.4162 12.75 14.7372 12.75 12.6662C12.75 12.5255 12.7376 12.3866 12.7135 12.25Z" fill="white" fill-opacity="0.65"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7135 8C11.4811 8.99977 9.27122 9.6662 6.75004 9.6662C4.23759 9.6662 2.0343 9.10293 0.799465 8.17794C0.766829 8.3392 0.75 8.50223 0.75 8.66616C0.75 10.7372 3.43629 12.1662 6.75 12.1662C10.0637 12.1662 12.75 10.4872 12.75 8.41616C12.75 8.27549 12.7376 8.13664 12.7135 8Z" fill="white" fill-opacity="0.65"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9635 21.5C24.7311 22.4998 22.5212 23.1662 20 23.1662C17.4876 23.1662 15.2843 22.603 14.0495 21.678C14.0168 21.8393 14 22.0023 14 22.1662C14 24.2373 16.6863 25.6662 20 25.6662C23.3137 25.6662 26 23.9873 26 21.9162C26 21.7755 25.9876 21.6367 25.9635 21.5Z" fill="white" fill-opacity="0.65"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9619 20.5C11.6782 21.4998 9.37626 22.1662 6.75 22.1662C4.13289 22.1662 1.83782 21.603 0.551521 20.678C0.517528 20.8392 0.5 21.0023 0.5 21.1662C0.5 23.2373 3.29822 24.6662 6.75 24.6662C10.2018 24.6662 13 22.9873 13 20.9162C13 20.7755 12.9871 20.6367 12.9619 20.5Z" fill="white" fill-opacity="0.65"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_22200_44">
                    <rect width="26" height="26" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
    
                <svg slot="suffixIcon" width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.181 15.2104L23.7319 15.2104L14.8991 0.65271L12.6086 4.4086L19.181 15.2104Z" fill="white" fill-opacity="0.65"/>
                    <path d="M4.72989 15.5375L11.3008 4.73438H11.2708L14.1559 0L9.63667 0L0.179077 15.5375H4.72989Z" fill="white" fill-opacity="0.65"/>
                    <path d="M0 16.2988L3.27118 19.9998L21.0554 19.9998L24.0578 16.2988L0 16.2988Z" fill="white" fill-opacity="0.65"/>
                    <path d="M15.1099 13.7139L12.0459 8.62634L8.95349 13.6864L15.1099 13.7139L12.0459 8.62634L8.95349 13.6864L15.1099 13.7139Z" fill="white" fill-opacity="0.65"/>
                </svg>
            </CharacterStat>
            <CharacterStat label={"Bank Money"} value={selectedData?.bank || 0}>
                <svg slot="icon" width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.1667 9.16663V19.0833C29.1667 20.2105 28.7189 21.2915 27.9219 22.0885C27.1249 22.8855 26.0439 23.3333 24.9167 23.3333H5.08337C3.9562 23.3333 2.8752 22.8855 2.07817 22.0885C1.28114 21.2915 0.833374 20.2105 0.833374 19.0833V9.16663H29.1667ZM23.5 14.8333H19.25C18.8743 14.8333 18.514 14.9825 18.2483 15.2482C17.9826 15.5139 17.8334 15.8742 17.8334 16.25C17.8334 16.6257 17.9826 16.986 18.2483 17.2517C18.514 17.5174 18.8743 17.6666 19.25 17.6666H23.5C23.8758 17.6666 24.2361 17.5174 24.5018 17.2517C24.7675 16.986 24.9167 16.6257 24.9167 16.25C24.9167 15.8742 24.7675 15.5139 24.5018 15.2482C24.2361 14.9825 23.8758 14.8333 23.5 14.8333ZM24.9167 0.666626C26.0439 0.666626 27.1249 1.11439 27.9219 1.91142C28.7189 2.70845 29.1667 3.78946 29.1667 4.91663V6.33329H0.833374V4.91663C0.833374 3.78946 1.28114 2.70845 2.07817 1.91142C2.8752 1.11439 3.9562 0.666626 5.08337 0.666626H24.9167Z" fill="white" fill-opacity="0.65"/>
                </svg>      
                <svg slot="suffixIcon" width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.181 15.2104L23.7319 15.2104L14.8991 0.65271L12.6086 4.4086L19.181 15.2104Z" fill="white" fill-opacity="0.65"/>
                    <path d="M4.72989 15.5375L11.3008 4.73438H11.2708L14.1559 0L9.63667 0L0.179077 15.5375H4.72989Z" fill="white" fill-opacity="0.65"/>
                    <path d="M0 16.2988L3.27118 19.9998L21.0554 19.9998L24.0578 16.2988L0 16.2988Z" fill="white" fill-opacity="0.65"/>
                    <path d="M15.1099 13.7139L12.0459 8.62634L8.95349 13.6864L15.1099 13.7139L12.0459 8.62634L8.95349 13.6864L15.1099 13.7139Z" fill="white" fill-opacity="0.65"/>
                </svg>      
            </CharacterStat>
            {#if selectedData?.phone_number}
                <CharacterStat label={"Phone Number"} value={selectedData?.phone_number}>
                    <svg slot="icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.6006 19.8225L20.9806 17.4425C21.3012 17.126 21.7067 16.9093 22.1481 16.8187C22.5894 16.7282 23.0476 16.7677 23.4669 16.9325L26.3675 18.0907C26.7912 18.2627 27.1546 18.5562 27.4117 18.9344C27.6689 19.3126 27.8083 19.7584 27.8125 20.2157V25.5282C27.81 25.8392 27.7446 26.1466 27.6202 26.4317C27.4959 26.7169 27.3151 26.9739 27.0887 27.1873C26.8624 27.4008 26.5952 27.5662 26.3033 27.6736C26.0113 27.7811 25.7007 27.8283 25.39 27.8125C5.06436 26.5482 0.963115 9.33567 0.18749 2.74817C0.151485 2.42468 0.184381 2.09723 0.284016 1.78736C0.38365 1.47749 0.547764 1.19224 0.765561 0.95035C0.983358 0.708466 1.2499 0.515436 1.54766 0.383961C1.84541 0.252486 2.16763 0.185546 2.49311 0.187543H7.62499C8.08294 0.188899 8.53001 0.327228 8.9087 0.584737C9.28739 0.842247 9.58038 1.20716 9.74999 1.63254L10.9081 4.53317C11.0784 4.9508 11.1218 5.40935 11.033 5.85153C10.9442 6.29371 10.7271 6.69992 10.4087 7.01942L8.02874 9.39942C8.02874 9.39942 9.39936 18.675 18.6006 19.8225Z" fill="white" fill-opacity="0.65"/>
                    </svg>
                </CharacterStat>
            {/if}
            <CharacterStat label={"Gender"} value={selectedData?.gender}>
                <svg slot="icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3208 8.09408L22.3287 3.08333H15.8333V0.25H27.1666V11.5833H24.3333V5.0865L19.3225 10.0972C20.9572 12.24 21.7164 14.9238 21.4466 17.6053C21.1768 20.2869 19.8981 22.7656 17.8693 24.5398C15.8406 26.3139 13.2134 27.2508 10.5199 27.1607C7.82635 27.0706 5.26769 25.9603 3.362 24.0546C1.45631 22.1489 0.346014 19.5903 0.255941 16.8967C0.165868 14.2032 1.10275 11.576 2.87687 9.5473C4.65099 7.51856 7.12977 6.23981 9.81128 5.97C12.4928 5.70018 15.1766 6.45946 17.3194 8.09408H17.3208ZM10.875 24.3333C12.9414 24.3333 14.9233 23.5124 16.3845 22.0512C17.8457 20.59 18.6666 18.6081 18.6666 16.5417C18.6666 14.4752 17.8457 12.4933 16.3845 11.0321C14.9233 9.5709 12.9414 8.75 10.875 8.75C8.80848 8.75 6.82663 9.5709 5.36541 11.0321C3.90419 12.4933 3.08329 14.4752 3.08329 16.5417C3.08329 18.6081 3.90419 20.59 5.36541 22.0512C6.82663 23.5124 8.80848 24.3333 10.875 24.3333Z" fill="white" fill-opacity="0.65"/>
                </svg>
            </CharacterStat>
            <CharacterStat label={"Job"} value={selectedData?.job}>
                <svg slot="icon" width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.833374 27.7499V6.49992H9.33337V0.833252H20.6667V6.49992H29.1667V27.7499H0.833374ZM12.1667 6.49992H17.8334V3.66659H12.1667V6.49992Z" fill="white" fill-opacity="0.65"/>
                </svg>
            </CharacterStat>
            <CharacterStat label={"Nationality"} value={selectedData?.nationality}>
                <svg slot="icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4917 16.0001C8.497 17.5702 8.69363 19.1337 9.07725 20.6562H15.1973V11.7029H8.99225C8.66578 13.1122 8.49788 14.5535 8.4917 16.0001Z" fill="white" fill-opacity="0.65"/>
                    <path d="M16.8027 11.7029V20.6562H22.9227C23.3223 19.1357 23.5348 17.5721 23.5555 16.0001C23.5524 14.5539 23.3877 13.1125 23.0644 11.7029H16.8027Z" fill="white" fill-opacity="0.65"/>
                    <path d="M16 0.888916C13.0113 0.888916 10.0898 1.77517 7.60475 3.4356C5.11974 5.09603 3.18291 7.45606 2.03919 10.2173C0.895463 12.9784 0.596213 16.0168 1.17928 18.9481C1.76234 21.8793 3.20154 24.5719 5.31486 26.6852C7.42819 28.7985 10.1207 30.2377 13.052 30.8208C15.9833 31.4038 19.0216 31.1046 21.7828 29.9609C24.544 28.8172 26.904 26.8803 28.5645 24.3953C30.2249 21.9103 31.1111 18.9887 31.1111 16C31.1111 11.9923 29.5191 8.14874 26.6852 5.31486C23.8513 2.48098 20.0077 0.888916 16 0.888916ZM27.5411 22.3372H24.1223C23.4758 24.361 22.5201 26.2725 21.2889 28.0039C20.3804 28.3999 19.4299 28.6914 18.4556 28.8728C20.2004 26.9768 21.5433 24.7472 22.4034 22.3184H16.8123V29.0711H15.2161V22.3372H9.5967C10.4556 24.7695 11.7986 27.0024 13.5445 28.9011C12.5903 28.7217 11.659 28.4366 10.7678 28.0511C9.53231 26.3052 8.5764 24.3775 7.93448 22.3372H4.45892C4.15721 21.7868 3.89525 21.2156 3.67503 20.6278H7.45281C7.09882 19.1104 6.9151 17.5582 6.90503 16C6.90556 14.5557 7.0575 13.1154 7.35837 11.7028H3.49559C3.6942 11.1168 3.93406 10.5455 4.21337 9.99336H7.8117C8.48687 7.74468 9.53396 5.62498 10.9095 3.72225C11.7817 3.36082 12.6905 3.09483 13.62 2.92892C11.7412 4.94535 10.3233 7.34617 9.46448 9.96503H15.2161V2.7778H16.8123V9.99336H22.5639C21.7067 7.3787 20.2921 4.98128 18.4178 2.96669C19.3458 3.12063 20.2546 3.37394 21.1284 3.72225C22.4959 5.61123 23.5396 7.71458 24.2167 9.94614H27.7773C28.0565 10.4983 28.2964 11.0696 28.495 11.6556H24.6606C24.9679 13.0833 25.1231 14.5396 25.1234 16C25.1185 17.5673 24.9379 19.1291 24.585 20.6561H28.3628C28.1291 21.2353 27.8546 21.7971 27.5411 22.3372Z" fill="white" fill-opacity="0.65"/>
                </svg>   
                
                <svg slot="suffixIcon" width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i_837_3433)">
                    <path d="M0 1.00029C6.87492 -0.279533 10.6035 -0.340124 17 1.00029C23.5123 2.58338 27.2466 2.53564 34 1.00029V23.0003C27.3623 24.2016 23.638 24.3298 17 23.0003C10.1204 21.6076 6.40335 21.6527 0 23.0003V1.00029Z" fill="white" fill-opacity="0.35"/>
                    </g>
                    <defs>
                    <filter id="filter0_i_837_3433" x="0" y="0.0175781" width="34" height="23.9324" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="4"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_837_3433"/>
                    </filter>
                    </defs>
                </svg>            
            </CharacterStat>
            <CharacterStat label={"Birth Date"} value={selectedData?.date_of_birth}>
                <svg slot="icon" width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.75 3.25008H21.5V0.416748H18.6667V3.25008H7.33333V0.416748H4.5V3.25008H0.25V28.7501H25.75V3.25008ZM13 7.50008C15.3517 7.50008 17.25 9.39841 17.25 11.7501C17.25 14.1017 15.3517 16.0001 13 16.0001C10.6483 16.0001 8.75 14.1017 8.75 11.7501C8.75 9.39841 10.6483 7.50008 13 7.50008ZM21.5 24.5001H4.5V23.0834C4.5 20.2501 10.1667 18.6917 13 18.6917C15.8333 18.6917 21.5 20.2501 21.5 23.0834V24.5001Z" fill="white" fill-opacity="0.65"/>
                </svg>                        
            </CharacterStat>
        </div>
    
        <div
        transition:fly={{ x: '100%', duration: 150 }}
        style="scale: {$s_scale};"
        class="identifier--inidicator">
            <span class="name">
                <span>{selectedData?.first_name}</span> {selectedData?.last_name}
            </span>
            <svg width="795" height="104" viewBox="0 0 795 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.5 34L98 102.5H793" stroke="white" stroke-opacity="0.15" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 15"/>
                <rect x="-3.5" y="3.5" width="19" height="19" rx="9.5" transform="matrix(-1 0 0 1 19 0)" stroke="white" stroke-opacity="0.15" stroke-width="7"/>
                <rect width="12" height="12" rx="6" transform="matrix(-1 0 0 1 19 7)" fill="white"/>
            </svg>    
        </div>
    {/if}
    
    <div class="character--selection--options"
        style="scale: {$s_scale};"
    >
        {#each Array(3) as _, i (i)}
            {@const data = $s_characters[i]}
            <CharacterSelectionButton locked={false} index={i} isNew={data == undefined} firstName={data?.first_name} lastName={data?.last_name} identifier={data?.identifier} selected={selected === i} on:characterSelected={handleSelection} />
        {/each}
    </div>
    
    {#if selected !== undefined || characterNew}
        <PlayButton on:click={handleStartGame} />
    {/if}
</main>


<style>
    .character--selection {
        position: absolute;
        inset: 0;

        transform-origin: 100% 0;
    }
    .character--stats::before {
        position: absolute;
        content: '';
        display: block;
        inset: 0;
        
        z-index: -1;
        background-color: #B2FFFA;
        opacity: 0.04;
    }
    .character--stats {
        min-width: 450px;
        min-height: 944px;

        background: linear-gradient(247deg, rgba(178, 255, 250, 0) 13.71%, rgba(178, 255, 250, 0) 44.6%, rgba(75, 255, 243, 0.03) 44.68%, rgba(75, 255, 243, 0.03) 75.5%), rgba(178, 255, 250, 0.04);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 25px;

        scale: 1;
        top: 50%;
        position: absolute;
        transform: translateY(-50%);

        left: 68px;

        padding-block: 30px;
        padding-inline: 50px;

        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
    }
    .identifier--inidicator {
        position: absolute;
        width: fit-content;

        right: 68px;
        top: 99px;

        transform-origin: 100% 50%;
    }
    .identifier--inidicator .name {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: right;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 400;
        font-size: 44px;
        line-height: 55px;
        text-align: right;
        letter-spacing: 0.15em;
        text-transform: uppercase;

        color: #FFFFFF;

        text-shadow: 0px 0px 60px rgba(255, 255, 255, 0.15);
    }
    .identifier--inidicator .name span {
        font-weight: 700;
    }
    .character--selection--options {
        position: absolute;
        right: 68px;
        top: 50%;
        transform: translateY(-50%);

        display: flex;
        flex-direction: column;
        justify-content: stretch;
        gap: 20px;

        width: 472px;

        transform-origin: top right;
    }
</style>