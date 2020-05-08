<script>
    import { scale } from 'svelte/transition'
    export let bpm
    export let active
</script>

<style>
    div {
        border: 1px solid var(--theme-text);
        width: 17px;
        height: 17px;
        border-radius: 100%;
        margin: 3px 5px;
    }
    .active {
        background: var(--theme-text);
    }
</style>

{#if active}
    <div class="active" in:scale={{ duration: (60 / bpm) * 1000 }} />
{:else}
    <div />
{/if}
