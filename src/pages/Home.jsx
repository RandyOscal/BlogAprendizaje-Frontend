import React, { useState } from "react";
import { useHome } from "../hooks/useHome.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const {
    publications,
    loading,
    error,
    searchByCategory,
    refresh,
  } = useHome();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategorySearch = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      refresh();
    } else {
      searchByCategory(category);
    }
  };

  const handleSelectPublication = (id) => {
    navigate(`/publications/list/${id}`);
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-3">
        <div className="bg-white p-4 rounded shadow mb-5 border border-dark">
          <h2 className="mb-4">Cursos</h2>
          <form onSubmit={handleCategorySearch} className="mb-4">
            <div className="input-group">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Todos los cursos</option>
                <option value="Taller III">Taller III</option>
                <option value="Tecnologia III">Tecnologia III</option>
                <option value="Practica Supervisada">Practica Supervisada</option>
              </select>
              <button
                className="btn btn-warning border-2 border-black"
                type="submit"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <p>Cargando publicaciones...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group mb-3">
                {publications.length > 0 ? (
                  publications.map((pub) => (
                    <li
                      key={pub._id}
                      className="list-group-item mt-3 border border-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectPublication(pub._id)}
                    >
                      {pub.title} - {new Date(pub.date).toLocaleDateString()}
                    </li>
                  ))
                ) : (
                  <p>No se encontraron publicaciones para esta categoría.</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
