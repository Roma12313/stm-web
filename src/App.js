import logo from './logo.svg';
import './App.css';
import createUser from './components/createUser'
import userList from './components/userList'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import {Container,Row,Col} from 'react-bootstrap';
import Welcome from './components/Welcome'
import Footer from './components/Footer';
import createTask from './components/createTask';
import taskList from './components/taskList';
export default function App() {


  const marginTop={
    marginTop:"20px"
  };
  
  return (
	  
    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>			  
              <Route path="/createUser" exact component ={createUser}/>
              <Route path="/listUsers" exact component ={userList}/>
              <Route path="/createTask" exact component ={createTask}/>
              <Route path="/listTasks" exact component ={taskList}/>
  
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    
   </Router>
   );
 }