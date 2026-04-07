export const formatTime = (time) => {
    const formatTime = new Date(time);

    return formatTime.toLocaleTimeString("en-In", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
};