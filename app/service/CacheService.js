
export const IDEAS = 'ideas';

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function getItem(key) {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export function updateCache(key, items, id, property, value) {
  items.forEach((item) => {
    if (item.id === id) {
      /* eslint-disable no-param-reassign */
      item[property] = value;
    }
  });
  setItem(key, items);
}

export function updateIdea(id, property, value) {
  console.log('updateIdea')
  const ideas = getItem(IDEAS);
  if (ideas) {
    updateCache(IDEAS, ideas, id, property, value);
  }
}
export function addIdea(idea) {
  console.log('addIdea')
  const ideas = getItem(IDEAS);
  if (ideas) {
    ideas.push(idea);
    setItem(IDEAS, ideas);
  }
}

export function removeIdea(id) {
  console.log('removeIdea')
  const ideas = getItem(IDEAS);
  if (ideas) {
    setItem(IDEAS, ideas.filter((idea) => idea.id !== id));
  }
}

export function setIdeas(ideas) {
  console.log('setIdeas')
  setItem(IDEAS, ideas);
}

export function getIdeas() {
  console.log('getIdeas')
  return getItem(IDEAS);
}
