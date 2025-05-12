import { useState } from "react";
import { createComment } from "../services/api.jsx";

export const useComments = () => {
const [loading, setLoading] = useState(false);

const addComment = async (form, onSuccess, onError) => {
    setLoading(true);

    try {
    const response = await createComment(form);

    if (response.error) {
        if (onError) onError(response.e?.message || "Error al crear el comentario");
    } else {
        if (onSuccess) onSuccess(response.data);
    }
    } catch (error) {
    if (onError) onError("Error en la solicitud");
    } finally {
    setLoading(false);
    }
};

return {
    addComment,
    loading,
};
};
