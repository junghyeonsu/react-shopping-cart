import { BrowserRouter } from 'react-router-dom';
import ErrorModal from './components/Modal/ErrorModal';
import Nav from './components/Nav';
import RoutesConfig from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="root">
        <Nav />
        <RoutesConfig />
      </div>
      <div id="modal" />
      <div id="error-modal" />
      <ErrorModal />
    </BrowserRouter>
  );
}

export default App;
