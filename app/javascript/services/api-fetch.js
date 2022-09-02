
export default async function apiFetch(base_url, endpoint , turbo, { method, headers, body } = {} ){

  if(body) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    }
  }

  const config = {
    method: method || (body ? "POST" : "GET"),
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${base_url}/${endpoint}`, config);
  
  let data;
  if (!response.ok) {
    console.log("Error Response");
    data = response.status;
    return data;
  }
  if (!turbo) {
    console.log("JSON Response");
    data = await response.json();
    return data;
  }
  console.log("Turbo Stream Response");
  data = await response.text();  
  return data;
}