import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './modules/auth/login-page';
import { RootPage } from './modules/auth/root-page';
import { BlogIndexPage } from './modules/blog/pages/Index.page';
import { ContactIndexPage } from './modules/contact/pages/Index.page';
import { UserIndexPage } from './modules/users/pages/Index.page';

export function App() {
  return (
    <Routes>
      <Route path="/login" Component={LoginPage} />
      <Route path="/dashboard" Component={RootPage}>
        <Route path="blog">
          <Route index Component={BlogIndexPage} />
        </Route>
        <Route path="contact">
          <Route index Component={ContactIndexPage} />
        </Route>
        <Route path="user">
          <Route index Component={UserIndexPage} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
