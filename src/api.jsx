export async function fetchHistory(userName) {
    const response = await fetch(
        `/.netlify/functions/atcoder-history?user=${userName}`
    );
    const data = await response.json();
    return data;
}