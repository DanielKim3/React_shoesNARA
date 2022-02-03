/*eslint-disable */
import React, {useState, useContext, lazy, Suspense} from 'react';
import './App.css';
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import Data from './data.js';
// import Detail from './Detail.js';
let Detail = lazy(()=>{return import('./Detail.js')});
import axios from 'axios';
import Cart from './Cart.js';

export let 재고context = React.createContext();

import {Link, Route, Switch, useHistory} from 'react-router-dom';

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10]);

  


  return (
    <div className="App">    
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoesNARA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
    <Switch>
     <Route exact path="/">
      <div className="box">
        <h1>20% Season OFF</h1>
        <p>
          Adipisicing esse culpa nisi laboris dolore in fugiat ea dolore tempor cillum est.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
      <div className="container">

          <재고context.Provider value={재고}>

          <div className="row">
            {
              shoes.map((a, i)=> {
                return  <Card shoes={shoes[i]} i={i} ket={i}/>
              })
            }                   
          </div>   
          </재고context.Provider>

          <button className="btn btn-primary" onClick={() => {

            //axios.post('서버URL', {id : 'wjinkim21', pw : 1234})
            //로딩중이라는 UI 띄움
            axios.get('https://codingapple1.github.io/shop/data2.json')   
            .then((result) => {
              //로딩중이라는 UI 안보이게 처리
              console.log(result.data)
              shoes변경([...shoes, ...result.data]);
            })
            .catch(()=>{
              //로딩중이라는 UI 안보이게 처리
              console.log('실패했어요')
            })        
          }}>더보기</button> 
          {/*버튼을 누르면 
            1.axios get(데이터 요청 URL)
            2.성공하면 .then()
            3.실패하면 .catch()
          */}
      </div>
     </Route>

     <Route path="/detail/:id">
       <재고context.Provider value={재고}>
         <Suspense fallback={<div>로딩중이에요</div>}>
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </Suspense>
       </재고context.Provider>
     </Route>

     <Route path="/cart">
       <Cart></Cart>
     </Route>

     <Route path="/:id">
       <div>주소창에 /0 추가해보셈 ㅎ</div>
     </Route>  

     


    </Switch>
     </div>    
  );
}
 


  function Card(props){

    let 재고 = useContext(재고context)
    let history = useHistory();

    return(
      <div className="col-md-4" onClick={()=>{history.push('/detail/' + props.shoes.id )}}>
            <img src={"https://codingapple1.github.io/shop/shoes" + (props.i +1) + ".jpg"} width="100%" />
            <h4>{ props.shoes.title }</h4>
            <p>{ props.shoes.content } & { props.shoes.price }</p>
            <Test></Test>
      </div>
    )
  }
  function Test(){
    let 재고 = useContext(재고context)
    return <p>{재고}</p>
  }



export default App;
