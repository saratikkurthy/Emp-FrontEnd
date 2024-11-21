import React, { useState } from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;