import fetch from 'node-fetch';

export async function handler(event) {
  const { user, api } = event.queryStringParameters;

  if (!user || !api) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required query parameters: user or api" }),
    };
  }

  let url;
  try {
    if (api === "history") {
      url = `https://atcoder.jp/users/${user}/history/json`;
      const res = await fetch(url);
      const data = await res.json();

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ratingData: data }),
      };
    }

    if (api === "submissions") {
      const allSubmissions = [];
      let from = 0;
      const limit = 500;
      let hasMore = true;

      while (hasMore) {
        const url = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${user}&from_second=${from}`;
        const res = await fetch(url);
        const data = await res.json();

        allSubmissions.push(...data);

        if (data.length < limit) {
          hasMore = false;
        } else {
          from = data[data.length - 1].epoch_second + 1;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionData: allSubmissions }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid API type. Use 'history' or 'submissions'." }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
