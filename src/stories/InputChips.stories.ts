import type { Meta, StoryObj } from '@storybook/svelte';
import { InputChip } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/InputChip',
	component: InputChip,
	tags: ['autodocs'],
	argTypes: {
		name: {
			description: 'Nom du composant',
		},
		value: {
			description: 'Valeurs initiales pour les jetons',
		},
		whitelist: {
			description: 'Liste des valeurs acceptées',
		},
		max: {
			description: 'Nombre maximal de jetons autorisés (-1 pour illimité)',
		},
		minlength: {
			description: 'Longueur minimale des caractères pour chaque jeton',
		},
		maxlength: {
			description: 'Longueur maximale des caractères pour chaque jeton',
		},
		allowUpperCase: {
			description: 'Autoriser les valeurs en majuscules pour les jetons',
		},
		allowDuplicates: {
			description: 'Autoriser les valeurs en doublon pour les jetons',
		},
		validation: {
			description: 'Fonction de validation personnalisée pour les jetons',
		},
		duration: {
			description: 'Durée de l\'animation pour ajouter/supprimer des jetons',
		},
		required: {
			description: 'Marquer l\'entrée comme obligatoire',
		},
		chips: {
			description: 'Variante ou classes pour styliser les jetons',
		},
		invalid: {
			description: 'Classes pour styliser les jetons invalides',
		},
		padding: {
			description: 'Styles de rembourrage pour l\'entrée',
		},
		rounded: {
			description: 'Styles de bordure arrondie pour l\'entrée',
		},
		regionChipWrapper: {
			description: 'Classes supplémentaires pour la région de l\'enveloppe des jetons',
		},
		regionChipList: {
			description: 'Classes supplémentaires pour la région de la liste des jetons',
		},
		regionInput: {
			description: 'Classes supplémentaires pour la région du champ de saisie',
		},
		label: {
			description: 'Libellé ARIA pour l\'entrée de sélection',
		},
		transitions: {
			description: 'Activer/désactiver les transitions',
		},
		listTransitionIn: {
			description: 'Transition pour la liste des jetons à l\'entrée',
		},
		listTransitionInParams: {
			description: 'Paramètres de transition pour la liste des jetons à l\'entrée',
		},
		listTransitionOut: {
			description: 'Transition pour la liste des jetons à la sortie',
		},
		listTransitionOutParams: {
			description: 'Paramètres de transition pour la liste des jetons à la sortie',
		},
		chipTransitionIn: {
			description: 'Transition pour les jetons à l\'entrée',
		},
		chipTransitionInParams: {
			description: 'Paramètres de transition pour les jetons à l\'entrée',
		},
		chipTransitionOut: {
			description: 'Transition pour les jetons à la sortie',
		},
		chipTransitionOutParams: {
			description: 'Paramètres de transition pour les jetons à la sortie',
		},
	}
} satisfies Meta<InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const inputChip: Story = {
	args: {
		name: 'Input chip',
		value: ['apple', 'banana', 'orange'],
		whitelist: ['apple', 'banana', 'orange', 'grape', 'kiwi', 'strawberry'],
		max: 5,
		minlength: 3,
		maxlength: 10,
		allowUpperCase: false,
		allowDuplicates: false,
		validation: (chip) => chip.length > 0,
		duration: 150,
		required: false,
		chips: "variant-filled",
		invalid: "input-error",
		padding: "p-2",
		rounded: "rounded-container-token",
		regionChipWrapper: "",
		regionChipList: "",
		regionInput: "",
		transitions: true,
		listTransitionInParams: { duration: 150, opacity: 0, y: -20 },
		listTransitionOutParams: { duration: 150, opacity: 0, y: -20 },
		chipTransitionInParams: { duration: 150, opacity: 0 },
		chipTransitionOutParams: { duration: 150, opacity: 0 },
	}
};
