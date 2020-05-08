<script>
    export let bpm
    export let minBpm
    export let maxBpm
    export let mode = 'increase'
    export let handleTempoChange

    function handleClick() {
        if (bpm > minBpm && mode === 'decrease') {
            bpm--
            handleTempoChange()
        }
        if (bpm < maxBpm && mode === 'increase') {
            bpm++
            handleTempoChange()
        }
    }
</script>

<style>
    button {
        height: 30px;
        width: 30px;
        font-size: 15px;
        background: transparent;
        color: #7ac1f0;
        cursor: pointer;
        font-weight: bolder;
        border: 1px solid #233947;
    }
</style>

<div>
    <button on:click={handleClick}>{mode === 'increase' ? '+' : '-'}</button>
</div>
