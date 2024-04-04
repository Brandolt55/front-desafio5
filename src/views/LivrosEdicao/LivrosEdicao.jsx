import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";

const LivrosEdicao = () => {
  const { livroId } = useParams();

  const [livro, setLivro] = useState({
    titulo: "",
    paginas: "",
    isbn: "",
    editora: "",
  });

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro(data.resposta);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      alert("Erro ao buscar livro.");
    }
  }

  async function editLivro() {
    try {
      const body = {
        titulo: livro.titulo,
        paginas: Number(livro.paginas),
        isbn: livro.isbn,
        editora: livro.editora,
      };

      await LivrosService.updateLivro(livroId, body);
      alert("Livro atualizado com sucesso!");
      // Atualiza os dados do livro após a edição
      getLivro();
    } catch (error) {
      console.error("Erro ao editar livro:", error);
      alert("Erro ao editar livro.");
    }
  }

  useEffect(() => {
    getLivro();
  }, [livroId]);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                value={livro.titulo}
                onChange={(event) =>
                  setLivro({ ...livro, titulo: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                value={livro.paginas}
                onChange={(event) =>
                  setLivro({ ...livro, paginas: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                value={livro.isbn}
                onChange={(event) =>
                  setLivro({ ...livro, isbn: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                value={livro.editora}
                onChange={(event) =>
                  setLivro({ ...livro, editora: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={editLivro}>
                Atualizar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
