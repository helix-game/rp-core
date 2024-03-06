<script>
    export let image;
    export let name;
    export let source = false;
</script>

<div class="player--card">
    <div class="profile" style="background-image: url({image});">

    </div>
    <div class="name">
        {name}
        {#if source}
            <span class="indicator"> (You)</span>
        {/if}
    </div>
</div>

<style>
    .player--card {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;

        padding: 17px;
        padding-right: 28px;

        display: flex;
        align-items: center;
        gap: 20px;
    }
    .player--card .profile {
        background-color: red;
        width: 46px;
        height: 46px;
        border: 1px solid rgba(255, 255, 255, 0.65);
        border-radius: 10px;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .player--card .name > * {
        display: inline-block;
    }
    .player--card .name span {
        opacity: 0.45;
    }
    .player--card .name {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 100%;
        letter-spacing: 0.05em;

        color: #FFFFFF;
    }
</style>