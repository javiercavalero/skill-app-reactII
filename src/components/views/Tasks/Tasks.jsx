import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Radio, RadioGroup, FormControl, FormControlLabel, } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"
import debounce from "lodash.debounce";
import { useState, useEffect } from "react";
import "./Tasks.styles.css";
import { getTasks, deleteTask, editTaskStatus } from "../../../store/actions/tasksActions"
import { useResize } from "../../../hooks/useResize.js";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";

export const Tasks = () => {
  const [list, setList] = useState(null);

  const [renderList, setRenderList] = useState(null);

  const [tasksFromWho, setTasksFromWho] = useState("ALL");

  const [search, setSearch] = useState("");

  const { isPhone } = useResize();

  const dispatch = useDispatch();

 const { loading, error, tasks } = useSelector(state => {
    return state.tasksReducer
  } ) 
  
  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "/me" : ""))
  }, [tasksFromWho]);

 
  
useEffect(() => {

  if(tasks?.length){
    setList(tasks)
    setRenderList(tasks)
  }
}, [tasks])

  useEffect(() => {
   if(search)
    setRenderList(
      list.filter((data) => data.title.startsWith(search)))
   else setRenderList(list)
  }, [search]);


  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} deleteCard={handleDelete}
    editCardStatus = {handleEditCardStatus} />);
  };

  const renderColumnCards = text => {
    return renderList
      ?.filter((data) => data.status === text )
      .map((data) => <Card key={data._id} data={data} deleteCard={handleDelete} 
      editCardStatus = {handleEditCardStatus} />);
  };
  

  const handleChangeImportance = (e) => {
    if (e.currentTarget.value === "ALL"){
       setRenderList(list) }
    else{
      setRenderList(list.filter((data) => data.importance === e.currentTarget.value))
    }
  }

  const handleSearch = debounce( e => {setSearch(e?.target?.value)
  }, 1000)


  const handleDelete = id => dispatch(deleteTask(id))

 const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  if (error) return <div>Hubo un error</div>


  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>My tasks</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={ (e) => setTasksFromWho(e.currentTarget.value) }
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Alls"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="My tasks"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input type="text" 
              placeholder="Buscar por título..."
              onChange={handleSearch} />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Select priority</option>
              <option value="ALL">Alls</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {isPhone ? (
            !renderList?.length ? (
              <div>No tasks have been created</div>
            ) : loading ? (
              <>
                <Skeleton height={90} />
                <Skeleton height={90} />
                <Skeleton height={90} />
              </>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!renderList?.length ? (
                <div>No hay tareas aún</div>
              ) : loading ? (
                <Skeleton />
              ) : (
                <>
                  <div className="list">
                    <h4>New</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>In process</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finished</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
