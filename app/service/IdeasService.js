export function parseDatesShallow(ideas) {
  return ideas ? ideas.map((idea) => (parseDateShallow(idea))) : null;
}

export function parseDateShallow(idea) {
  return idea ? {
    ...idea,
    createdOn: idea.createdOn ? new Date(idea.createdOn) : null,
  }
  : null;
}
