export function dropdown(element, { isOpen }) {
	document.addEventListener('click', handleClick)
	element.addEventListener('keydown', handleKeydown)

	return {
		update(newState) {
			isOpen = newState.isOpen
		},
		destroy() {
			document.removeEventListener('click', handleClick, true)
			element.removeEventListener('keydown', handleKeydown, true)
		}
	}

	function sendCloseEvent() {
		element.dispatchEvent(new CustomEvent('dropdownclose'))
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isOpen && event.key === 'Escape') {
			event.preventDefault()
			sendCloseEvent()
		}

		if (isOpen && event.key === 'Tab') {
			// trap focus
			const nodes = element.querySelectorAll('*')
			const tabbable = (Array.from(nodes) as Array<HTMLElement>)
				.filter((node) => node.tabIndex >= 0)
				.filter((node) => node.style.display !== 'none')

			let index = tabbable.indexOf(document.activeElement as HTMLElement)
			if (index === -1 && event.shiftKey) index = 0

			index += tabbable.length + (event.shiftKey ? -1 : 1)
			index %= tabbable.length

			tabbable[index].focus()
			event.preventDefault()
		}
	}

	function handleClick(event: MouseEvent) {
		if (!element.contains(event.target)) {
			sendCloseEvent()
		}
	}
}
