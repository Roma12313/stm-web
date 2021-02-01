import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave,faUndo,faList,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

class createUser extends React.Component{

    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.changeUser =this.changeUser.bind(this);
        this.sumbitUser=this.sumbitUser.bind(this); 
    }
    initialState={
        userId:"",name:"",lastName:"",email:"",password:"",registrationDateTime:""
        }
    componentDidMount(){
        const userId=+this.props.match.params.id;
        if(userId){
            this.findProjektById(userId)
        }
    }
  
    
    resetUser =()=>{
        this.setState(()=>this.initialState);

    }
   
    sumbitUser(event){

        event.preventDefault();

        const user={
            name:this.state.name,
            lastName:this.state.lastName,
            email:this.state.email,
            password: this.state.password,
            registrationDateTime:this.state.registrationDateTime
          

        };
        axios.post("http://localhost:8080/users/create",user)
        .then(response=>{
            if(response.data!=null){
                this.setState({"show":true});
                setTimeout(()=>this.setState({"show":false}),3000);
            }else{
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
     
  

    }
    changeUser(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}

    render(){
        const{name,lastName,email,password,registrationDateTime}=this.state
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.sutdentId ?"User Updated Successfully." :"User Saved Successfully." }type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon= {this.state.sutdentId ? faEdit : faPlusSquare}/>{this.state.sutdentId ? "Save User": "Add User"}</Card.Header>   
                    <Form onReset={this.resetUser} onSubmit={this.sumbitUser} id = "zadanieFormId">
                        <Card.Body >
                             <Form.Row>
                                <Form.Group as={Col}controlId="formGridDateOfCreate" size ="500">
                                    <Form.Label>Name of the User</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "name"
                                        value={name}
                                        onChange={this.changeUser}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter name "/>
                                </Form.Group>
                                <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Surname of the  User</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "lastName"
                                        value={lastName}
                                        onChange={this.changeUser}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Surname "/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Email of the User</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "email"
                                        value={email}
                                        onChange={this.changeUser}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Index "/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Password of the Student</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "password"
                                        value={password}
                                        onChange={this.changeUser}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter password  "/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Registration Date </Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "registrationDateTime"
                                        value={registrationDateTime.toString()}
                                        onChange={this.changeUser}
                                        className={"bg-dark text-white"}
                                        placeholder="YYYY-MM-DD "/>
                                 </Form.Group>
                                 
                                
                             </Form.Row> 
                                          
                         </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant ="success" type = "submit">
                        <FontAwesomeIcon icon= {faSave}/> {this.state.sutdentId ? "Save": "Save"}
                        </Button>{' '}
                        <Button size="sm" variant ="info" type = "reset">
                            <FontAwesomeIcon icon= {faUndo}/> Reset
                        </Button>
                        {' '}
                    </Card.Footer>
                </Form>
            </Card>
            </div>
            

        );
    }
}
export default createUser 