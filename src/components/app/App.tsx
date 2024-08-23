import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

import styles from './App.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Article } from '../article';

import { ArticleParamsForm } from '../article-params-form';

const App = () => {
	const [style, setStyle] = useState<ArticleStateType>(defaultArticleState);

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
			<ArticleParamsForm articleStyles={(styles) => setStyle(styles)} />
			<Article />
		</div>
	);
};

export default App;
