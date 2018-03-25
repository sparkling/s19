import request from 'utils/request';

const BASE_API_URL = 'http://localhost:3000';

const fetchIdeasUrl = `${BASE_API_URL}/ideas`;
const newIdeaUrl = `${BASE_API_URL}/ideas/new`;
const updateIdeaUrl = `${BASE_API_URL}/idea/update`;
const deleteIdeaUrl = `${BASE_API_URL}/idea/delete`;

function getHeaders() {
  const headers = new Headers();
  headers.append('cache-control', 'no-cache');
  headers.append('content-type', 'application/json; charset=utf-8');
  return headers;
}

export function fetchIdeas() {
  const headers = getHeaders();
  return request(
    fetchIdeasUrl,
    { headers }
  );
}

export function newIdea() {
  const headers = getHeaders();
  return request(
    newIdeaUrl,
    { headers }
  );
}

export function saveIdea(idea) {
  const headers = getHeaders();
  return request(
    updateIdeaUrl,
    {
      headers,
      method: 'POST',
      body: JSON.stringify(idea),
    }
  );
}

export function deleteIdea(id) {
  const headers = getHeaders();
  return request(
    deleteIdeaUrl,
    {
      headers,
      method: 'POST',
      body: JSON.stringify({ id }),
    },
  );
}
