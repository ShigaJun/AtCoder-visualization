import fetch from 'node-fetch';

export async function handler(event) {
  const { user, api, from_second } = event.queryStringParameters;

  if (!user || !api) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required query parameters: user or api" }),
    };
  }

  let url;
  if (api === "history") {
    url = `https://atcoder.jp/users/${user}/history/json`;
  } else if (api === "submissions") {
    const from = from_second || 0;
    url = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${user}&from_second=${from}`;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid API type. Use 'history' or 'submissions'." }),
    };
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    let responseBody;
    if (api === "history") {
      responseBody = { ratingData: data };
    } else {
      responseBody = { submissionData: data };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
