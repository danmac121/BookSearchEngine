const graphqlRequest = (body, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch('/graphql', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });
};
export const getMe = (token) => {
  return fetch('/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
     
    },
  });
};

export const createUser = ({ username, email, password }) => {
  return fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
};

export const loginUser = ({ email, password }) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const saveBook = (bookData, token) => {
  return fetch('/api/users/books', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    
    },
    body: JSON.stringify(bookData),
  });
};

export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      
    },
  });
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};