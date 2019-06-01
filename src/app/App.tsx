import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScrapDataView } from './components/Hello';
ReactDOM.render(<ScrapDataView compiler="Typescript" framework="React" bundler="Webpack" />,
document.getElementById('root'));