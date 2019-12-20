const getApiTasks = async name => {
  apiUrl = `https://wincacademydatabase.firebaseio.com/${name}/tasks.json`;
  try {
    // console.log(apiUrl);
    const res = await fetch(apiUrl, { method: "GET" });
    const result = await res.json();
    // console.log("Before (the raw result):", result);
    let tasks = Object.keys(result).map(key => ({
      id: key,
      description: result[key].description,
      done: result[key].done
    }));
    // console.log("After the tasks array", tasks);
    return tasks;
  } catch {
    console.log(Error);
  }
};

const addApiTasks = async (name, data = {}) => {
  apiUrl = `https://wincacademydatabase.firebaseio.com/${name}/tasks.json`;

  console.log(apiUrl);
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  console.log(data);
  console.log("response is: ", response.json);
  getTasks("matthijs");
};

const DeleteApiTasks = async id => {
  apiDeleteUrl = `https://wincacademydatabase.firebaseio.com/matthijs/tasks/${id}.json`;

  console.log(apiDeleteUrl);
  const response = await fetch(apiDeleteUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  getTasks("matthijs");
  console.log("response is: ", response.json);
};
const PutApiTasks = async (id, changedData) => {
  apiDeleteUrl = `https://wincacademydatabase.firebaseio.com/matthijs/tasks/${id}.json`;

  console.log(apiDeleteUrl);
  const response = await fetch(apiDeleteUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(changedData)
  });
  console.log("response is: ", response.json);
};

// getApiTasks("matthijs");

// const result = await someAPICallToGetAllTasks();
// // Maybe do something with your data here to get it in the correct format.
// // deze regels hierboven pas je dus nog aan naar jouw situatie.
// console.log("Before (the raw result):", result);
// let tasks = Object.keys(result).map(key => ({
//   id: key,
//   description: result[key].description,
//   done: result[key].done
// }));
// console.log("After the tasks array", tasks);
