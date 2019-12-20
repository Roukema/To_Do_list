//maakt een list object
const addTaskToList = async data => {
  let checkBoxnode = document.createElement("input");
  let listnode = document.createElement("li");
  let textnode = document.createElement("p");
  let deletenode = document.createElement("img");
  let savenode = document.createElement("img");
  //change their properties

  textnode.innerText = data.description;
  textnode.contentEditable = true;
  textnode.class = "";
  textnode.id = "p" + data.id;

  checkBoxnode.type = "checkBox";
  checkBoxnode.id = "c" + data.id;
  checkBoxnode.value = data.id;
  checkBoxnode.Name = "checkBox";
  checkBoxnode.className = "checkBoxButton";
  checkBoxnode.data = data.description;
  checkBoxnode.addEventListener("change", saveChange);
  checkBoxnode.addEventListener("change", changeClass);

  //   console.log(data.done);
  if (data.done === true) {
    checkBoxnode.checked = true;
  } else {
    checkBoxnode.checked = false;
  }
  deletenode.id = data.id;
  deletenode.className = "deleteButton";
  deletenode.value = data.id;
  deletenode.src = "trash-delete-icon.jpg";
  deletenode.addEventListener("click", clickDelete);
  //   console.log("info van de knop", deletenode);
  //   console.log("hier is de list", listnode);
  savenode.id = data.id;
  savenode.className = "saveButton";
  savenode.value = data.id;
  savenode.src = "savebutton.png";
  savenode.addEventListener("click", saveChange);

  document
    .getElementById("list")
    .appendChild(listnode)
    .appendChild(checkBoxnode);
  document
    .getElementById("list")
    .appendChild(listnode)
    .appendChild(textnode);
  document
    .getElementById("list")
    .appendChild(listnode)
    .appendChild(savenode);
  document
    .getElementById("list")
    .appendChild(listnode)
    .appendChild(deletenode);
  return listnode;
};

// stuurt array naar de list
const addTaskToDom = async data => {
  await data.forEach(async element => {
    await addTaskToList(element);
    console.log("hallo Element:", element);
  });

  //add listener to button, checkbutton
  // addCheckboxChangeListener();
};
//haalt data op uit api client
const getTasks = async Name => {
  data = await getApiTasks(Name);
  document.getElementById("list").innerText = "";
  addTaskToDom(data);
  console.log(data);
};
// haalt data op uit task input

const addTaskInputListener = () => {
  const button = document.getElementById("taskButton");
  button.addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const taskInput = {
      description: `${input.value}`,
      done: false
    };
    // console.log(taskInput);
    return addApiTasks("matthijs", taskInput), (input.value = "");
  });
};
clickDelete = knop => {
  console.log("clickie");
  const id = knop.target.id;
  console.log(id);
  return DeleteApiTasks(id);
};

saveChange = knop => {
  console.log("checkie");
  const id = event.target.value;

  const newdescription = document.getElementById("p" + id).textContent;

  const checkBox = document.getElementById("c" + id);

  // console.log(newdescription);
  // console.log(id);
  const result = {
    description: newdescription,
    done: checkBox.checked
  };
  console.log("dit ben je nu aan het vesturer", result);
  return PutApiTasks(id, result);
};
changeClass = knop => {
  const id = event.target.value;
  const par = document.getElementById("p" + id);
  console.log(par);
  if (event.target.checked === true) {
    console.log("komen we hier");
    return par.classList.add("checked");
  } else {
    return par.classList.remove("checked");
  }
};

document.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  getTasks("matthijs");
  addTaskInputListener();
});
