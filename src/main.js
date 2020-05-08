import App from './App.svelte'

const storageBpm = Number(localStorage.getItem('bpm')) || 120
const storageBeatsPerMeasure = Number(localStorage.getItem('beatsPerMeasure')) || 4
const storageTheme = localStorage.getItem('theme') || 'dark'

const app = new App({
    target: document.body,
    props: {
        dark: storageTheme === 'dark' ? true : false,
        bpm: storageBpm,
        beatsPerMeasure: storageBeatsPerMeasure,
    },
})

export default app
