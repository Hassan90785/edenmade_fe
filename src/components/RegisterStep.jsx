// RegisterStep.js

const RegisterStep = ({ onNext, onPrev }) => {
    // Implement your UI and logic for registering
    return (
        <div>
            <h1>Register</h1>
            {/* Your UI elements */}
            <button onClick={onPrev}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
};

export default RegisterStep;
