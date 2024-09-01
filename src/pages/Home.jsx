import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const response = await fetch(`${server}/task/${id}`, {
        method: 'PUT',
        credentials: 'include', // This will include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
      } else {
        throw new Error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`${server}/task/${id}`, {
        method: 'DELETE',
        credentials: 'include', // This will include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
      } else {
        throw new Error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${server}/task/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This will include cookies in the request
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        setDescription("");
        toast.success(data.message);
        setRefresh((prev) => !prev);
      } else {
        throw new Error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${server}/task/my`, {
          credentials: 'include', // This will include cookies in the request
        });

        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks);
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTasks();
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
