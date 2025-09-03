import adminRoutes from './admin.routes.js';
import publicRoutes from './public.routes.js';
import centerRoutes from './center.routes.js';
import nurseRoutes from './nurse.routes.js';

const routes = {
    admin: adminRoutes,
    public: publicRoutes,
    center: centerRoutes,
    nurse: nurseRoutes
};

export default routes;