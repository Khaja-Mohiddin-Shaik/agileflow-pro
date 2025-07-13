export const validateTask = (formData) => {
  const errors = {};

  // Title validation
  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  } else if (formData.title.length > 100) {
    errors.title = 'Title must be 100 characters or less';
  }

  // Assignee validation
  if (!formData.assignee.trim()) {
    errors.assignee = 'Assignee is required';
  } else if (formData.assignee.length > 100) {
    errors.assignee = 'Assignee must be 100 characters or less';
  }

  // Due date validation
  if (formData.dueDate) {
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate <= today) {
      errors.dueDate = 'Due date must be in the future';
    }
  }

  return errors;
};

export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0;
};