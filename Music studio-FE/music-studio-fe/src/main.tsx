import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './routes/redux/store';
import AppRoutes from './routes/AppRoutes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/musicstudiomanagment">
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
