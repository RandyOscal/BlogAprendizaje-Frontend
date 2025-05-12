import { useState, useEffect, useCallback } from "react";
import { getAllPublicates, getByCategoryPublicates } from "../services/api.jsx";

export const useHome = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllPublicates();
      if (response.error) {
        throw new Error("Error al cargar las publicaciones");
      }
      setPublications(response.data.publications || []);
    } catch (err) {
      setError(err.message || "Hubo un error al cargar las publicaciones.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCategory = useCallback(
    async (categoryName) => {
      if (!categoryName.trim()) {
        fetchPublications();
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await getByCategoryPublicates(categoryName.trim());
        if (response.error) {
          throw new Error("Error al cargar las publicaciones por categoría");
        }
        setPublications(response.data.publications || []);
      } catch (err) {
        setError(err.message || "Hubo un error al cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    },
    [fetchPublications]
  );

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return {
    publications,
    loading,
    error,
    searchByCategory: fetchByCategory,
    refresh: fetchPublications,
  };
};
