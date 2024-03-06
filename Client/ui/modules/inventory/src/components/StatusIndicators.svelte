<script>
    import { onMount } from "svelte";
    import Status from "./Status.svelte";

    let status_map = new Map()
    let dynamic_status = [];

    if (typeof Events !== "undefined") {
        Events.Subscribe(
            "StatusUpdate",
            ({ status }) => {
                console.log('status', status)
                status_map.set(status.name, {value: status.value, colour: status.colour})
                dynamic_status = [...status_map.keys()]
            }
        );
    }
</script>
<div class="status--indicators">
    <div class="borders">
        <div class="top--right--corner">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13V13C12 6.37258 6.62742 1 -1.78814e-07 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
            </svg>                
        </div>
        <div class="bottom--right--corner">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0V0C12 6.62742 6.62742 12 -1.78814e-07 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
            </svg>                    
        </div>

        <div class="middle--bar--top">
            <svg width="1" height="155" viewBox="0 0 1 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1" height="155" fill="white" fill-opacity="0.08"/>
            </svg>                
        </div>
        <div class="middle--bar--bottom">
            <svg width="1" height="155" viewBox="0 0 1 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1" height="155" fill="white" fill-opacity="0.08"/>
            </svg>                
        </div>
    </div>

    {#each dynamic_status as status, i (i)}
        {@const status_data = status_map.get(status)}
        <Status status={status_data.value} color={status_data.colour}>
            {#if status === 'armour'}
                <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.437902 26.5532V24.0824C2.75005 24.4925 4.11931 24.4862 6.53667 24.4576C6.55532 24.4478 6.57188 24.4395 6.58668 24.4321C6.67093 24.3898 6.69772 24.3764 6.72432 24.27V20.8297C6.69186 20.7164 6.63719 20.672 6.50539 20.6108C4.07306 20.5802 2.74244 20.5203 0.437902 20.2041V17.4519C0.786196 17.5553 1.24799 17.6658 1.62638 17.7334C3.46514 18.0617 5.45607 17.9558 6.72432 17.6083V14.1367C6.71324 13.982 6.6633 13.9294 6.50539 13.8865C4.08943 13.8649 2.75915 13.7815 0.437902 13.4799V9.72681C2.7138 7.63074 3.40833 5.84697 2.87741 0.813235C3.06934 0.48215 3.20092 0.347828 3.47165 0.187721C3.78896 6.27191e-05 4.50952 5.36035e-05 5.19161 4.4969e-05L5.19181 4.49664e-05C5.2229 4.45728e-05 5.25371 3.33244e-05 5.28425 2.21778e-05C6.32885 -0.000359154 7.04701 -0.000621319 7.28728 0.437926C7.93741 3.34307 9.1951 4.44122 11.6972 4.8478V28.5548C11.5442 28.5548 11.3801 28.5556 11.2059 28.5564C10.0618 28.562 8.48102 28.5697 6.75559 28.3671C2.81038 27.995 0.66194 27.4022 0.437902 26.5532ZM22.9565 26.5533V24.0825C20.6444 24.4926 19.2751 24.4863 16.8578 24.4578C16.8391 24.4479 16.8226 24.4396 16.8078 24.4322C16.7235 24.3899 16.6967 24.3765 16.6701 24.2701V20.8298C16.7026 20.7165 16.7573 20.6721 16.8891 20.6109C19.3214 20.5803 20.652 20.5204 22.9565 20.2043V17.452C22.6083 17.5554 22.1465 17.6659 21.7681 17.7335C19.9293 18.0618 17.9384 17.956 16.6701 17.6084V14.1368C16.6812 13.9821 16.7311 13.9295 16.8891 13.8866C19.305 13.865 20.6353 13.7816 22.9565 13.48V9.72692C20.6806 7.63085 19.9861 5.84708 20.517 0.813346C20.3251 0.482261 20.1935 0.347939 19.9228 0.187832C19.6055 0.000173643 18.8849 0.000164527 18.2028 0.000155893L18.2026 0.00015589C18.1715 0.000155497 18.1407 0.000144248 18.1102 0.000133102C17.0656 -0.000248229 16.3474 -0.000510394 16.1072 0.438037C15.457 3.34318 14.1993 4.44133 11.6973 4.84791V28.5549C11.8502 28.5549 12.0143 28.5557 12.1885 28.5565C13.3326 28.5621 14.9134 28.5698 16.6389 28.3672C20.5841 27.9951 22.7325 27.4023 22.9565 26.5533Z" fill="white"/>
                    <path d="M23.3942 14.3556C23.3636 14.2249 23.314 14.1862 23.1753 14.168C21.0258 14.4562 19.8217 14.5338 17.6708 14.512C17.4786 14.5673 17.4265 14.6436 17.3893 14.8248V16.889C17.4246 17.0508 17.4803 17.0911 17.6708 17.1079C19.6593 17.2704 20.8663 17.1835 23.1753 16.7326C23.3615 16.6538 23.3959 16.5795 23.3942 16.4198V14.3556Z" fill="white" fill-opacity="0.5"/>
                    <path d="M5.59419e-05 14.3556C0.030693 14.2249 0.080244 14.1862 0.218986 14.168C2.36844 14.4562 3.57262 14.5338 5.72351 14.512C5.91572 14.5673 5.96781 14.6436 6.00499 14.8248V16.889C5.96966 17.0508 5.91394 17.0911 5.72351 17.1079C3.73502 17.2704 2.52798 17.1835 0.218986 16.7326C0.032807 16.6538 -0.00160635 16.5795 5.59419e-05 16.4198V14.3556Z" fill="white" fill-opacity="0.5"/>
                    <path d="M23.3942 21.0799C23.3636 20.9492 23.314 20.9105 23.1753 20.8922C21.0258 21.1804 19.8217 21.258 17.6708 21.2362C17.4786 21.2915 17.4265 21.3678 17.3893 21.549V23.5506C17.4246 23.7124 17.4178 23.7528 17.6082 23.7696C19.7037 23.8321 20.8922 23.7383 23.1753 23.4568C23.3615 23.3781 23.3959 23.3037 23.3942 23.1441V21.0799Z" fill="white" fill-opacity="0.5"/>
                    <path d="M5.61044e-05 21.0799C0.0306931 20.9492 0.0802441 20.9105 0.218986 20.8922C2.36844 21.1804 3.57262 21.258 5.72351 21.2362C5.91572 21.2915 5.96781 21.3678 6.00499 21.549V23.5506C5.96966 23.7124 5.97649 23.7528 5.78606 23.7696C3.69059 23.8321 2.50211 23.7383 0.218986 23.4568C0.0328071 23.3781 -0.00160618 23.3037 5.61044e-05 23.1441V21.0799Z" fill="white" fill-opacity="0.5"/>
                </svg>            
            {:else if status === 'health'}
                <svg width="84" height="80" viewBox="0 0 84 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_14352_83579)">
                    <path d="M53.4193 34.0986C53.047 33.2966 52.51 32.5697 51.8386 31.9589C51.1667 31.3462 50.3745 30.8592 49.505 30.5246C48.6035 30.1762 47.6365 29.9979 46.6602 30C45.2906 30 43.9544 30.3489 42.7931 31.0079C42.5153 31.1655 42.2514 31.3386 42.0014 31.5273C41.7513 31.3386 41.4874 31.1655 41.2096 31.0079C40.0484 30.3489 38.7121 30 37.3425 30C36.3563 30 35.4006 30.1757 34.4977 30.5246C33.6254 30.8606 32.8392 31.3438 32.1641 31.9589C31.4918 32.5691 30.9548 33.296 30.5834 34.0986C30.1972 34.9333 30 35.8197 30 36.7319C30 37.5925 30.1889 38.4892 30.564 39.4014C30.8779 40.1638 31.3279 40.9546 31.903 41.7531C32.8142 43.0168 34.0671 44.3347 35.6229 45.6708C38.2009 47.8855 40.754 49.4153 40.8624 49.4773L41.5208 49.8701C41.8125 50.0433 42.1875 50.0433 42.4792 49.8701L43.1376 49.4773C43.246 49.4127 45.7963 47.8855 48.3771 45.6708C49.9328 44.3347 51.1858 43.0168 52.097 41.7531C52.672 40.9546 53.1249 40.1638 53.436 39.4014C53.8111 38.4892 54 37.5925 54 36.7319C54.0028 35.8197 53.8055 34.9333 53.4193 34.0986Z" fill="#FF5555"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_14352_83579" x="0" y="0" width="84" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="15"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14352_83579"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14352_83579" result="shape"/>
                    </filter>
                    </defs>
                </svg>
            {/if}
        </Status>
    {/each}

</div>

<style>
    .middle--bar--bottom, .middle--bar--top {
        position: absolute;
        right: 0;
    }
    .middle--bar--top {
        top: 30px;
    }
    .middle--bar--bottom {
        bottom: 30px;
    }

    .bottom--right--corner {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .top--right--corner {
        position: absolute;
        top: 0;
        right: 0;
    }
    .borders {
        position: absolute;
        inset: 0;
    }
    .status--indicators {
        width: 87px;
        min-height: 659px;
        margin-right: 7px;

        gap: 20px;
        /* background-color: royalblue; */

        position: absolute;
        right: 193px;
        bottom: 246px;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>