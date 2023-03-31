import React, { useEffect, useState } from 'react'
import {Pie} from "react-chartjs-2"
import { Chart } from 'chart.js/auto'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos } from '../redux/actions';
function Barchart() {
    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos);
    const [active,setactive] = useState(0);

    let active_todo = 0; let done = 0;
    todos.forEach(element => {
       let res = (element.done);
        if(res){
            done++;
        }
        else{
            active_todo++
        }
    });
    const All_todo =todos.length;
    
    
    
   
    useEffect(() => {
        dispatch(getAllTodos());
    }, [])
  return (
    <div style={{width:"40%",margin:"auto"}}>
     
<Pie
  data={{
    labels: [ 'All','Active', 'Done'],
    datasets: [
      {
        id: 1,
        label: '',
        data: [All_todo, active_todo, done ],
        backgroundColor: [
          'red',
          'blue',
          'green'        ],
      }
    ],
  }}
/>
</div>
  )
}

export default Barchart
