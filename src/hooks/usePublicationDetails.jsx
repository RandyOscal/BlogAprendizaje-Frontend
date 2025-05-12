import { useState, useEffect, useCallback } from "react";
import { getPublicationDetails, createComment } from "../services/api.jsx";

export const usePublicationDetails = (id) => {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPublicationDetails = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getPublicationDetails(id);
      if (response.error) {
        throw new Error("Error al cargar los detalles de la publicación");
      }
      setPublication(response.data.publications); 
    } catch (err) {
      setError(err.message || "Hubo un error al cargar los detalles.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const addComment = async (data, onSuccess, onError) => {
    setLoading(true);
    try {
      const response = await createComment(data);
      if (response.error) {
        throw new Error("Error al agregar el comentario");
      }
      setPublication((prev) => ({
        ...prev,
        comments: [...prev.comments, response.data.comment],
      }));
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError(err.message || "Hubo un error al agregar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicationDetails();
  }, [fetchPublicationDetails]);

  return {
    publication,
    loading,
    error,
    addComment,
    refresh: fetchPublicationDetails,
  };
};
