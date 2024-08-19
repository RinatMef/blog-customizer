import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArrowButton } from './components/arrow-button/ArrowButton';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [style, setStyle] = useState(defaultArticleState);
	const setUserSettings = (style: {
		fontFamilyOption: OptionType | null;
		fontSizeOption: OptionType | null;
		fontColor: OptionType | null;
		contentWidth: OptionType | null;
		backgroundColor: OptionType | null;
	}) => {
		setStyle({
			fontFamilyOption:
				style.fontFamilyOption || defaultArticleState.fontFamilyOption,
			fontSizeOption:
				style.fontSizeOption || defaultArticleState.fontSizeOption,
			fontColor: style.fontColor || defaultArticleState.fontColor,
			contentWidth: style.contentWidth || defaultArticleState.contentWidth,
			backgroundColor:
				style.backgroundColor || defaultArticleState.backgroundColor,
		});
	};

	const handleArrowClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsOpen(!isOpen);
	};

	const handleCloseForm = () => {
		setIsOpen(false);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': style.fontFamilyOption?.value || 'initial',
					'--font-size': style.fontSizeOption?.value || 'initial',
					'--font-color': style.fontColor?.value || 'initial',
					'--container-width': style.contentWidth?.value || 'auto',
					'--bg-color': style.backgroundColor?.value || 'initial',
				} as CSSProperties
			}>
			<ArrowButton onClick={handleArrowClick} isOpen={isOpen} />
			<ArticleParamsForm
				isOpen={isOpen}
				onClick={setUserSettings}
				onClose={handleCloseForm}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
