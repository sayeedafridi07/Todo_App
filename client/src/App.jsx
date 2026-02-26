import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(false);
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    setIsSubmitting(true);
    const url = editId
      ? `http://localhost:3000/todo/${editId}`
      : "http://localhost:3000/todo";
    fetch(url, {
      method: editId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          // const newTodo = todos.map((x) => {
          //   if (x.id === editId) {
          //     // x.title = title;
          //     // x.description = description;
          //     // this is the wrong way to update the state as we are mutating the state directly, we should create a new object instead of mutating the existing one
          //     return { ...x, title: title, description: description };
          //   }
          //   return x;
          // });
          const newTodo = todos.map((x) =>
            x.id === editId ? { ...x, title, description } : x,
          );
          setTodos(newTodo);
          setEditId(null);
        } else {
          setTodos((prev) => [data.data, ...prev]);
        }
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.log("error", error.message))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const getTodos = () => {
    setIsFetching(true);
    fetch("http://localhost:3000/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete todos");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data.data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const deleteTodo = (id) => {
    setDeletingId(id);
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        return res.json();
      })
      .then((data) => {
        const newTodos = todos.filter((x) => x.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  const markAsCompleted = (id) => {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to mark todo as completed");
        }
        return res.json();
      })
      .then((data) => {
        const newTodo = todos.map((x) => {
          if (x.id === id) {
            // x.isCompleted = true; // this is the wrong way to update the state as we are mutating the state directly, we should create a new object instead of mutating the existing one
            return { ...x, isCompleted: true };
          }
          return x;
        });
        setTodos(newTodo);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/todos");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch todos");
    //     }
    //     const data = await response.json();
    //     setTodos(data.data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // })();
    getTodos();
  }, []);

  return (
    <div className="mt-12 max-w-xl mx-auto">
      <div>
        <h1 className="text-3xl font-semiBold italic mb-4">Todos</h1>
        <div className="flex flex-col space-y-2 border border-gray-200 p-4 rounded-xl shadow mb-8">
          <label>Title</label>
          <input
            className="border border-sky-500 rounded-xl p-2 font-medium"
            value={title}
            placeholder="title here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            className="border border-sky-500 rounded-xl p-2 font-medium"
            value={description}
            placeholder="description here"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-center space-x-4 mt-4">
            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  setTitle("");
                  setDescription("");
                }}
                className="flex-1 cursor-pointer disabled:cursor-not-allowed border border-sky-500 rounded-full py-3 text-sky-500 font-bold"
              >
                Cancel
              </button>
            )}
            <button
              disabled={!title || !description || isSubmitting}
              onClick={addTodo}
              className="flex-1 cursor-pointer disabled:cursor-not-allowed bg-sky-500 rounded-full py-3 text-white font-bold"
            >
              {isSubmitting
                ? "Processing"
                : editId
                  ? "Update Todo"
                  : "Add Todo"}
            </button>
          </div>
        </div>
        {isFetching ? (
          <div className="text-center">Fetching...</div>
        ) : (
          <div className="space-y-4">
            {todos.map((x, i) => {
              return (
                <div key={i} className="shadow rounded-2xl p-4">
                  <h1>{x.title}</h1>
                  <p>{x.description}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={() => {
                        setEditId(x.id);
                        setTitle(x.title);
                        setDescription(x.description);
                      }}
                      className="cursor-pointer text-sky-400 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      disabled={deletingId}
                      onClick={() => deleteTodo(x.id)}
                      className="cursor-pointer text-red-500 font-bold"
                    >
                      Delete
                    </button>
                    {!x.isCompleted && (
                      <button
                        onClick={() => markAsCompleted(x.id)}
                        className="cursor-pointer text-green-500 font-bold"
                      >
                        Mark as completed
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
