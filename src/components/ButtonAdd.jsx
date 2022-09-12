import React from 'react';
import { useHistory } from 'react-router-dom'; // version 5.2.0

const ButtonAdd=()=>
{
    let history = useHistory ();
    const handleClick = () => {
       history.push ('/');
    }    

    return (
       <div className="App">
          <button onClick={handleClick}>Next page ==</button>
       </div>
    );
}
export default ButtonAdd