import { tick } from 'svelte'
import { writable, readonly, get, derived } from 'svelte/store'
import { builder as fileInput } from './input-file'

import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js'

type PossibleState =
	'idle' |
	'playing-play' |
	'playing-pause' |
	'recording-on' |
	'recording-pause'

export function builder({
	initial,
	fallback,
	loading
}: {
	initial?: string,
	fallback?: string,
	loading?: string
}) {
	const scrollingWaveform = true

	let ctaNode: HTMLElement | null = null

	let record: RecordPlugin | null = null
	let recorderNode: HTMLElement | null = null
	let waveRecorder: WaveSurfer | null = null

	let audioNode: HTMLAudioElement | null = null
	let playerNode: HTMLElement | null = null
	let waveReader: WaveSurfer | null = null

	const fileHandler = fileInput({ initial, fallback, loading })

	// *********************
	// *********************
	// *********************
	// *********************
	// *********************
	// *********************
	const timer = writable(0)
	const countdown = writable(0)
	const duration = derived(fileHandler.src, (src, set) => {
		if (!src) { return set(0) }

		_getDuration(src)
			.then((d: number) => set(d * 1000))
			.catch(() => set(0))
	}, 0)
	const progress = derived([duration, countdown], ([$d, $c], set) => {
		if (!$d) { return set(0) }
		set(Math.round($c/$d * 100))
	}, 0)

	// *********************
	// *********************
	// *********************

	const state = writable<PossibleState>('idle')

	const overallState = derived([fileHandler.hasFile, state], ([$f, $s], set) => {
		if ($f === 'empty' && $s === 'idle') { return set('recordable') }
		if ($f !== 'empty' && $s === 'idle') { return set('playable') }
		if ($s === 'recording-on' || $s === 'recording-pause') { return set('recording') }
		if ($s === 'playing-play' || $s === 'playing-pause') { return set('playing') }

		return set('playable')
	}, 'playable')

	function setVisibility(s: string) {
		if (s === 'recordable') {
			hideElement(playerNode)
			hideElement(recorderNode)
			showElement(ctaNode)
			return
		}
		if (s === 'recording') {
			hideElement(playerNode)
			hideElement(ctaNode)
			showElement(recorderNode)
			return
		}
		if (s === 'playable') {
			hideElement(recorderNode)
			hideElement(ctaNode)
			showElement(playerNode)
			return
		}
		if (s === 'playing') {
			hideElement(recorderNode)
			hideElement(ctaNode)
			showElement(playerNode)
			return
		}

		hideElement(recorderNode)
		hideElement(ctaNode)
		showElement(playerNode)
		return
	}

	const globalUnsub = overallState
		.subscribe((s) => setVisibility(s))

	return {
		src: fileHandler.src,
		url: fileHandler.url,
		hovering: fileHandler.hovering,

		hasAudio : readonly(fileHandler.hasFile),
		audioState: readonly(state),

		timer: readonly(timer),

		countdown: readonly(countdown),
		duration: readonly(duration),
		progress: readonly(progress),

		input: fileHandler.input,
		dropzone: fileHandler.dropzone,

		init: getControls,

		audio: function (node: HTMLAudioElement) {
			const display = fileHandler.display(node)
			audioNode = node

			return {
				destroy() {
					display?.destroy()
					audioNode = null
				}
			}
		},

		ctaEl: function(node: HTMLElement) {
			ctaNode = node

			const overall = get(overallState)
			setVisibility(overall)

			return {
				destroy() {
					ctaNode = null
				}
			}
		},

		recordingEl: function(node: HTMLElement) {
			recorderNode = node
			waveRecorder = createWaveRecorder()

			const overall = get(overallState)
			setVisibility(overall)

			return {
				destroy() {
					recorderNode = null
					waveRecorder?.destroy()
				}
			}
		},

		playerEl: function(node: HTMLElement) {
			playerNode = node
			waveReader = createWaveReader()

			const url = get(fileHandler.url)
			if (url) {
				waveReader?.empty()
				waveReader?.load(url)
			}

			const overall = get(overallState)
			setVisibility(overall)

			return {
				destroy() {
					playerNode = null
					waveReader?.destroy()
				}
			}
		},

		removeFrom: function (force = false) {
			state.set('idle')
			timer.set(0)
			countdown.set(0)
			fileHandler.removeFrom(force)
		}

	}

	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/

	async function getControls() {
		await tick()

		return {
			setTime: (t: number) => waveReader?.seekTo(t),
			playAudio: () => waveReader?.play(),
			pauseAudio: () => waveReader?.pause(),
			stopAudio: () => {
				waveReader?.stop()
				countdown.set(0)
				state.set('idle')
			},
			toggleAudio: () => waveReader?.playPause(),
			// -------------------------------------------
			// -------------------------------------------
			// -------------------------------------------
			recordAudio: () => record?.startRecording(),
			pauseRecording: () => record?.pauseRecording(),
			stopRecording: () => record?.stopRecording(),
			toggleRecording: () => {
				if (record?.isPaused()) {
					record?.resumeRecording()
				}
				else if (record?.isRecording()) {
					record?.pauseRecording()
				}
				else {
					record?.startRecording()
				}
			},
			// -------------------------------------------
			// -------------------------------------------
			// -------------------------------------------
			destroy: () => {
				if (globalUnsub) { globalUnsub() }
				if (waveReader) { waveReader.destroy() }
				if (waveRecorder) { waveRecorder.destroy() }
			},
		}
	}

	function createWaveReader() {
		const waveReader = WaveSurfer.create({
			container: playerNode,
			waveColor: 'rgb(141, 141, 141)',
			progressColor: 'rgb(43, 43, 43)',
			cursorColor: 'rgb(220, 53, 69)',
			interact: true,
			dragToSeek: true,
			normalize: true,
			cursorWidth: 2,
			barWidth: 1,
			mediaControls: false,
		})

		waveReader.on('ready', () => {
			state.set('idle')
		})
		waveReader.on('play', () => {
			state.set('playing-play')
		})
		waveReader.on('pause', () => {
			state.set('playing-pause')
		})
		waveReader.on('finish', () => {
			state.set('idle')
			countdown.set(0)
		})
		waveReader.on('timeupdate', (time: number) => {
			countdown.set(time * 1000)
		})
		waveReader.on('interaction', () => {
			waveReader.play()
		})
		waveReader.on('seeking', (time: number) => {
			countdown.set(time * 1000)
		})

		return waveReader
	}


	function createWaveRecorder() {
		const waveRecorder = WaveSurfer.create({
			container: recorderNode,
			waveColor: 'rgb(141, 141, 141)',
			progressColor: 'rgb(43, 43, 43)',
		})

		const plugin = RecordPlugin.create({
			scrollingWaveform,
			renderRecordedAudio: false
		})

		record = waveRecorder.registerPlugin(plugin)

		record.on('record-start', () => {
			state.set('recording-on')
		})

		// Render recorded audio
		record.on('record-pause', (blob: Blob) => {
			fileHandler.setFileOnInput(new File(
				[blob],
				'recording.webm',
				{ type: 'audio/webm' })
			)
			state.set('recording-pause')
			waveReader?.loadBlob(blob)
		})

		record.on('record-resume', () => {
			state.set('recording-on')
		})

		record.on('record-end', () => {
			state.set('idle')
			waveReader?.empty()
		})

		record.on('record-progress', (time: number) => {
			timer.set(time)
		})

		return waveRecorder
	}

	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/

	function hideElement(node: HTMLElement | null) {
		if (!node) { return }

		node.style.setProperty('opacity', '0')
		node.style.setProperty('pointer-events', 'none')
	}
	function showElement(node: HTMLElement | null) {
		if (!node) { return }

		node.style.setProperty('opacity', '1')
		node.style.setProperty('pointer-events', 'all')
	}

	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/

	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/
	/*************************************************************/

  function _getDuration(audioUrl: string) {
    return new Promise((res) => {
      const _player = new Audio(audioUrl)
      _player.addEventListener(
        'durationchange',
        function () {
          if (this.duration !== Infinity) {
            const duration = this.duration
            _player.remove()
            res(duration)
          }
        },
        false
      )
      _player.load()
      _player.currentTime = 24 * 60 * 60 //fake big time
      _player.volume = 0
    })
  }

}
