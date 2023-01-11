import { useState } from "react";
import gitLogo from "../assets/github.png";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import { api } from "../services/api";

import { Container } from "./styles";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  let [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    if (currentRepo === "") {
      return alert('Adicione o link do repositório');
    }
    const { data } = await api.get(`repos/${currentRepo}`);

    if (!data.id) {
      return alert("Repositório não encontrado");
    }

    const isExist = !!repos.find(repo => repo.id === data.id);
    console.log(isExist);
    if (isExist) {
      return alert("Repositorio já incluso");
    }
    setRepos((prev) => [...prev, data]);
    setCurrentRepo("");
  };

  const handleRemoveRepo = (id) => {
    const itemRemoved = repos.filter((item) => item.id !== id);
    setRepos(itemRemoved);
    console.log("Removendo registro", id, repos);

  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo
          handleRemoveRepo={handleRemoveRepo}
          repo={repo}
          key={repo.id}
        />
      ))}
    </Container>
  );
}

export default App;
