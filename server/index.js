const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

let todos = [];

function generateId() {
  return todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
}

app.get("/todos", (req, res) => {
  return res.json({
    status: true,
    message: "Todos fetched successfully",
    data: todos,
  });
});

app.get("/todos/:id", (req, res) => {
  const exisingTodo = todos.find((x) => x.id === id);
  if (!exisingTodo) {
    res.status(404).json({
      status: false,
      message: "Todo not found!",
    });
  }

  res.json({
    status: true,
    message: "Todo fetched successfully",
    data: exisingTodo,
  });
});

app.post("/todo", (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    res.status(400).json({
      status: false,
      message: "Invalid Input!",
    });
  }

  const newTodo = {
    id: generateId(),
    title,
    description,
    isCompleted: false,
  };

  todos.push(newTodo);

  res.json({
    status: true,
    message: "Todo Created Successfully!",
    data: newTodo,
  });
});

app.put("/todo/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!id) {
    res.status(400).json({
      status: false,
      message: "Please pass the id!",
    });
  }

  if (!title && !description) {
    res.status(400).json({
      status: false,
      message: "Invalid Input!",
    });
  }

  const exisingTodo = todos.find((x) => x.id === Number(id));

  if (!exisingTodo) {
    res.status(404).json({
      status: false,
      message: "Todo not found!",
    });
  }

  exisingTodo.title = title;
  exisingTodo.description = description;

  res.json({
    status: true,
    message: "Todo Updated Successfully",
  });
});

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const exisingTodo = todos.find((x) => x.id === Number(id));
  if (!exisingTodo) {
    return res.status(404).json({
      status: false,
      message: "Todo not found!",
    });
  }
  todos = todos.filter((t) => t.id !== Number(id));

  res.json({
    status: true,
    message: "Todo Deleted Successfully",
  });
});

app.patch("/todo/:id", (req, res) => {
  const { id } = req.params;
  const exisingTodo = todos.find((x) => x.id === Number(id));
  if (!exisingTodo) {
    return res.status(404).json({
      status: false,
      message: "Todo not found!",
    });
  }
  exisingTodo.isCompleted = true;

  res.json({
    status: true,
    message: "Todo Deleted Successfully",
  });
});

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
