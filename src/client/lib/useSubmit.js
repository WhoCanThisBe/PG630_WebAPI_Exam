import { useState } from "react";

export const useSubmit = (submitFunction, onsubmitSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(undefined);
    try {
      await submitFunction();
      onsubmitSuccess();
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, error };
};
