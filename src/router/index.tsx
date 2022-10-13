
import CountryPage from '../components/CountryPage';
import CountryDetail from '../components/CountryDetailPage';

const routes = [
    {
        path: '/',
        component: <CountryPage />
    },
    {
        path: '/home',
        component: <CountryPage />
    },
    {
        path: '/details/:id',
        component: <CountryDetail />
    }
];

export default routes;