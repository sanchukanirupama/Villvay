// Initial Routes
import OtherRoutes from '@routes/other.routes';
import AuthRoutes from '../routes/auth.routes';

const initialRoutes: any[] = [new AuthRoutes(), new OtherRoutes()];

const routes = [...initialRoutes];

export default routes;
