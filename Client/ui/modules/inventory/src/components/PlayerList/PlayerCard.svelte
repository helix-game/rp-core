<script>
    import { createEventDispatcher } from "svelte";

    export let profile;
    export let name;
    export let source;
    export let distance = 0;

    const dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch('playerCardSelected', { profile, name, source })
    }
</script>

<div on:click={handleClick} on:keydown={() => {}} class="list--item">
    <div class="player--info">
        <div class="profile" style="background-image: url({profile});"></div>
        <div class="name">{name}</div>
    </div>
    <div class="player--distance">
        ~{distance}m
    </div>
</div>

<style>
    .list--item {
        position: relative;
        cursor: pointer;
    }
    .list--item:hover {
        background: radial-gradient(108.72% 108.72% at 30.81% 29.07%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.0465) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 14px;
    }
    .list--item:hover > .player--info {
        scale: 1.05;
    }
    .list--item .player--distance {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 23px;

        height: 34px;
        line-height: 30px;
        min-width: 60px;
        text-align: center;

        background: #FFFFFF;
        border: 2px solid rgba(0, 0, 0, 0.25);
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        border-radius: 10px; 

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;

        letter-spacing: 0.05em;

        color: #000000;
    }
    .list--item .profile {
        width: 46px;
        height: 46px;

        border: 1px solid rgba(255, 255, 255, 0.65);
        border-radius: 10px;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .list--item .player--info {
        display: flex;
        align-items: center;
        gap: 20px;
        position: absolute;

        top: 50%;
        transform: translateY(-50%);
        left: 17px;
    }
    .list--item .name {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        letter-spacing: 0.05em;

        color: #FFFFFF;
    }

    .list--item {
        margin-inline: auto;
        margin-bottom: 6px;
    }
    .list--item:last-child {
        margin-bottom: 0;
    }

    .list--item {
        width: 400px;
        height: 80px;

        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
    }

</style>