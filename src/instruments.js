import * as Tone from 'tone'

export const kick = new Tone.MembraneSynth().toMaster()
export const snare = new Tone.NoiseSynth({
    noise: {
        type: 'brown',
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.02,
    },
}).toMaster()
