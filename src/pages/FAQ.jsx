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
    {
        question: "What is your return policy?",
        answer: "Our return policy allows returns within 30 days of receiving your order.",
    },
    {
        question: "How can I contact customer support?",
        answer: "You can contact our customer support via email at support@ourwebsite.com or by calling 123-456-7890.",
    },
    {
        question: "Can I change or cancel my order?",
        answer: "Yes, you can change or cancel your order within 24 hours of placing it.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we only offer shipping within the United States.",
    },
    {
        question: "Are your products gluten-free?",
        answer: "Yes, we offer a range of gluten-free products. Please check the product description for more details.",
    },
    {
        question: "How do I apply a discount code?",
        answer: "You can apply a discount code at checkout. Simply enter the code in the designated field and click 'Apply'.",
    },
    {
        question: "Do you offer gift cards?",
        answer: "Yes, we offer gift cards that can be purchased on our website.",
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
