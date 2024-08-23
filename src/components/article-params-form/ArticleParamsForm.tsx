import React, { useRef, useState } from 'react';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'components/text';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArrowButton } from '../arrow-button';

interface ArticleParamsFormProps {
	articleStyles: (style: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleStyles,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedStyles, setSelectedStyles] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (selectedOption: OptionType) => {
			setSelectedStyles((prevState) => ({
				...prevState,
				[field]: selectedOption,
			}));
		};
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		articleStyles(selectedStyles);
	};

	const handleResetClick = () => {
		setSelectedStyles(defaultArticleState);
		articleStyles(defaultArticleState);
	};

	const handleArrowClick = () => {
		setIsOpen((openef) => !openef);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: (side) => {
			if (!side) {
				setIsOpen(false);
			}
		},
	});

	return (
		<>
			<ArrowButton onClick={handleArrowClick} isOpen={isOpen} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}
					ref={rootRef}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleResetClick}>
						<div className={styles.formContentContainer}>
							<Text as='h1' size={31} weight={800} uppercase family='open-sans'>
								задайте параметры
							</Text>
							<Select
								selected={selectedStyles.fontFamilyOption}
								options={fontFamilyOptions}
								placeholder='Выберите шрифт'
								onChange={handleOnChange('fontFamilyOption')}
								title='Шрифт'
							/>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={selectedStyles.fontSizeOption}
								onChange={handleOnChange('fontSizeOption')}
								title='Размер шрифта'
							/>
							<Select
								selected={selectedStyles.fontColor}
								options={fontColors}
								placeholder='Выберите цвет шрифта'
								onChange={handleOnChange('fontColor')}
								title='Цвет шрифта'
							/>
							<Separator />
							<Select
								selected={selectedStyles.backgroundColor}
								options={backgroundColors}
								placeholder='Выберите цвет фона'
								onChange={handleOnChange('backgroundColor')}
								title='Цвет фона'
							/>
							<Select
								selected={selectedStyles.contentWidth}
								options={contentWidthArr}
								placeholder='Выберите ширину контента'
								onChange={handleOnChange('contentWidth')}
								title='Ширина контента'
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
