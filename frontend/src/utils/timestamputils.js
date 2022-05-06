export const tsFormat = (ts) => {
    const min = Math.floor(ts / 60);
    const sec = ("0" + (ts - (min * 60))).slice(-2)
    return `${min}:${sec}`;
}
