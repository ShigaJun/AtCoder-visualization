import fetch from 'node-fetch';

export async function handler(event) {
  const user = event.queryStringParameters.user;

  try {
    const res = await fetch(`https://atcoder.jp/users/${user}/history/json`);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
