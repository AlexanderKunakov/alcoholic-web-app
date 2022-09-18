export function epochToDate(epoch: number): string {
    return new Date(epoch).toLocaleString(navigator.language, {hour12: false})
}

export function epochToRuDate(epoch: number): string {
    return new Date(epoch).toLocaleString(
        "ru-RU",
        {
            hour12: false,
            timeStyle: "short",
            dateStyle: "medium"
        }
    )
}

export const yyyymmddthhMm = "YYYY-MM-DDTHH:mm";
