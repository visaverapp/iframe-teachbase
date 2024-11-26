import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HashRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ErrorBoundary } from 'react-error-boundary';

console.log({VITE_BASE_URL: import.meta.env.VITE_BASE_URL});

const rootElement = document.getElementById('root');


if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <StrictMode>
           <ErrorBoundary
          fallback={
            <div>Упс что-то пошло не так</div>}
        >

        <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
        </ErrorBoundary>
      </StrictMode>
  );
} else {
  console.error("Root element not found");
}