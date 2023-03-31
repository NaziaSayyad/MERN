import { useEffect, useState } from 'react';

import { deleteTodo, getAllTodos } from '../redux/actions/index';
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from '../redux/actions/type';

import { useDispatch, useSelector } from 'react-redux';

// component
import Todo from './Todo';
import Tabs from './Tabs';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


export const Todos = () => {

    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos);
    const currentTab = useSelector(state => state.currentTab);

    useEffect(() => {
        dispatch(getAllTodos());
    }, [])

    const getTodos = () => {
        if (currentTab === ALL_TODOS) {
            return todos;
        } else if (currentTab === ACTIVE_TODOS) {
            return todos.filter(todo => !todo.done)
        } else if (currentTab === DONE_TODOS) {
            return todos.filter(todo => todo.done)
        }
    }
console.log("todos", todos);
    const removeDoneTodos = () => {
        todos.forEach(({ done, _id }) => {
            if (done) {
                dispatch(deleteTodo(_id));
            }
        })
    }
    const [characters, updateCharacters] = useState(todos);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCharacters(items);
      }
    //   handleOnDragEnd();
      console.log(todos);
    return (
        <article>
            <div  style={{marginTop:"2%"}}>
                <Tabs currentTab={currentTab} />

                {
                    todos.some(todo => todo.done) ? (
                        <button
                            onClick={removeDoneTodos}
                            className="button clear"
                        >Remove Done Todos</button>
                    ) : null    
                }
            </div>

            <ul>
         <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable  droppableId='characters'>
            {(provided) => (
              <ul className="divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                
                 {
                    getTodos().map((todo, index) => (
                        <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(provided) => (
                          <li className="py-4 flex" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  
                         <Todo 
                            key={todo._id}
                            todo={todo}
                        />
                            
                          </li>
                          
                        )}
                        
                      </Draggable>
                       
                    ))
                }
              </ul>
              
            )}
          </Droppable>
        </DragDropContext>
          </ul>     
           
        </article>
    )
}

export default Todos;