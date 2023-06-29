import { Switch } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';


import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import { ProfileProvider } from './context/profile.context';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary >
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn/>
        </PublicRoute>
        <PrivateRoute path="/">
          <Home/>
        </PrivateRoute>
      </Switch>
      </ProfileProvider>
    </ErrorBoundary>
  );
}

export default App;
