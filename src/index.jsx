// Default export from a module
import React from 'react';

// Individual method exports from a module
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
//import './css/musiclist.scss';  //need to check why is not working!!!

import DevTools from './components/shared/DevTools';
import configureStore from './store';

import TemplateContainer from './components/TemplateContainer';

const Store = configureStore(0);

const renderApp = (Component) => {
    render(
        <AppContainer>
            <Provider store={Store}>
                <div>
                    <Component />
                    <DevTools />
                    </div>
            </Provider>
        </AppContainer>,
        document.querySelector('#react-app'),
    );
};

renderApp(TemplateContainer);

if (module && module.hot) {
    module.hot.accept('./components/TemplateContainer', () => {
        renderApp(TemplateContainer);
    })
}
