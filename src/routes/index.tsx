import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Button from '../components/Button';

import Home from '../pages/Home';
import Setting from '../pages/Setting';
import Progress from '../pages/Progress';
import Complete from '../pages/Complete';
import FactoryReset from '../pages/FactoryReset';
import Course from '../pages/Course';

const AppRoute = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Navigate to='/home'/>
            }/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/course' element={<Course/>}/>
            <Route path='/progress' element={<Progress/>}/>
            <Route path='/complete/:totalElapsedTime/:error' element={<Complete/>}/>

            <Route path='/setting' element={<Setting/>}/>
            
            <Route path='/factoryReset' element={<FactoryReset/>}/>
            
        </Routes>
        );
}

export default AppRoute;