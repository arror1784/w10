import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Button from '../components/Button';

import Home from '../pages/Home';
import Model from '../pages/Model';
import Setting from '../pages/Setting';
import Progress from '../pages/Progress';
import Complete from '../pages/Complete';
import FactoryReset from '../pages/FactoryReset';

const AppRoute = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Navigate to='/home'/>
            }/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/model' element={<Model/>}/>
            <Route path='/progress' element={<Progress/>}/>
            <Route path='/complete/:totalElapsedTime/:error' element={<Complete/>}/>

            <Route path='/setting' element={<Setting/>}/>
            
            <Route path='/factoryReset' element={<FactoryReset/>}/>
            
        </Routes>
        );
}

export default AppRoute;