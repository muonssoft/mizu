import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { contextApp } from '../firebase/context';

function ProtectedRoute({ component }) {
    const { usuario } = useContext(contextApp);
    useEffect(() => {
        
        if (usuario===null || usuario===undefined || usuario===false) {
          return <Redirect to ="/login"/>
           
        }
       
    }, [ usuario]);
   
  
}

export default ProtectedRoute
