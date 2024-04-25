type HasFile = 'pristine' | 'empty' | 'dirty'
type InputOptions = { accept: string }

import { writable, readonly, derived } from 'svelte/store'

export const builder = ({
	initial,
	fallback,
	loading
}: {
	initial: string,
	fallback?: string,
	loading?: string,
}) => {
	const srcAtStart = initial || loading || fallback || ''
	const urlAtStart = initial || ''

	const src = writable(srcAtStart)
	const url = writable(urlAtStart)
	const hovering = writable(false)

	const hasFile = derived<
		typeof src,
		HasFile
	>(
		src,
		($src, set) => {
			if (!$src) { return set('empty') }
			if ($src === initial) { return set('pristine') }
			return set('dirty')
		},
		initial ? 'pristine' : 'empty'
	)

	let displayNode = null
	let inputNode = null

	return {
		src: readonly(src),
		url: readonly(url),
		hasFile: readonly(hasFile),
		hovering,
		removeFrom,
		setFileOnInput,
		setFileWithData,

		dropzone: (node: HTMLElement) => {
			node.addEventListener('drop', handleDrop)
			node.addEventListener('dragover', handleDragOver)
			node.addEventListener('dragenter', handleDragEnter)
			node.addEventListener('dragleave', handleDragLeave)
			node.addEventListener('dragend', handleDragLeave)

			return {
				destroy() {
					node.removeEventListener('drop', handleDrop)
					node.removeEventListener('dragover', handleDragOver)
					node.removeEventListener('dragenter', handleDragEnter)
					node.removeEventListener('dragleave', handleDragLeave)
					node.removeEventListener('dragend', handleDragLeave)
				}
			}

			function handleDrop(e: DragEvent) {
				e.preventDefault()
				setFileWithData(e.dataTransfer)
				hovering.set(false)
			}
			function handleDragOver(e: DragEvent) {
				e.preventDefault()
			}
			function handleDragEnter(e: DragEvent) {
				e.preventDefault()
				hovering.set(true)
			}
			function handleDragLeave(e: DragEvent) {
				e.preventDefault()
				hovering.set(false)
			}

		},

		input: (node: HTMLInputElement, opts?: InputOptions) => {
			inputNode = node
			node.addEventListener('change', handleChange)

			if (opts?.accept) { node.accept = opts.accept }

			async function handleChange() {
				const asDataUrl = await fileToDataUrl(node.files[0])
				src.set(asDataUrl)
			}

			return {
				destroy() {
					node.removeEventListener('change', handleChange)
					inputNode = null
				}
			}
		},

		display: (node: HTMLElement & { src: string }) => {
			displayNode = node

			const unsubscribe = src.subscribe((newSrc) => {
				displayNode.src = newSrc
			})

			return {
				destroy() {
					unsubscribe()
					displayNode = null
				}
			}
		}

	}

	function removeFrom(force = false) {
		const fileList = inputNode?.files
		const hasFileAttached = fileList && fileList?.length > 0

		// If the user has a file attached to the post and this method is called without force
		// It means the user wants to remove the file he/she uploaded
		// So we remove the file and restore the preview to its initial state
		//
		// Otherwise, we set the src to an empty string
		// Which will remove the file in the backend
		// Effectively removing the file attached to the post
		const srcToSet = !force && hasFileAttached
			? srcAtStart
			: fallback || ''
		const urlToSet = !force && hasFileAttached
			? urlAtStart
			: ''

		if (hasFileAttached) {
			inputNode.value = null
		}

		src.set(srcToSet)
		url.set(urlToSet)
	}

	async function setFileWithData(dt: DataTransfer) {
		if (dt.files.length > 0 && inputNode) {
			inputNode.files = dt.files
			src.set(await fileToDataUrl(dt.files[0]))
		}
	}

	async function setFileOnInput(f: File) {
		const dataTransfer = new DataTransfer()
		dataTransfer.items.add(f)
		await setFileWithData(dataTransfer)
	}

}

function fileToDataUrl(file: File): Promise<string> {
	return new Promise((res, rej) => {
		const reader = new FileReader()

		reader.addEventListener('load', () => res(reader.result as string), false)
		reader.addEventListener('error', () => rej())
		reader.readAsDataURL(file)
	})
}
