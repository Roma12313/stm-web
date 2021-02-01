import React from 'react';
import {Card,Table,ButtonGroup,Button,InputGroup,FormControl} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser,faTrash,faStepBackward,faFastForward,faStepForward,faFastBackward, faTimes, faTasks} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';


class taskList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            tasks:[],
            search:'',
            currentPage:1,
            tasksPerPage:5
        };
    }
    
    componentDidMount(){
        this.findAllTasks();
        
    }
    findAllTasks(){
        axios.get(" http://localhost:8080/tasks")
        .then(response=>response.data)
        .then((data)=>{
            this.setState({tasks: data})
        });
    }
    deleteTask=(taskId)=>{
        axios.delete("http://localhost:8080/taskDelete/"+taskId)
        .then(response=>{
            if(response.data!=null){
                this.setState({"show":true});
                setTimeout(()=>this.setState({"show":false}),3000);
                this.setState({
                    tasks:this.state.tasks.filter(task => task.taskId !== taskId)
                });
            }
            else{
                this.setState({"show":false});
            }
        });
    };
    changePage = event=>{
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
    };
    firstPage=()=>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage:1
            });
        }
    };
    prevPage=()=>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage:this.state.currentPage-1
            });
        }
    };
    lastPage=()=>{
        if(this.state.currentPage < Math.ceil(this.state.tasks.length/this.state.tasksPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.tasks.length/this.state.tasksPerPage)
            });
        }
    };
    nextPage=()=>{
        if(this.state.currentPage < Math.ceil(this.state.tasks.length/this.state.tasksPerPage)){
            this.setState({
                currentPage:this.state.currentPage+1
            });
        }
    };

   updateSearch(event){
       this.setState({search:event.target.value.substr(0,20)})
   }
    cancelSearch = ()=>{
        this.setState({"search":''})
    }

    onChange=e=>{
        this.setState({search:e.target.value})
    }
    render(){
        const{tasks,currentPage,tasksPerPage,search}=this.state;
        const lastIndex = currentPage * tasksPerPage;
        const firstIndex= lastIndex-tasksPerPage;
        const currentTasks= tasks.slice(firstIndex,lastIndex);
        const totalPages = (tasks.length/tasksPerPage).toFixed();
        const pageNumCss={
            width :"45px",
            border:"1px solid  #17A2B8",
            color:"#17A2B8",
            textAlign:"center",
            fontWeight:"bold"
        };
        const infoBorder={
            border:"1px solid #17A2B8"
        }
        const filteredTasks=currentTasks.filter(task=>{
            return task.title.toLowerCase().indexOf(search)!==-1
        })
       
    
        return(
            
            <div>
                 <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Task Deleted Successfully."}type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                    <FontAwesomeIcon icon= {faTasks}/> Tasks List
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name = "search" className={" bg-dark text-white"}
                             style={infoBorder}
                            onChange={this.onChange}/>
                            <InputGroup.Append>
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                            <FontAwesomeIcon icon= {faTimes}/>
                                </Button>
                            </InputGroup.Append>
                    </InputGroup>
                    </div>
                   </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date Added</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tasks.length===0 ?
                            <tr align="center">
                                <td colSpan ="6"> Tasks.</td>
                            </tr>:
                           filteredTasks.map((task,index)=>(
                                <tr key={task.id}>
                                    <td>{task.taskId}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.dateAdded}</td>
                                    <td>{task.type.toString()}</td>
                                    <td>{task.status.toString()}</td>
            
                                    <td>
                                        <ButtonGroup>
                                            <Button size = "sm"variant = "outline-danger"onClick={this.deleteTask.bind(this,task.taskId)} ><FontAwesomeIcon icon= {faTrash}/></Button>
                                        </ButtonGroup>
                                    </td>
                                    
                                </tr>
                            ))
                            
                         }
                        </tbody>

                    </Table>
                </Card.Body>
                <Card.Footer>
                        <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage===1 ? true: false}
                                    onClick={this.firstPage}>
                                    <FontAwesomeIcon icon= {faFastBackward}/>  First
                                    </Button>
                                    <Button type="button" variant="outline-info"disabled={currentPage===1 ? true: false}
                                    onClick={this.prevPage}>
                                    <FontAwesomeIcon icon= {faStepBackward}/>  Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} className={"bg-dark"} name ="currentPage" value={currentPage}
                                onChange={this.changePage}/>
                                <InputGroup.Append>
                                <Button type="button" variant="outline-info"disabled={currentPage===totalPages ? true: false}
                                onClick={this.nextPage}>
                                <FontAwesomeIcon icon= {faStepForward}/>Next
                                    </Button>
                                    <Button type="button" variant="outline-info"disabled={currentPage===totalPages ? true: false}
                                    onClick={this.lastPage}>
                                    <FontAwesomeIcon icon= {faFastForward}/>Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                </Card.Footer>
           </Card>

            </div>
          
        );
    }
}


export default taskList;
