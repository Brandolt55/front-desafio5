import { useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { LivrosService } from "../../api/LivrosService";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    titulo: "",
    paginas: "",
    isbn: "",
    editora: "",
  });

  async function createLivro() {
    try {
      const body = {
        titulo: livro.titulo,
        paginas: Number(livro.paginas),
        isbn: livro.isbn,
        editora: livro.editora,
      };

      if (
        livro.titulo &&
        livro.paginas &&
        livro.isbn &&
        livro.editora
      ) {
        await LivrosService.createLivro(body);
        alert("Livro cadastrado com sucesso!");
        setLivro({
          titulo: "",
          paginas: "",
          isbn: "",
          editora: "",
        });
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      alert("Erro ao cadastrar livro.");
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                id="titulo"
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
                id="num"
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
                id="isbn"
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
                id="editora"
                value={livro.editora}
                onChange={(event) =>
                  setLivro({ ...livro, editora: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={createLivro}>
                Cadastrar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
