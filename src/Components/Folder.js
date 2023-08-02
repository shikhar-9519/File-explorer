import React, { useState } from "react";

export default function Folder({
  handleInsertNode,
  handleDeleteNode,
  handleEditNode,
  data,
}) {
  const [showItems, setShowItems] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [showButtons, setShowButtons] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const addingFolderOrNot = (e, isFolder) => {
    e.stopPropagation();
    setShowItems(true);
    setShowInput({ visible: true, isFolder });
  };

  const renamingNode = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const deletingNode = (e) => {
    e.stopPropagation();
    handleDeleteNode(data.id);
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(data.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const renameFileOrFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleEditNode(data.id, e.target.value, showInput.isFolder);
      setEditMode(false);
    }
  };

  if (data.isFolder) {
    return (
      <>
        {!editMode && (
          <div
            onClick={() => setShowItems(!showItems)}
            style={{ display: "flex", backgroundColor: "#f1f1f1", cursor: 'pointer' }}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
          >
            <div style={{color: showButtons ? "blue" : "black",}}>📁 {data.name}</div>
            <div style={{ marginLeft: "30px" }}>
              {showButtons && (
                <>
                  <button onClick={(e) => addingFolderOrNot(e, true)}>
                    + 📁
                  </button>
                  <button onClick={(e) => addingFolderOrNot(e, false)}>
                    + 📄
                  </button>
                  <button onClick={(e) => renamingNode(e)}>✏️</button>
                  <button onClick={(e) => deletingNode(e)}>🗑️</button>
                </>
              )}
            </div>
          </div>
        )}
        {editMode && (
          <>
            📁{" "}
            <input
              type="text"
              placeholder={data.name}
              autoFocus
              onKeyDown={renameFileOrFolder}
              style={{ padding: "0px 10px" }}
              onBlur={() => {
                setEditMode(false);
              }}
            />
          </>
        )}
        <div
          style={{ display: showItems ? "block" : "none", padding: "0px 10px" }}
        >
          {showInput.visible && (
            <div>
              {showInput.isFolder ? "📁" : "📄"}{" "}
              <input
                type="text"
                autoFocus
                onKeyDown={addFolder}
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                }}
              />
            </div>
          )}
          {data.items.map((item) => {
            return (
              <Folder
                data={item}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleEditNode={handleEditNode}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        {!editMode && (
          <div
            style={{ display: "flex", backgroundColor: "#f1f1f1" , cursor: 'pointer' }}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
          >
            <div style={{color: showButtons ? "blue" : "black",}}>📄 {data.name}</div>
            <div style={{ marginLeft: "30px" }}>
              {showButtons && (
                <>
                  <button onClick={(e) => renamingNode(e)}>✏️</button>
                  <button onClick={(e) => deletingNode(e,)}>🗑️</button>
                </>
              )}
            </div>
          </div>
        )}
        {editMode && editMode && (
          <>
            📄{" "}
            <input
              type="text"
              placeholder={data.name}
              autoFocus
              onKeyDown={renameFileOrFolder}
              style={{ padding: "0px 10px" }}
              onBlur={() => {
                setEditMode(false);
              }}
            />
          </>
        )}
      </>
    );
  }
}

// return (<div><Folder data = {}</div>)
