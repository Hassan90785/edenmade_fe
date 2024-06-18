// FAQ.jsx

import React from "react";

const faqData = [
    {
        question: "How do I place an order?",
        answer: "You can place an order by visiting our website and selecting your desired items.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, PayPal, and other common payment methods.",
    },
    {
        question: "Is there a minimum order size?",
        answer: "No, you can order as little or as much as you like.",
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive a tracking number via email.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer refunds within 30 days of purchase if you are not satisfied.",
    },
];

const FAQ = () => {
    return (
        <div className="container my-5 aj-drop-shadow background-white">
            <div className="row py-3">
                <div className="col">
                    <h1 className="text-center my-3 aj-site-logo">FAQ</h1>
                    <div className="accordion" id="accordionExample">
                        {faqData.map((faqItem, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${index}`}
                                    >
                                        {faqItem.question}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        {faqItem.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
