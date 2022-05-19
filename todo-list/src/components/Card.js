import React, {useState} from 'react';
import EditTask from '../modals/EditTask'

const Card = ({taskObj, index, deleteTask, updateTaskData}) => {
    const [modal, setModal] = useState(false);

    //passed index is used for colors
    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateTaskData(obj, taskObj.id)
    }

    const handleDelete = () => {
        deleteTask(taskObj.id)
    }

    return (
        <div className = "card-wrapper me-5">
            <div className = "card-top" ></div>
            <div className = "task-holder">
                <span className = "card-header" style={{ "borderRadius": "10px"}}>{taskObj.Name}</span>
                <p className = "mt-3">{taskObj.Description}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <i className = "far fa-edit me-3" style={{ "cursor" : "pointer"}} data-testid="edit" onClick = {toggle}></i>
                    <i className="fas fa-trash-alt" style = {{ "cursor" : "pointer"}} data-testid="delete" onClick = {handleDelete}></i>
                </div>
        </div>
        <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;