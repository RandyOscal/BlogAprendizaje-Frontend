import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { usePublicationDetails } from "../hooks/usePublicationDetails.jsx";

export const PublicationDetails = () => {
const { id } = useParams();
const navigate = useNavigate();
const { publication, loading, error, addComment, refresh } = usePublicationDetails(id);

const [commentForm, setCommentForm] = useState({
    username: "",
    description: "",
});

const handleInputChange = (e) => {
    setCommentForm({
    ...commentForm,
    [e.target.name]: e.target.value,
    });
};

const handleSubmitComment = async (e) => {
    e.preventDefault();
    const data = {
    publicationId: id,
    username: commentForm.username,
    description: commentForm.description,
    };

    await addComment(data, () => {
    setCommentForm({ username: "", description: "" });
    refresh();
    });
};

if (loading) return <p>Cargando detalles...</p>;
if (error) return <p>Error: {error}</p>;

return (
    <><Navbar />
    <div className="container mt-5">
        <button
    className="btn btn-secondary mt-3"
    onClick={() => navigate("/")}
    >
    ← Volver al Inicio
    </button>
    {publication ? (
        <div className="card mt-3">
        <div className="card-body">
            <h5 className="card-title">{publication.title}</h5>
            <p className="card-text">
            <strong>Categoría:</strong>{" "}
            {publication.category ? publication.category.categoryName : "Sin categoría"}
            </p>
            <p className="card-text">
            <strong>Descripción:</strong> {publication.description}
            </p>

            {publication.files?.length > 0 && (
            <div>
                <h6>Archivos adjuntos:</h6>
                <ul>
                {publication.files.map((file) => (
                    <li key={file.filename}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.filename}
                    </a>
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>

        <div className="card-footer">
            <h5>Comentarios:</h5>
            <ul className="list-group">
            {Array.isArray(publication.comments) && publication.comments.length > 0 ? (
                publication.comments.map((comment) => (
                <li key={comment._id} className="list-group-item">
                    <strong>{comment.username}:</strong> {comment.description}
                </li>
                ))
            ) : (
                <li className="list-group-item">No hay comentarios aún.</li>
            )}
            </ul>
        </div>
        </div>
    ) : (
        <p>Cargando detalles...</p>
    )}

    <form onSubmit={handleSubmitComment} className="mt-4">
        <div className="mb-3">
            <h4>Agrega un comentario</h4>
        <input
            type="text"
            name="username"
            value={commentForm.username}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Tu nombre"
            required
        />
        </div>
        <div className="mb-3">
        <textarea
            name="description"
            value={commentForm.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Escribe tu comentario"
            rows="3"
            required
        ></textarea>
        </div>
        <button className="btn btn-primary" disabled={loading}>
        {loading ? "Enviando..." : "Enviar comentario"}
        </button>
    </form>
    </div>
    </>
);
};
