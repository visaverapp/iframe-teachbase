import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HashRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <StrictMode>
        <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
      </StrictMode>
  );
} else {
  console.error("Root element not found");
}