import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks

		const handleClick = () => {
			setIsOpen(!isOpen);
		};

		return <ArrowButton onClick={handleClick} isOpen={isOpen} />;
	},
};
