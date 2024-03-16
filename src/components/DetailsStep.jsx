// DetailsStep.js
import React from "react";

const DetailsStep = ({ onNext, onPrev }) => {
    // Implement your UI and logic for providing details
    return (
        <div>
            <h1>Details</h1>
            {/* Your UI elements */}
            <button onClick={onPrev}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
};

export default DetailsStep;
