import SignInPage from "../pages/SignInPage/SignInPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeproductPage from "../pages/TypeProductPage/TypeProductPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import Profile from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/Payment";
import OrderSuccessPage from "../pages/OrderSuccess/OrderSuccess";



export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowPage: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowPage: true
    },
    {
        path: 'product/:type',
        page: TypeproductPage,
        isShowPage: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowPage: false
    },{
        path: '/signup',
        page: SignUpPage,
        isShowPage: false
    },{
        path: '/detailproduct/:id',
        page: DetailProductPage,
        isShowPage: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowPage: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowPage: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccessPage,
        isShowPage: true
    },
    {
        path: '/profile',
        page: Profile,
        isShowPage: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowPage: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowPage: false
    }

]
    