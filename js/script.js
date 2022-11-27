const apiToken = "--yourApiToken--"
const projectId = "--yourProjectId--";
const projectsEndpoint = "https://api.todoist.com/rest/v2/tasks?project_id=" + projectId;

/**
 * Request Todoist Rest API in order to get tasklist
 * @returns 
 */
function getTasks(url, token) {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    
    const req = new Request(url, {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    });
      
    return fetch(req)
    .then(response => response.json())
    .then(data => data)
}

/**
 * Appends all the tasks to the list
 */
function buildTasks(tasks) {

    const listDOM = document.getElementById("list");
    listDOM.innerHTML = "";

    for (task of tasks) {
        let li = document.createElement("li");
        li.classList.add("task");
        // If "DOING" tag is set, highlight
        if (task.labels.includes("DOING")) li.classList.add("doing");
        li.innerHTML += task.content;

        let categories = document.createElement("div");
        
        // create spans for labels
        for (label of task.labels) {
            if (label != "DOING") {
                let span = document.createElement("span");
                span.textContent = label;
                span.classList.add(label.toLowerCase());
                categories.appendChild(span);
            }
        }
        
        li.appendChild(categories);
        listDOM.appendChild(li);
    }
}

/**
 * Reload task list
 */
async function reload() {
    const tasks = await getTasks(projectsEndpoint, apiToken);
    buildTasks(tasks);
}
reload();
setInterval(() => reload(), 5000);

