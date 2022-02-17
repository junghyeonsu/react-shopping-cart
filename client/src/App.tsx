import { BrowserRouter } from 'react-router-dom';
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
    </BrowserRouter>
  );
}

export default App;
