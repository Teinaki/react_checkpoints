import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import firestore from '../firebase';

const Groups = () => {
    const [groups, setGroups] = useState([]);

    const docRef = doc(firestore, "groups")

    useEffect(() => {
        onSnapshot(collection(docRef), (data) => {
            setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, [])

  return (
    <>
        <div className="header text-center">
            Hello World
            <h3>Groups</h3>

            <div className="task-container">
                {groups && groups.map((obj, index) => <span {...obj.Name} {...index}  /> ) }
            </div>
        </div>
    </>
  );
};

export default Groups;