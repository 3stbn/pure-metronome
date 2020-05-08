<script>
    import ChangeTempo from './ChangeTempo.svelte'
    import * as Tone from 'tone'
    import { kick, snare } from './instruments'
    import Dot from './Dot.svelte'
    import Knob from './Knob.svelte'
    import { onMount } from 'svelte'
    import { scale } from 'svelte/transition'
    import PlayIcon from './PlayIcon.svelte'
    import StopIcon from './StopIcon.svelte'
    import { themes } from './themes.js'
    import ThemeSwitch from './ThemeSwitch.svelte'

    export let bpm
    export let beatsPerMeasure
    export let dark

    let playing = false
    let beat = 0
    let minBpm = 60
    let maxBpm = 300
    let hasStartedAudio = false

    $: localStorage.setItem('theme', dark ? 'dark' : 'light')
    $: localStorage.setItem('bpm', bpm)
    $: localStorage.setItem('beatsPerMeasure', beatsPerMeasure)
    $: Tone.Transport.bpm.value = bpm
    $: dots = [...Array(beatsPerMeasure).keys()]
    $: theme = themes.find(h => {
        const name = dark ? 'dark' : 'light'
        return h.name === name
    })
    $: setRootColors(theme)

    onMount(() => setRootColors(theme))

    const loop = new Tone.Loop(loopCallback, '4n')

    async function startStop() {
        if (!hasStartedAudio) {
            await Tone.start()
            hasStartedAudio = true
        }
        if (playing) {
            loop.stop()
            playing = false
        } else {
            loop.start()
            Tone.Transport.start()
            playing = true
        }
    }

    function loopCallback(time) {
        if (beat % beatsPerMeasure === 0) {
            kick.triggerAttackRelease('e1', '32n', time)
        } else {
            snare.triggerAttackRelease('32n', time)
        }
        beat = (beat + 1) % beatsPerMeasure
    }

    function handleTempoChange() {
        if (playing) {
            loop.stop()
            loop.start()
            beat = 0
        }
    }

    function setRootColors(theme) {
        for (let [prop, color] of Object.entries(theme.colors)) {
            let varString = `--theme-${prop}`
            document.documentElement.style.setProperty(varString, color)
        }
    }
</script>

<style>
    :global(body) {
        overflow: hidden;
    }
    .app {
        background: rgb(32, 32, 32);
        font-family: 'Roboto', sans-serif;
        background: white;
        background: var(--theme-background);
        min-height: 100vh;
    }

    h2 {
        color: #4997ca;
        font-size: 40px;
        margin: 0;
    }
    main {
        text-align: center;
        max-width: 375px;
        margin: 0 auto;
        padding: 30px;
    }
    section {
        display: flex;
        align-items: center;
    }

    .play {
        border: 1px solid #233947;
        height: 50px;
        width: 200px;
        background: transparent;
        border-radius: 10px;
        color: #fff;
        font-size: 28px;
        cursor: pointer;
    }

    .dots {
        display: flex;
        justify-content: center;
    }
    .beats {
        display: flex;
        justify-content: center;
    }
    h3,
    h4 {
        color: #45525a;
    }
    .beatsPerMeasure {
        color: #4997ca;
        padding: 0 1.5rem;
        font-size: 20px;
        cursor: pointer;
    }
</style>

<div class="app">
    <ThemeSwitch bind:dark />
    <main>
        <h3>BPM</h3>
        <h2>{bpm}</h2>
        <section class="beats">
            <p
                class="beatsPerMeasure"
                on:click={() => {
                    if (beatsPerMeasure > 1) {
                        beatsPerMeasure--
                    }
                }}>
                -
            </p>

            <h4>Beats per measure</h4>
            <p
                class="beatsPerMeasure"
                on:click={() => {
                    if (beatsPerMeasure < 10) {
                        beatsPerMeasure++
                    }
                }}>
                +
            </p>

        </section>

        <div class="dots">

            {#each dots as dot}
                <Dot active={dot === beat - 1 || (beat === 0 && dot === dots.length - 1 && playing)} {bpm} />
            {/each}

        </div>

        <section>
            <ChangeTempo bind:bpm {handleTempoChange} {minBpm} {maxBpm} mode="decrease" />
            <Knob bind:bpm {handleTempoChange} {minBpm} {maxBpm} {playing} />
            <ChangeTempo bind:bpm {handleTempoChange} {minBpm} {maxBpm} node="increase" />

        </section>

        {#if playing}
            <button class="play" on:click={startStop} in:scale>
                <StopIcon />
            </button>
        {:else}
            <button class="play" on:click={startStop} in:scale>
                <PlayIcon />
            </button>
        {/if}

    </main>

</div>
