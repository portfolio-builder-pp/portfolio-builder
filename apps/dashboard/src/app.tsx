import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './modules/auth/login-page';
import { RootPage } from './modules/auth/root-page';

export function App() {
  return (
    <Routes>
      <Route path="/login" Component={LoginPage} />
      <Route path="/dashboard" Component={RootPage}>
        <Route path="blog" element={<div>blog</div>} />
      </Route>
    </Routes>
  );
}

export default App;
