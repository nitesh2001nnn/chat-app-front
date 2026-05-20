export const formatTime = (time) => {
    const formatTime = new Date(time);

    return formatTime.toLocaleTimeString("en-In", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
};

export const getRemainingSeconds = (dbTime: any) => {
    const targetTime = new Date(dbTime).getTime();
    const currentTime = Date.now();

    const diff = Math.floor(
        (targetTime - currentTime) / 1000
    );

    return diff > 0 ? diff : 0;
};