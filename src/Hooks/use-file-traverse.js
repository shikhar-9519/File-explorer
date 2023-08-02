const useFileTraverse = () => {
    function insertNode(data,parentId,name,isFolder) {
        if(data.id === parentId) {
            data.items.unshift({
                id:new Date().getTime(),
                name,
                isFolder,
                items: []
            });
             return data;
        }

        let updatedNode = [];
        updatedNode = data.items.map((item) => {
           return insertNode(item,parentId,name,isFolder);
        })
        return {...data, items: updatedNode};
       
    }
    
    function deleteNode(data,id){
        if (!data) {
            return null;
        }
        if (data.id === id) {
            return null;
        }

        const updatedItems = data.items.map((item) => deleteNode(item, id));

        const filteredItems = updatedItems.filter((item) => item !== null);

        return { ...data, items: filteredItems };

    }

    function editNode(data,id,newName){
        if (!data) {
            return null;
        }
        if (data.id === id) {
            data.name=newName;
            return data;
        }

        const updatedItems = data.items.map((item) => editNode(item,id,newName));

        return { ...data, items: updatedItems };

    }
    return {insertNode,deleteNode,editNode};
}
export default useFileTraverse;