import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { IpcRendererEvent } from 'electron';
import { ModalNotice } from '../layout/ModalInfo';

function ExtraPages(){

    const navigate = useNavigate()

    const [shutDownVisible, setshutDownVisible] = useState<boolean>(false)

    useEffect(()=>{
        const workingStateListener = window.electronAPI.onWorkingStateChangedMR((event:IpcRendererEvent,state:string,message?:string)=>{
            switch(state){
                case "working":
                    navigate('/progress')
                    break;
                default:
                    break;
            }
        })
        return ()=>{
            window.electronAPI.removeListener(workingStateListener)
        }
    },[])

    return (<div>
        
    </div>);
}
export default ExtraPages