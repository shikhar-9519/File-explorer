import logo from './logo.svg';
import './App.css';
import sampleData from './SampleData';
import Folder from './Components/Folder';
import { useState } from 'react';
import useFileTraverse from './Hooks/use-file-traverse';

function App() {
  const[data,setData]=useState(sampleData);
  const{insertNode,deleteNode,editNode} = useFileTraverse();
  const handleInsertNode =(parentId,name,isFolder)=>{
    const newData = insertNode(data,parentId,name,isFolder);
    setData(newData);
  }

  const handleDeleteNode =(id)=>{
    const newData = deleteNode(data,id);
    setData(newData);
  }

  const handleEditNode =(id,newName)=>{
    const newData = editNode(data,id,newName);
    setData(newData);
  }

  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleEditNode={handleEditNode} data={data}/>
    </div>
  );
}

export default App;
