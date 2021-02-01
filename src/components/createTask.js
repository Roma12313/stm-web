import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave,faUndo,faList,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

class createTask extends React.Component{

    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.changeTask =this.changeTask.bind(this);
        this.sumbitTask=this.sumbitTask.bind(this); 
    }
    initialState={
        taskId:"",title:"",description:"",dateAdded:"",type:"",status:""
        }
    componentDidMount(){
        const taskId=+this.props.match.params.id;
        if(taskId){
            this.findProjektById(taskId)
        }
    }
  
    
    resetUser =()=>{
        this.setState(()=>this.initialState);

    }
   
    sumbitTask(event){

        event.preventDefault();

        const task={
            title:this.state.title,
            description:this.state.description,
            dateAdded:this.state.dateAdded,
            type: this.state.type,
            status:this.state.status
          

        };
        axios.post("http://localhost:8080/task/create",task)
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
    changeTask(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}


    render(){
        const{title,description,dateAdded,type,status}=this.state
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.sutdentId ?"Task Updated Successfully." :"Task Saved Successfully." }type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header size="100"><FontAwesomeIcon icon= {this.state.sutdentId ? faEdit : faPlusSquare}/>{this.state.sutdentId ? "Save Task": "Add Task"}</Card.Header>   
                    <Form onReset={this.resetUser} onSubmit={this.sumbitTask} id = "zadanieFormId">
                        <Card.Body>
                             <Form.Row>
                                <Form.Group as={Col}controlId="formGridDateOfCreate">
                                    <Form.Label>Task title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "title"
                                        value={title}
                                        onChange={this.changeTask}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter title of the Task"/>
                                </Form.Group>
                                <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Title description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "description"
                                        value={description}
                                        onChange={this.changeTask}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter description of the Task"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Date Added </Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "dateAdded"
                                        value={dateAdded}
                                        onChange={this.changeTask}
                                        className={"bg-dark text-white"}
                                        placeholder="YYYY-MM-DD"/>
                                 </Form.Group>
                                 <Form.Group as={Col} lg={12} controlId="formGridDateOfImplementation">
                                    <Form.Label>Type of the Task</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "type"
                                        value={type}
                                        onChange={this.changeTask}
                                        className={"bg-dark text-white"}
                                        placeholder="TASK, BUGOWANIE, FUTURE"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Status of the Task</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "status"
                                        value={status.toString()}
                                        onChange={this.changeTask}
                                        className={"bg-dark text-white"}
                                        placeholder="NEW,IN PROGRESS, DONE"/>
                                 </Form.Group>
                                 
                                
                             </Form.Row> 
                                          
                         </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant ="success" type = "submit">
                        <FontAwesomeIcon icon= {faSave}/> {this.state.taskId ? "Save": "Save"}
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
export default createTask 