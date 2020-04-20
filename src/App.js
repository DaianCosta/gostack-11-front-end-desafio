import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const name = `novo projeto ${Date.now()}`;
    //setrepositories([...repositories, `novo projeto ${Date.now()}`]);
    const response = await api.post("/repositories", {
      title: name,
      owner: "daian",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleAddRepository() {
    // TODO
    const name = `novo repository ${Date.now()}`;
    //setProjects([...projects, `novo projeto ${Date.now()}`]);
    const response = await api.post("/repositories", {
      title: name,
      url: "http://github.com/DaianCosta",
      techs: ["Node.js", "php", "c#"],
      likes: 0,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
