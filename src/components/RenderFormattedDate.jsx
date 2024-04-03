import React from "react";

export const renderFormattedDate = (dateString) => {
    function formatDate(dateString) {
        if (!dateString) return null; // Handle null or undefined cases

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null; // Handle invalid date string

        const options = {weekday: 'short', month: 'short', day: 'numeric'};
        const formattedDate = date.toLocaleString('default', options);
        const parts = formattedDate.split(' '); // Split the date into parts
        const day = parseInt(parts[2]); // Extract the day part and parse it
        const suffixDay = addSuffix(day); // Add suffix to the day part
        parts[2] = suffixDay; // Replace the original day part with the suffixed one
        return parts.join(' '); // Join the parts back into a formatted date
    }

    const formattedDate = formatDate(dateString);
    if (!formattedDate) return null; // Handle null or invalid date string

    return (
        <>
            <span className={'mr-3'}>{formattedDate}</span>
        </>
    );
};
export const addSuffix = (day) => {
    if (!day || isNaN(day)) return ""; // Handle invalid day
    if (day >= 11 && day <= 13) {
        return `${day}th`;
    } else if (day % 10 === 1) {
        return `${day}st`;
    } else if (day % 10 === 2) {
        return `${day}nd`;
    } else if (day % 10 === 3) {
        return `${day}rd`;
    } else {
        return `${day}th`;
    }
};
