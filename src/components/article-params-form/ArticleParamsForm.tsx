import React, { useRef, useState } from 'react';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'components/text';
import { Select } from '../select';
import {
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

interface ArticleParamsFormProps {
	isOpen: boolean;
	onClick: (style: {
		fontFamilyOption: OptionType | null;
		fontSizeOption: OptionType | null;
		fontColor: OptionType | null;
		contentWidth: OptionType | null;
		backgroundColor: OptionType | null;
	}) => void;
	onClose: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isOpen,
	onClick,
	onClose,
}) => {
	const [selectedFontFamily, setSelectedFontFamily] =
		useState<OptionType | null>(null);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(
		null
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType | null>(null);
	const [selectedContentWidth, setSelectedContentWidth] =
		useState<OptionType | null>(null);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleSubmitClick = () => {
		onClick({
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			contentWidth: selectedContentWidth,
			backgroundColor: selectedBackgroundColor,
		});
	};

	const handleResetClick = () => {
		setSelectedFontFamily(null);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedFontColor(null);
		setSelectedBackgroundColor(null);
		setSelectedContentWidth(null);

		onClick({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor,
		});
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: (side) => {
			if (!side) {
				onClose();
			}
		},
	});

	return (
		<>
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}
					ref={rootRef}>
					<form className={styles.form}>
						<div className={styles.formContentContainer}>
							<Text as='h1' size={31} weight={800} uppercase family='open-sans'>
								задайте параметры
							</Text>
							<Select
								selected={selectedFontFamily}
								options={fontFamilyOptions}
								placeholder='Выберите шрифт'
								onChange={setSelectedFontFamily}
								title='Шрифт'
							/>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={selectedFontSize}
								onChange={setSelectedFontSize}
								title='Размер шрифта'
							/>
							<Select
								selected={selectedFontColor}
								options={fontColors}
								placeholder='Выберите цвет шрифта'
								onChange={setSelectedFontColor}
								title='Цвет шрифта'
							/>
							<Separator />
							<Select
								selected={selectedBackgroundColor}
								options={backgroundColors}
								placeholder='Выберите цвет фона'
								onChange={setSelectedBackgroundColor}
								title='Цвет фона'
							/>
							<Select
								selected={selectedContentWidth}
								options={contentWidthArr}
								placeholder='Выберите ширину контента'
								onChange={setSelectedContentWidth}
								title='Ширина контента'
							/>
						</div>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={handleResetClick}
							/>
							<Button
								title='Применить'
								type='button'
								onClick={handleSubmitClick}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
