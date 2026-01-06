import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './routes/redux/store';
import AppRoutes from './routes/AppRoutes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
