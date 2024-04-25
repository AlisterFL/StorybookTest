const DEFAULT_LENGTH = 5;

export function elastic(node: HTMLInputElement) {
	node.style.minWidth = "0px";
	node.addEventListener("input", resize);

	resize()

	return {
		destroy() {
			node.removeEventListener("input", resize);
		},
	};

	function resize() {
		const size = (node.value.length || node.placeholder.length || DEFAULT_LENGTH) + 1;
		node.style.width = size + "ch";
	}

}
