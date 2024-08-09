import {useState} from "react";
import {contactUs} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";

export default function Contactus() {
    const [name, setName] = useState(""); // Initialize state for name input
    const [email, setEmail] = useState(""); // Initialize state for email input
    const [message, setMessage] = useState(""); // Initialize state for message input

    const handleNameChange = (event) => {
        setName(event.target.value); // Update name state when input value changes
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Update email state when input value changes
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value); // Update message state when input value changes
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you would typically handle form submission, e.g., send data to a backend or display a success message
        const resp = await contactUs({name, email, message});
        if (resp && resp.status === 1) {
            toast.success(`Message Sent! We'll get back to you ASAP!`);
            setName("");
            setEmail("");
            setMessage("");
        }

    };

    return (
        <div className="bg-doodle py-md-5 py-3 d-flex justify-content-center align-items-center min-height-600">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="row my-3 text-center">
                            <div className="col">
                                <h1 className="aj-site-logo">Contact Us</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        className="form-control mb-3"
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className="form-control mb-3"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Your Message"
                                        className="form-control mb-3"
                                        rows="5"
                                        value={message}
                                        onChange={handleMessageChange}
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="btn btn-primary aj-button body-text-small fw-700 w-100 px-5"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
