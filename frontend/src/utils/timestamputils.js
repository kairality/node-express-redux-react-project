export const tsFormat = (ts) => {
    const min = Math.floor(ts / 60);
    const sec = ts - (min * 60);
    return `${min}:${sec}`;
}
