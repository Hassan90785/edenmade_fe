// Reusable input component with validation
export const ValidatedInput = ({id, name, placeholder, value = '', onChange, inputType}) => {
    const handleChange = (event) => {
        const inputValue = event.target.value;
        // Perform validation based on the input type
        if (inputType === 's') {
            // Allow only string characters
            onChange(inputValue.replace(/[^a-zA-Z ]/g, ''));
        } else if (inputType === 'a') {
            // Allow alphanumeric characters
            onChange(inputValue.replace(/[^a-zA-Z0-9 ]/g, ''));
        } else if (inputType === 'n') {
            // Allow only numbers
            onChange(inputValue.replace(/\D/g, ''));
        } else {
            // Default: allow all characters
            onChange(inputValue);
        }
    };

    return (
        <input
            required
            type="text" // For simplicity, let's keep the input type as text
            id={id}
            name={name}
            placeholder={placeholder}
            className="form-control mb-3"
            value={value}
            onChange={handleChange}
        />
    );
};
