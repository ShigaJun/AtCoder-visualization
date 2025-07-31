export async function fetchUserData(userName, apiType) {
  const response = await fetch(
    `/.netlify/functions/atcoder-user-data?user=${userName}&api=${apiType}`
  );
  const data = await response.json();
  return data;
}