export const getDate = createdAt => {
    const date = new Date(createdAt);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const month = monthNames[date.getUTCMonth()];
    return `${day} ${month} ${year}`;
};

// Function to get formatted time in 12-hour format - e.g. "02:15 PM"
export const getTime = createdAt => {
    const date = new Date(createdAt);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // hour 0 should be 12
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const hoursStr = hours < 10 ? "0" + hours : hours;
    return `${hoursStr}:${minutesStr} ${ampm}`;
};

