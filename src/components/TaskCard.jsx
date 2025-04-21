import React, { useState } from 'react';
import '../css/TaskCard.css';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function TaskCard({ aim, isChecked, onDelete, onChecked, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAim, setEditedAim] = useState(aim);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedAim); 
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-card">
      <input
        className="task-state"
        type="checkbox"
        checked={isChecked}
        onChange={onChecked}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editedAim}
          onChange={(e) => setEditedAim(e.target.value)}
          className="task-aim-edit"
          autoFocus
        />
      ) : (
        <div className={`task-aim ${isChecked ? 'line-through' : ''}`}>
          {aim}
        </div>
      )}

      <div className="task-buttons">
        <button className={`edit-button ${isEditing ? 'save-button' : ''}`} onClick={handleEdit}>
          {isEditing ? (
            "Save"
          ) : (
            <FiEdit2 size={18} />
          )}
        </button>

        <button className="delete-button" onClick={onDelete}>
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

