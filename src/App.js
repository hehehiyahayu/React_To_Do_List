import React from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import Popup from 'reactjs-popup';
import {Form, Button, Col, Row, Container, Table} from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      status: '',
    }
  }

  handleSubmit(event){
    // event.preventDefault();

    let datas = [];
    const ids = uuid();
    let idTD = ids.slice(0, 8);

    let titleTD = this.state.title;
    let statusTD = this.state.status;

    datas = JSON.parse(localStorage.getItem("datas") || "[]");

    datas.push({id: idTD, title: titleTD, status: statusTD});
    localStorage.setItem("datas", JSON.stringify(datas));
    window.location.reload();
  }

  handleTitle(event){
    this.setState({title: event.target.value});
    this.setState({status: false});
    console.log("title : " + event.target.value);
  }

  handleCheckBox(event, id){
    if(event.target.checked){
      this.setState({status: true});
      let array = JSON.parse(localStorage.getItem("datas") || "[]");
      let temp = array.find(element => element.id === id);
      temp.status = true;
      localStorage.setItem("datas", JSON.stringify(array));
    }else{
      this.setState({status: false});
      let array = JSON.parse(localStorage.getItem("datas") || "[]");
      let temp = array.find(element => element.id === id);
      temp.status = false;
      localStorage.setItem("datas", JSON.stringify(array));
    }
  }

  handleUpdateButton(event, itemId, update_title_todo){
    let array = JSON.parse(localStorage.getItem("datas") || "[]");
    
    for(let i = 0; i < array.length; i++){
      if(itemId === array[i].id){
        array[i].title = update_title_todo;
        console.log(i);
        localStorage.setItem("datas", JSON.stringify(array));
      }
    }
    alert('Title has been updated');
    window.location.reload();
  }

  handleDeleteButton(id){
    let array = JSON.parse(localStorage.getItem("datas") || "[]");

    let filteredData = array.filter((item) => item.id !== id);
    localStorage.setItem("datas", JSON.stringify(filteredData));
    alert('Title has been deleted');
    window.location.reload();
  }

  render(){
    let data = JSON.parse(localStorage.getItem("datas") || "[]");
    return (
      <>
        <h1 className='header'>To Do List</h1>
        <div className='FormToDo'>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Container>
                <Row>
                  <Col>
                    <Form.Control type='text' value={this.title} name="title_todo" onChange={(event) => this.handleTitle(event)} placeholder='Title'></Form.Control>
                  </Col>
                  <Col>
                    <Button type='submit' variant='primary' onClick={(event) => this.handleSubmit(event)}>Submit</Button>
                  </Col>
                </Row>
              </Container>
            </Form.Group>
          </Form>
        </div>
        <div>
        <div className='ItemToDo'>
          <Table className='' responsive='sm' striped bordered hover size='sm'>
            <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Opsi</th>
                </tr>
              </thead>
            {data.map((item) => {
              return(
                <tbody key={item.id}>
                  <tr>
                    <td>
                      <p className='mt-2'>{item.title}</p>
                    </td>
                    <td><input type='checkbox' className='mt-3' defaultChecked = {item.status} onChange={(event, id) => this.handleCheckBox(event, item.id)} />{item.status}</td>
                    <td>
                      <Popup trigger={<Button className='m-2' variant='warning'>Update</Button>} position="right center">
                        <div className='updateForm'>
                          <input type='text' value={this.state.title} name="update_title_todo" id="update_title_todo" onChange={(event) => this.handleTitle(event)} />
                          <Button type='submit' variant='warning' onClick={(event, itemId, update_title_todo) => this.handleUpdateButton(event, item.id, this.state.title)}>Update</Button>
                        </div>
                      </Popup>
                      <Button className='m-2' variant='danger' onClick={(id) => this.handleDeleteButton(item.id)}>Delete</Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          </div>
        </div>
      </>
    );
  }
}

export default App;
