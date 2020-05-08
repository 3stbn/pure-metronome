<script>
    export let dark = false
</script>

<style>
    .switch-container #theme-switch {
        display: none;
    }

    .switch-container .switch-label {
        position: absolute;
        top: 40px;
        right: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 60px;
        margin: 0;
    }

    .switch-container .switch-label .switch-overlay {
        transition: all 0.25s ease-in-out;
        position: absolute;
        width: 60px;
        height: 12px;
        border-radius: 100px;
        background: #c1c1c1;
    }

    .switch-container .switch-label .switch-slider {
        overflow: hidden;
        transition: all 0.25s ease-in-out;
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    }

    .switch-container #theme-switch:checked + .switch-label .switch-overlay {
        transition: all 0.25s ease-in-out;
        background: #1f2b33;
    }

    .switch-container #theme-switch:checked + .switch-label .switch-slider {
        transition: all 0.25s ease-in-out;
        transform: translateX(100%);
        background: #364b59;
    }
</style>

<div class="switch-container">
    <input type="checkbox" id="theme-switch" bind:checked={dark} />
    <label for="theme-switch" class="switch-label">
        <div class="switch-overlay" />
        <div class="switch-slider" />
    </label>
</div>
