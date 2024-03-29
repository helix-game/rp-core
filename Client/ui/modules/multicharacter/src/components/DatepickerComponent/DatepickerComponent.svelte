<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { s_active_popup } from "../../store/stores";

    export let label = 'date picker';

    export let date;
    export let maxYear;

    let dropdownActive = false;

    let currentMonth = 2;
    let currentYear = 2019;

    let arr = Array(31);

    let selectedDateObj = { day: 0, month: 0, year: 0 };
    let selectedDate = 'MM/DD/YYYY';

    let selectedMonthLabel;

    const numDays = (y, m) => new Date(y, m, 0).getDate();

    let daysInMonth = numDays(currentYear, currentMonth);


    let currentElement;

    s_active_popup.subscribe(x => {
        // x === currentElement
        // console.log(currentElement, x)
    })

    const handleDropdownClick = () => {
        dropdownActive = !dropdownActive

        if (dropdownActive)
            s_active_popup.set(currentElement)
    }

    const handleDaySelection = (day) => {
        daysInMonth = numDays(currentYear, currentMonth);

        if (day > daysInMonth) return;

        selectedDateObj = { day: day, month: currentMonth, year: currentYear }
        selectedDate = `${currentMonth}/${day}/${currentYear}`

        date = new Date(currentYear, currentMonth, day).toJSON()

        arr = [...arr]
    }

    const updateCalender = () => {
        const date = new Date(currentYear, currentMonth, 0);
        const month = date.toLocaleString('default', { month: 'long' });
        selectedMonthLabel = month

        daysInMonth = numDays(currentYear, currentMonth)
    }

    const decreaseMonth = () => {
        currentMonth--;
        if (currentMonth <= 0)
        {
            currentMonth = 12
            currentYear--
        }

        updateCalender()
    }

    const increaseMonth = () => {
        currentMonth++;
        if (currentMonth > 12)
        {
            currentMonth = 1
            currentYear++
        }

        updateCalender()
    }

    const increaseYear = () => {
        if (currentYear === maxYear) return;
        currentYear++;
    }

    const decreaseYear = () => {
        if (currentYear <= 1900) return;

        currentYear--;
    }

    onMount(() => {
        let date = new Date()
        
        currentMonth = date.getMonth()
        currentYear = date.getFullYear()

        if (!maxYear)
            maxYear = currentYear

        updateCalender()
    })
</script>

<div
    bind:this={currentElement}
class="input--group">
    {#if label}
        <div class="label">{label}</div>
    {/if}

    <button on:click={handleDropdownClick} class="input datepicker--input"
        class:active={dropdownActive}
    >
        <div class="group">
            <span>{selectedDate}</span>              
        </div>

        <div class="dropdown--button">
            <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.333416 0.333335L7.00008 7L13.6667 0.333334L0.333416 0.333335Z" fill="white" fill-opacity="0.65"/>
            </svg>                
        </div>
    </button>

    {#if dropdownActive}
        <div transition:slide={{duration:100}} class="dropdown--options">
            <div class="content">
                <div class="day--options">
                    {#each arr as _, i (i)}
                        {@const day = i + 1}
                        <button
                            class="day--option"
                            class:disabled={day > daysInMonth}
                            class:active={
                            day === selectedDateObj.day &&
                            currentYear === selectedDateObj.year &&
                            currentMonth === selectedDateObj.month
                            }

                            on:click={() => handleDaySelection(day)}
                        >
                            {day}
                        </button>
                    {/each}
                </div>
    
                <div class="bottom--section">
                    <div class="month--selection">
                        <button class="previous--month"
                            on:click={decreaseMonth}
                        >
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10L0 5L6 0V10Z" fill="white"/>
                            </svg>                            
                        </button>
                        <span class="current--month">{selectedMonthLabel}</span>
                        <button class="next--month"
                            on:click={increaseMonth}
                        >
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 10L6 5L0 0V10Z" fill="white"/>
                            </svg>                            
                        </button>
                    </div>
                    <div class="year--selection">
                        <button 
                            on:click={decreaseYear}
                        class="previous--year">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83333 11.8334L0 6.00008L5.83333 0.166748L6.86875 1.20216L2.07083 6.00008L6.86875 10.798L5.83333 11.8334Z" fill="white" fill-opacity="0.35"/>
                            </svg>                            
                        </button>
                        <span class="current--year">{currentYear}</span>
                        <button
                            on:click={increaseYear}
                        class="next--year">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.16667 11.8334L7 6.00008L1.16667 0.166748L0.13125 1.20216L4.92917 6.00008L0.13125 10.798L1.16667 11.8334Z" fill="white" fill-opacity="0.35"/>
                            </svg>                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .bottom--section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: end;

        margin-top: 20px;
    }
    .year--selection {
        width: 110px;
        height: 44px;

        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        font-family: 'Outfit';

        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.05em;
        color: #FFFFFF;


        padding-inline: 16px;
    }
    .year--selection button {
        cursor: pointer;
    }
    .month--selection button {
        cursor: pointer;
        
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 22px;
        width: 34px;
        height: 34px;

        flex-shrink: 0;
    }
    .month--selection {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        /* gap: 18px; */

        width: 180px;
        justify-content: space-between;
    }
    button {
        outline: 0;
        border: 0;

        position: relative;
    }

    button > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .day--options {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 6px;
    }
    .day--option.active {
        background: radial-gradient(151% 176.92% at 138.43% 141%, rgba(0, 217, 178, 0.45) 0.81%, rgba(0, 217, 178, 0.1395) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #156458;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        color: #fff;
    }
    .day--option.disabled {
        background: rgba(13, 60, 53, 0.25);
        border: 1px solid #0C4D43;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        cursor: unset;
    }
    .day--option {
        background: #0D3C35;
        box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 10px;

        border: 0;
        outline: 0;

        width: 40px;
        height: 40px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.45);

        cursor: pointer;
    }

    .dropdown--options {
        z-index: 2;
        width: 380px;
        height: 354px;

        background: radial-gradient(62.86% 61.64% at 2.79% -7.47%, rgba(0, 217, 178, 0.15) 0.81%, rgba(0, 217, 178, 0.0465) 54.08%, rgba(0, 217, 178, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #132623;
        box-shadow: 0px 0px 137px rgba(0, 0, 0, 0.45), inset 0px 0px 25px rgba(0, 0, 0, 0.03);
        border-radius: 0px 0px 16px 16px;

        left: 50%;
        transform: translateX(-50%);
        position: absolute;
    }

    .dropdown--options .content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        width: fit-content;
        height: fit-content;
    }
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
        transform: rotate(-180deg);
    }

    .input.active .dropdown--button path {
        fill: #000;
        fill-opacity: 1.0;
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

        cursor: pointer;
    }
</style>