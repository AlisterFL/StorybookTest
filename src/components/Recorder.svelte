<script lang="ts">
	import { onMount } from 'svelte'
	import { builder } from '$lib/actions/record-audio'
	import { assets } from '$app/paths'
	import { fly } from 'svelte/transition';

	import IconCheck from '~icons/tabler/check';
	import IconPlayerPlayFilled from '~icons/tabler/player-play-filled';
	import IconPlayerRecordFilled from '~icons/tabler/player-record-filled';
	import IconPlayerPauseFilled from '~icons/tabler/player-pause-filled';
	import IconX from '~icons/tabler/x';
	import IconUpload from '~icons/tabler/upload';
	import IconPlayerStopFilled from '~icons/tabler/player-stop-filled';

	let toggleRecording: () => void
	let stopRecording: () => void

	let setTime: (time: number) => void
	let togglePlaying: () => void
	let stopAudio: () => void

	export let source = ''
	export let name: string
	export let srcName: string
	export let onChange: () => void = () => {}

	$: audioInput = builder({
		initial: source,
	})

	$: ({
		init,
		// ---- Input State
		url,
		// hovering,
		// ---- Recording State
		audioState,
		hasAudio,
		// ---- Timers
		timer,
		duration,
		countdown,
		// ---- Actions
		input,
		dropzone,
		ctaEl,
		playerEl,
		recordingEl,
		// Methods
		removeFrom,
	} = audioInput)

	onMount(async () => {
		const controls = await init();
		stopRecording = controls.stopRecording;
		toggleRecording = controls.toggleRecording;
		setTime = controls.setTime;
		togglePlaying = controls.toggleAudio;
		stopAudio = controls.stopAudio;

		return () => controls.destroy()
	})

	$: elapsedRecording = formatTime($timer)
	$: elapsedPlayingCountdown = formatTime($countdown)
	$: elapsedPlayingDuration = formatTime($duration)

  function formatTime(ms: number) {
		const formattedTime = [
			Math.floor((ms % 3600000) / 60000), // minutes
			Math.floor((ms % 60000) / 1000), // seconds
		]
		.map((v) => (v < 10 ? '0' + v : v))
		.join(':')

		return formattedTime
  }
</script>

<div class="min-w-[280px] h-[500px] flex flex-col p-2 gap-1 bg-gray-200 rounded rounded-xl">
	<div
		use:dropzone
		class="w-full p-2 flex-grow flex flex-col items-stretch justify-between gap-2">

		<div class="canvas-wrapper flex-initial h-full relative rounded-xl bg-[#f7f7f7]">
			<div id="audioFeedbackCanvas" use:playerEl class="absolute top-14 left-0 w-full h-full pointer-none opacity-0" ></div>
			<div id="recorderFeedbackCanvas" use:recordingEl class="absolute top-14 left-0 w-full h-full pointer-none opacity-0" ></div>
			<img
				use:ctaEl
				id="letsRecordMessage"
				alt=""
				src={`${assets}/public/images/microphone.png`}
				class="cover absolute bottom-0" />
		</div>

		{#if $audioState === 'playing-play' || $audioState === 'playing-pause' || ($audioState === 'idle' && $hasAudio !== 'empty')}
			<div class="text-center tracking-wider mt-6">
				<span class="text-4xl">{ elapsedPlayingCountdown }</span>
				<span class="text-xs">/&nbsp;{ elapsedPlayingDuration }</span>
			</div>
		{:else}
			<div class="text-center tracking-wider mt-6">
				<span class="text-4xl">{ elapsedRecording }</span>
			</div>
		{/if}

		<div class="flex flex-col items-center justify-center py-3 space-y-2">
			<!-- Ready To Play -->
			{#if $audioState === 'idle' && $hasAudio !== 'empty'}
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={togglePlaying}
					class="btn-icon variant-filled">
					<span><IconPlayerPlayFilled /></span>
				</button>
			</div>
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={() => {
						stopRecording()
						removeFrom($hasAudio === 'pristine')}
						}
					class="btn-icon btn-icon-sm variant-filled-error">
					<span><IconX class="text-white" /></span>
				</button>
				<button
					type="button"
					disabled={$hasAudio !== 'dirty'}
					on:click|preventDefault={toggleRecording}
					class="btn-icon btn-icon-lg variant-filled">
					<span><IconPlayerRecordFilled style="font-size: 22px;" class="text-[#dc3545]" /></span>
				</button>
				<button
					type="button"
					disabled={$hasAudio !== 'dirty'}
					on:click|preventDefault={() => {
						stopRecording()
						onChange()
					}}
					class="btn-icon btn-icon-sm variant-filled-success">
					<span><IconCheck class="text-white" /></span>
				</button>
			</div>

			<!-- Playing, Ready to Pause -->
			{:else if $audioState === 'playing-play'}
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={togglePlaying}
					class="btn-icon variant-filled">
					<span><IconPlayerPauseFilled /></span>
				</button>
			</div>
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					disabled
					on:click|preventDefault={() => {
						stopRecording()
						removeFrom($hasAudio === 'pristine')}
						}
					class="btn-icon btn-icon-sm variant-filled-error">
					<span><IconX class="text-white" /></span>
				</button>
				<button
					type="button"
					disabled
					on:click|preventDefault={toggleRecording}
					class="btn-icon btn-icon-lg variant-filled">
					<span><IconPlayerRecordFilled style="font-size: 22px;" class="text-[#dc3545]" /></span>
				</button>
				<button
					type="button"
					disabled
					on:click|preventDefault={() => {
						stopRecording()
						onChange()
					}}
					class="btn-icon btn-icon-sm variant-filled-success">
					<span><IconCheck class="text-white" /></span>
				</button>
			</div>
			<!-- Paused, Ready to resume playing -->
			{:else if $audioState === 'playing-pause'}
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={togglePlaying}
					class="btn-icon variant-filled">
					<span><IconPlayerPlayFilled /></span>
				</button>
			</div>
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={() => {
						stopRecording()
						removeFrom($hasAudio === 'pristine')}
						}
					class="btn-icon btn-icon-sm variant-filled-error">
					<span><IconX class="text-white" /></span>
				</button>
				<button
					type="button"
					on:click|preventDefault={toggleRecording}
					class="btn-icon btn-icon-lg variant-filled">
					<span><IconPlayerRecordFilled style="font-size: 22px;" class="text-[#dc3545]" /></span>
				</button>
				<button
					type="button"
					on:click|preventDefault={() => {
						stopRecording()
						onChange()
					}}
					class="btn-icon btn-icon-sm variant-filled-success">
					<span><IconCheck class="text-white" /></span>
				</button>
			</div>

			<!-- Recording, Ready to stop recording -->
			{:else if $audioState === 'recording-on'}
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					disabled
					on:click|preventDefault={togglePlaying}
					class="btn-icon variant-filled">
					<span><IconPlayerPlayFilled /></span>
				</button>
			</div>
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					disabled
					in:fly|global={{ x: 30 , duration: 100 }}
					on:click|preventDefault={() => {
						stopRecording()
						removeFrom($hasAudio === 'pristine')}
						}
					class="btn-icon btn-icon-sm variant-filled-error">
					<span><IconX class="text-white" /></span>
				</button>
				<button
					type="button"
					on:click|preventDefault={toggleRecording}
					class="btn-icon btn-icon-lg variant-filled">
					<span><IconPlayerPauseFilled style="font-size: 22px;" class="text-[#dc3545]"/></span>
				</button>
				<button
					type="button"
					disabled
					in:fly|global={{ x: -30, duration: 100 }}
					on:click|preventDefault={() => {
						stopRecording()
						onChange()
					}}
					class="btn-icon btn-icon-sm variant-filled-success">
					<span><IconCheck class="text-white" /></span>
				</button>
			</div>

			<!-- Recording paused -->
			{:else if $audioState === 'recording-pause'}
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={togglePlaying}
					class="btn-icon variant-filled">
					<span><IconPlayerPlayFilled /></span>
				</button>
			</div>
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={stopRecording}
					class="btn-icon btn-icon-sm variant-filled">
					<span><IconPlayerStopFilled /></span>
				</button>
				<button
					type="button"
					on:click|preventDefault={toggleRecording}
					class="btn-icon btn-icon-lg variant-filled">
					<span><IconPlayerRecordFilled style="font-size: 22px;" class="text-[#dc3545]" /></span>
				</button>
				<button
					type="button"
					disabled
					on:click|preventDefault={() => {
						stopRecording()
						onChange()
					}}
					class="btn-icon btn-icon-sm variant-filled-success">
					<span><IconCheck class="text-white" /></span>
				</button>
			</div>

			<!-- Idle, but with no audio to play, ready to record -->
			{:else if $audioState === 'idle' && $hasAudio === 'empty'}
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					disabled
					on:click|preventDefault={togglePlaying}
					class="btn-icon variant-filled">
					<span><IconPlayerPlayFilled /></span>
				</button>
			</div>
			<div class="flex items-center justify-center gap-4">
				<button
					type="button"
					on:click|preventDefault={toggleRecording}
					class="btn-icon btn-icon-lg variant-filled">
					<span><IconPlayerRecordFilled style="font-size: 22px;" class="text-[#dc3545]" /></span>
				</button>
			</div>
			{/if}
		</div>
	</div>


	<div class="w-full flex justify-between items-end relative h-8">
		<div class="controls h-6 flex-shrink-0 flex-grow-0">
			<!-- Ready To Play -->
			{#if $audioState === 'idle' && $hasAudio !== 'empty'}
				<span class="badge variant-ghost text-[8px]">
					<IconPlayerStopFilled style="font-size: 10px;" />
					<span>STOPPED</span>
				</span>

			<!-- Pause -->
			{:else if $audioState === 'playing-pause' || $audioState === 'recording-pause'}
				<span class="badge variant-ghost text-[8px]">
					<IconPlayerPauseFilled style="font-size: 10px;" />
					<span>PAUSED</span>
				</span>

			<!-- Playing -->
			{:else if $audioState === 'playing-play'}
				<span class="badge variant-ghost-success text-[8px]">
					<IconPlayerPlayFilled style="font-size: 10px;" />
					<span>PLAYING</span>
				</span>

			<!-- Paused, Ready to resume playing -->
			{:else if $audioState === 'recording-on'}
				<span class="badge variant-ghost-error text-[8px]">
					<IconPlayerRecordFilled style="font-size: 10px;" />
					<span>RECORDING</span>
				</span>
			{/if}
		</div>

		{#if $audioState === 'idle' && $hasAudio === 'empty'}
			<label
				for="audioInputElement"
				class="btn btn-sm variant-filled cursor-pointer">
				<span><IconUpload /></span>
				<span>Téléverser</span>
			</label>
		{/if}

	</div>

	<div class="inputs pointer-none hidden">
		<input
			type="hidden"
			name={srcName}
			value={$url}
			class="hidden"/>
		<input
			use:input
			type="file"
			accept="audio/*"
			id="audioInputElement"
			name={name}
			class="hidden"/>
		<!-- <audio use:audio={{ src: source }} src={$src} class="hidden"></audio> -->
	</div>

</div>

