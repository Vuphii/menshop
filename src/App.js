import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios, { Axios } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import {jwtDecode} from 'jwt-decode'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slides/useSlide'
import * as UserService from './services/UserService'
import Loading from './components/LoadingComponent/Loading'



function App() {

const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(false);
const user = useSelector((state) => state.user)
useEffect(() => {
  setIsLoading(true);
  const { storageData, decoded } = handleDecoded()
  if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
  }
  setIsLoading(false);

}, []);

const handleDecoded = () => {
  let storageData = localStorage.getItem('access_token');
  let decoded = {};
  if (storageData && isJsonString(storageData)) {
    storageData = JSON.parse(storageData);
    decoded = jwtDecode(storageData);
  }
  return { decoded, storageData }
}

UserService.axiosJWT.interceptors.request.use(async (config) => {
  const currentTime = new Date();
  const { decoded } = handleDecoded();
  if (decoded?.exp < currentTime.getTime() / 1000) {
    const data = await UserService.refreshToken();
    config.headers['token'] = `Beare ${data?.access_token}`;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

const handleGetDetailsUser = async (id, token) => {
  const res = await UserService.getDetailsUser(id, token);
  if (res) {
    dispatch(updateUser({ ...res.data, access_token: token }));
  }
}

  return(
    <div>
    <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowPage ? DefaultComponent : Fragment
              return(
                <Route key={route.path} path={isCheckAuth ? route.path : undefined} element={ 
                <Layout>
                  <Page /> 
                </Layout>
              } />
              )
            })}
          </Routes>
        </Router>
    </Loading>
    </div>
  )
}
export default App