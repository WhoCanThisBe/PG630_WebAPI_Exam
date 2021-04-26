export async function postJSON(url, json) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });

  resultCheck(response, url);

  return await response.json();
}

export async function post(url, json = null) {
  const standardInitOpts = {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    url,
    json ? standardInitOpts : { method: "POST" }
  );

  resultCheck(response, url);
  return response.status;
}

export async function fetchJson(url) {
  const response = await fetch(url);
  resultCheck(response, url);
  return await response.json();
}

const resultCheck = (res, url) => {
  if (!res.ok) {
    throw new HttpExceptionCode(res, url);
  }
};

//TODO: are we using this function
export class HttpExceptionCode extends Error {
  constructor(res, url) {
    super(`Loading error for ${url}: ${res.status} ${res.statusText}`);
    // By setting the name-property on the error, we get the name of our own Error-class (HttpExceptionCode) -
    // in the thrown error, instead of "Error: "...
    this.name = HttpExceptionCode.name;
    this.status = res.status;
  }
}
