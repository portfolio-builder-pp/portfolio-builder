import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './modules/auth/login-page';
import { RootPage } from './modules/auth/root-page';
import { BlogIndexPage } from './modules/blog/pages/Index.page';
import { ContactIndexPage } from './modules/contact/pages/Index.page';
import { ContactCreatePage } from './modules/contact/pages/Create.page';
import { ContactUpdatePage } from './modules/contact/pages/Update.page';
import { UserIndexPage } from './modules/users/pages/Index.page';
import { UserCreatePage } from './modules/users/pages/Create.page';
import { BlogCreatePage } from './modules/blog/pages/Create.page';
import { BlogUpdatePage } from './modules/blog/pages/Update.page';
import { PortfolioIndexPage } from './modules/portfolio/pages/Index.page';
import { PropertyIndexPage } from './modules/properties/pages/Index.page';
import { PageIndexPage } from './modules/page/pages/Index.page';
import { PageCreatePage } from './modules/page/pages/Create.page';
import { PageUpdatePage } from './modules/page/pages/Update.page';

export function App() {
  return (
    <Routes>
      <Route path="/login" Component={LoginPage} />
      <Route path="/dashboard" Component={RootPage}>
        <Route path="blog">
          <Route index Component={BlogIndexPage} />
          <Route path="create" Component={BlogCreatePage} />
          <Route path=":id/update" Component={BlogUpdatePage} />
        </Route>
        <Route path="page">
          <Route index Component={PageIndexPage} />
          <Route path="create" Component={PageCreatePage} />
          <Route path=":id/update" Component={PageUpdatePage} />
        </Route>
        <Route path="contact">
          <Route index Component={ContactIndexPage} />
          <Route path="create" Component={ContactCreatePage} />
          <Route path=":id/update" Component={ContactUpdatePage} />
        </Route>
        <Route path="user">
          <Route index Component={UserIndexPage} />
          <Route path="create" Component={UserCreatePage} />
        </Route>
        <Route path="portfolio">
          <Route index Component={PortfolioIndexPage} />
        </Route>
        <Route path="property">
          <Route index Component={PropertyIndexPage} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
