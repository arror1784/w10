import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Model from '../pages/Model';
import Setting from '../pages/Setting';
import Progress from '../pages/Progress';
import Complete from '../pages/Complete';
import UpdateFileSelect from '../pages/UpdateFileSelect';
import Update from '../pages/Update';
import Wifi from '../pages/Wifi';
import UpdateSetting from '../pages/UpdateSetting';
import UpdateModeSetting from '../pages/UpdateModeSetting';
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

            <Route path='/updateSetting'>
                <Route path=''  element={<UpdateSetting/>}/>
                <Route path=':updateTarget'>
                    <Route path='' element={<UpdateModeSetting/>}/>
                    <Route path='usb' element={<UpdateFileSelect/>}/>
                </Route>
            </Route>
            <Route path='/update/:updateTarget/:updateMode/:updatePath' element={<Update/>}/>
            <Route path='/update/:updateTarget/:updateMode' element={<Update/>}/>
            <Route path='/wifi' element={<Wifi/>}/>
            
            <Route path='/factoryReset' element={<FactoryReset/>}/>
        </Routes>
        );
}

export default AppRoute;