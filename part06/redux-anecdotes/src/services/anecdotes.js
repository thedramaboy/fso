const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  return await response.json();
};

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  });

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const updateVote = async (anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changedAnecdote),
  });

  if (!response.ok) {
    throw new Error("Failed to vote selected anecdote");
  }

  return await response.json();
};

export default { getAll, createNew, updateVote };
