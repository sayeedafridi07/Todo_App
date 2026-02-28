import { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { Plus } from 'lucide-react';
import Modal from './Modal';
import Form from './Form';
import axios from 'axios';
import Loader from './Loader';

const Foreground = () => {
  const ref = useRef(null);
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [frontCardId, setFrontCardId] = useState(null);

  const handleCardClick = (item) => {
    setSelectedTodo(item);
    setIsEditing(true);
    setFormData({
      title: item.title ?? '',
      description: item.description ?? '',
      isCompleted: item.isCompleted ?? false,
    });
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedTodo(null);
    setIsEditing(false);
    setFormData({ title: '', description: '', isCompleted: false });
    setShowModal(true);
  };

  // Add or update todo on modal close
  const handleModalClose = async () => {
    if (!formData.title.trim() && !formData.description.trim()) {
      setShowModal(false);
      setSelectedTodo(null);
      setIsEditing(false);
      return;
    }
    try {
      const url =
        isEditing && selectedTodo
          ? `http://localhost:3000/todo/${selectedTodo.id}`
          : 'http://localhost:3000/todo';
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      if (isEditing && selectedTodo) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === selectedTodo.id ? { ...todo, ...formData } : todo,
          ),
        );
      } else {
        setTodos((prev) => [...prev, response.data.data]);
      }
      setShowModal(false);
      setSelectedTodo(null);
      setIsEditing(false);
    } catch (error) {}
  };

  const handleDelete = () => {
    if (isEditing && selectedTodo) {
      setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodo.id));
    }
    setShowModal(false);
    setSelectedTodo(null);
    setIsEditing(false);
  };

  console.log('====================================');
  console.log('TODO:', todos, isFetching);
  console.log('====================================');

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const response = await axios.get('http://localhost:3000/todos');
        setTodos(response?.data?.data);
      } catch (error) {
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-20 h-full w-full overflow-y-auto">
      <div className="flex flex-wrap gap-10 p-5">
        {!isFetching
          ? todos?.map((item) => (
              <Card
                key={item.id}
                reference={ref}
                todo={item}
                onClick={handleCardClick}
                isFront={frontCardId === item.id}
                onFocus={() => setFrontCardId(item.id)}
              />
            ))
          : Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                className="h-72 w-64 animate-pulse rounded-3xl bg-zinc-500"
              />
            ))}
      </div>

      <button
        onClick={handleAddClick}
        className="group fixed right-10 bottom-10 cursor-pointer rounded-full bg-sky-500 p-4 hover:bg-sky-600 focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 active:bg-sky-700"
      >
        <Plus className="size-8 text-white" />
      </button>

      <Modal visible={showModal} onClose={handleModalClose}>
        <Form
          data={formData}
          isEditing={isEditing}
          setFormData={setFormData}
          onDelete={handleDelete}
        />
      </Modal>
    </div>
  );
};

export default Foreground;
