import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import firestore from '../firebase';
import { useUserContext } from "../Auth";

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [task, setTask] = useState([]);
    const { user } = useUserContext();
    const docRef = doc(firestore, "users", user.uid)

    useEffect(() => {
        onSnapshot(collection(docRef, 'tasks'), (data) => {
            setTask(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, [])

    const deleteTask = (id) => {
        const taskDoc = doc(firestore, "task", id);
        deleteDoc(taskDoc);
    }

    const updateTaskData = (obj, id) => {
        const taskDoc = doc(firestore, "task", id);
        updateDoc(taskDoc, obj);
    }

    const toggle = () => setModal(!modal);

    const saveTask = (taskObj) => {
        addDoc(collection(docRef, "tasks"), taskObj)
    }

    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)} >Create Task</button>
            </div>
            <div className="task-container">
                {task && task.map((obj, index) => <Card toggle={toggle} taskObj={obj} index={index} deleteTask={deleteTask} updateTaskData={updateTaskData} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;