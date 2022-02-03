import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js'
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux';

let 박스 = styled.div`
    padding: 20px;
`;
let 제목 = styled.h4`
    font-size: 25px;
    color: ${props => props.색상}
`;
let 최근상품 = styled.div`
  padding: 20px;
  color: black;
  
`


function Detail(props) {

   

    let [alert, alert변경] = useState(false);


    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id == id
    });

    let[스위치, 스위치변경] = useState(false);

    let [누른탭, 누른탭변경] = useState(0);

    let 재고 = useContext(재고context);

    let history = useHistory(); 

    useEffect(() => {
        let 타이머 =  setTimeout(() => {
              alert변경(false)
          },2000);
      });

      useEffect( ()=>{
        var arr = localStorage.getItem('watched');
        arr = JSON.parse(arr);
        
        arr.push(id);
        arr = new Set(arr);
        arr = [...arr];
        localStorage.setItem('watched', JSON.stringify(arr) );
      
      }, [] );

      

    


    return(
        
      <div className="container">
          <박스>
            <제목 className="red">상세페이지</제목>
          </박스>

          {
              alert === true
              ? (
              <div className="my-alert2">
                <p>재고가 얼마 남지 않았습니다</p>
              </div>)
              : null
          }
         
          <div className="row">
            <div className="col-md-4">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-4 mt-4">
              <h4 className="pt-5">{찾은상품.title}</h4>      
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>
              
              
              {/* <Info 재고={props.재고}></Info> */}

              <button className="btn btn-danger" onClick={() => {
                  props.재고변경([9,11,12])
                  props.dispatch({type : '항목추가', 데이터: {id:찾은상품.id, name: 찾은상품.title, quan: 1}});
                  history.push('/cart'); //개발환경에서 페이지 이동시 강제새로고침 안되게 하는 방법.s
              }}>주문하기</button> &nbsp;&nbsp;
            
              <button className="btn btn-warning" onClick={()=>{
                  history.goBack();
              }}>뒤로가기</button> 
            </div>
             
             <최근상품>
              <p>최근본 상품</p>
             </최근상품>
                       
          </div>
         

          


          <Nav className="mt-5" variant="tabs" defaultActiveKey="/link-0">
            <Nav.Item>
                <Nav.Link href="link-0" onClick={()=>{스위치변경(false);누른탭변경(0)}}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false);누른탭변경(1)}}>Option 2</Nav.Link>
            </Nav.Item>            
           </Nav>
            <CSSTransition in={스위치} classNames="wow" timeout={500}>
                <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
            </CSSTransition>
              
        </div>
    )
  }

  function TabContent(props){

    useEffect(()=>{
        props.스위치변경(true);
    })
    if(props.누른탭 === 0) {
        return <div>0번째 내용입니다</div>
    }else if(props.누른탭 === 1){
        return <div>1번째 내용입니다</div>
    }else if(props.누른탭 === 2){
        return <div>2번째 내용입니다</div>
    }
  }



  //redux 사용하기 위한 함수, 커넥트
  function state를props화(state){
    console.log(state)
      return {
        state : state.reducer,
        alert열렸니 : state.reducer2
      }
    }
    
    export default connect(state를props화)(Detail);