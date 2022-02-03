import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  if(액션.type === 'alert닫기') {
    state = false;
    return state;
  }else{
  return state
  }
}



let 초기값 = [
  { id: 0, name: '멋진신발', quan : 2},
  { id: 1, name: '멋진신발2', quan : 1}
];

function reducer(state = 초기값, 액션){
  if(액션.type === '항목추가'){

    let found = state.findIndex((a)=>{ return a.id === 액션.데이터.id});
    //id가 같은 상품이 state에 있으면 push() 하지말고 id가 같은 상품의 quan을 1증가
    if(found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy
    } else{
      let copy = [...state];
      copy.push(액션.데이터);
      return copy
    }     
  }else if(액션.type === '수량증가'){    
    let copy = [...state];
    copy[액션.데이터].quan++;
    return copy
  }else if(액션.type === '수량감소'){
    let copy = [...state];
    copy[액션.데이터].quan--;
    return copy
  }else{
    return state
  }
  
 };



let store = createStore(combineReducers({reducer, reducer2}));



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}> 
      <App />
    </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
