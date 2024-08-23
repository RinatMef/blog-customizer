import React from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

interface ArrowButtonProps {
	isOpen: boolean;
	onClick: (event: React.MouseEvent) => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	isOpen,
	onClick,
}) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}>
			<img
				src={arrow}
				alt='Иконка стрелочки.'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
