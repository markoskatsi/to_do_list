import React, { useState } from 'react';
import '../css/TaskCard.css'

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
        />
      ) : (
        <div className={`task-aim ${isChecked ? 'line-through' : ''}`}>
          {aim}
        </div>
      )}

      <div className="task-buttons">
        <button className="edit-button" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>

        <button 
          className="delete-button"
          onClick={onDelete} 
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

