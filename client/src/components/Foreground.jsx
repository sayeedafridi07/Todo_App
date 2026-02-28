import { useRef, useState } from 'react';
import Card from './Card';
import { Plus } from 'lucide-react';
import Modal from './Modal';
import Form from './Form';

const Foreground = () => {
  const ref = useRef(null);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'hello',
      description: 'testing',
      isCompleted: true,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });

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
  const handleModalClose = () => {
    if (!formData.title.trim() && !formData.description.trim()) {
      setShowModal(false);
      setSelectedTodo(null);
      setIsEditing(false);
      return;
    }
    if (isEditing && selectedTodo) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === selectedTodo.id ? { ...todo, ...formData } : todo,
        ),
      );
    } else {
      setTodos((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }
    setShowModal(false);
    setSelectedTodo(null);
    setIsEditing(false);
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
  console.log('TODO:', todos);
  console.log('====================================');

  return (
    <div ref={ref} className="fixed inset-0 z-20 h-full w-full">
      <div className="flex flex-wrap gap-10 p-5">
        {todos?.map((item) => (
          <Card
            key={item.id}
            reference={ref}
            todo={item}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <button
        onClick={handleAddClick}
        className="group absolute right-10 bottom-10 cursor-pointer rounded-full bg-sky-500 p-4 hover:bg-sky-600 focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 active:bg-sky-700"
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
