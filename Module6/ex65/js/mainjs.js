nodeList = document.getElementById('node_list');

function addNode(){
    content = document.getElementById('add_content').value 
    pos = document.getElementById('add_pos').value;

    if(!content) return;

    li = document.createElement('li'); 
    li.textContent = content; 
    items = nodeList.children; 

    if(isNaN(pos) || pos>items.length) nodeList.appendChild(li);
        else if(pos<=1) nodeList.insertBefore(li, items[0]);
            else nodeList.insertBefore(li, items[pos-1]);
}

function removeNode(){
    pos = document.getElementById('remove_pos').value;
    items = nodeList.children;

    if(isNaN(pos) || pos<1 || pos>items.length) return; 

    nodeList.removeChild(items[pos-1]);
}

function modifyNode(){
    pos = document.getElementById('mod_pos').value;
    newContent = document.getElementById('mod_content').value 
    items = nodeList.children;

    if(isNaN(pos) || pos<1 || pos>items.length || !newContent) return; 
    
    newLi = document.createElement('li'); 
    newLi.textContent = newContent; 
    nodeList.replaceChild(newLi, items[pos-1]);
}

document.getElementById('add_node').addEventListener('click', addNode);
document.getElementById('remove_node').addEventListener('click', removeNode);
document.getElementById('modify_node').addEventListener('click', modifyNode);