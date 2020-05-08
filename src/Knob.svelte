<script>
    import gsap from 'gsap'

    import { Draggable } from 'gsap/all'
    import { onMount, onDestroy } from 'svelte'
    export let bpm
    export let handleTempoChange = () => {}

    export let minBpm
    export let maxBpm

    let draggable
    let knob

    gsap.registerPlugin(Draggable)

    onMount(() => {
        draggable = Draggable.create('#knob', {
            type: 'rotation',
            onDrag: function() {
                if (this.deltaX > 0 && bpm < maxBpm) {
                    bpm++
                }
                if (bpm >= maxBpm && this.deltaX > 0) {
                    setTimeout(() => this.enable(), 100)
                    this.disable()
                }

                if (this.deltaX < 0 && bpm > minBpm) {
                    bpm--
                }

                if (bpm <= minBpm && this.deltaX < 0) {
                    setTimeout(() => this.enable(), 100)
                    this.disable()
                }
            },

            onDragEnd: () => handleTempoChange(),
            liveSnap: value => {
                return Math.round(value / 1) * 1
            }
        })
    })

    onDestroy(() => {
        draggable[0].kill()
    })
</script>

<style>
    .knob-container {
        display: flex;
        justify-content: center;
        cursor: grab;
    }
    .knob {
        width: 94px;
        height: 93px;
    }
    .knob-surround {
        position: relative;
        background-color: grey;
        width: 8em;
        height: 8em;
        border-radius: 50%;
        border: solid 0.25em #0e0e0e;
        margin: 3em auto;
        background: #181818;
        background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #1d1d1d), color-stop(1, #131313));
        background: -ms-linear-gradient(bottom, #1d1d1d, #131313);
        background: -moz-linear-gradient(center bottom, #1d1d1d 0%, #131313 100%);
        background: -o-linear-gradient(#131313, #1d1d1d);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#131313', endColorstr='#1d1d1d', GradientType=0);
        -webkit-box-shadow: 0 0.2em 0.1em 0.05em rgba(255, 255, 255, 0.1) inset,
            0 -0.2em 0.1em 0.05em rgba(0, 0, 0, 0.5) inset, 0 0.5em 0.65em 0 rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 0.2em 0.1em 0.05em rgba(255, 255, 255, 0.1) inset,
            0 -0.2em 0.1em 0.05em rgba(0, 0, 0, 0.5) inset, 0 0.5em 0.65em 0 rgba(0, 0, 0, 0.3);
        box-shadow: 0 0.2em 0.1em 0.05em rgba(255, 255, 255, 0.1) inset, 0 -0.2em 0.1em 0.05em rgba(0, 0, 0, 0.5) inset,
            0 0.5em 0.65em 0 rgba(0, 0, 0, 0.3);
    }
    .knob {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .knob:before {
        content: '';
        position: absolute;
        bottom: 19%;
        left: 19%;
        width: 3%;
        height: 3%;
        background-color: #7ac1f0;
        border-radius: 50%;
        -webkit-box-shadow: 0 0 0.4em 0 #79c3f4;
        -moz-box-shadow: 0 0 0.4em 0 #79c3f4;
        box-shadow: 0 0 0.4em 0 #79c3f4;
    }
</style>

<div class="knob-container knob-surround">
    <div class="knob" bind:this={knob} id="knob" />
</div>
