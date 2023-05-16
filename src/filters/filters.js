export function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${padZero(date.getUTCHours() - 3)}:${padZero(
        date.getUTCMinutes()
    )} ${padZero(date.getUTCDate())}-${padZero(
        date.getUTCMonth() + 1
    )}-${date.getUTCFullYear()}`;
    return formattedDate;

    function padZero(number) {
        return String(number).padStart(2, "0");
    }
}

export default formatDate;
