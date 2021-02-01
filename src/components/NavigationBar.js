import React from 'react';

import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class NavigationBar extends React.Component{
    render(){
        return(
           <Navbar bg = "dark" variant = "dark">
               <Navbar.Brand href ="/">

               </Navbar.Brand>
               <Nav className = "mr-auto">
                 <Nav.Link href ="createUser">Create User </Nav.Link>
                 <Nav.Link href ="listUsers">List of Users </Nav.Link>
                 <Nav.Link href ="createTask">Create Task </Nav.Link>
                 <Nav.Link href ="listTasks">List of Tasks </Nav.Link>
               </Nav>
           </Navbar>
        

        );
    }
}
 export default NavigationBar;