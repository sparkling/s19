import { parseDatesShallow } from 'service/IdeasService';

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

export function replaceCacheObject(key, items, newItem) {
  setItem(key, items.map((item) => (item.id === newItem.id) ? newItem : item));
}

export function saveIdea(idea) {
  const ideas = getItem(IDEAS);
  if (ideas && idea) {
    replaceCacheObject(IDEAS, ideas, idea.toJS());
  }
}
export function addIdea(idea) {
  const ideas = getItem(IDEAS);
  if (ideas) {
    ideas.push(idea);
    setItem(IDEAS, ideas);
  }
}

export function removeIdea(id) {
  const ideas = getItem(IDEAS);
  if (ideas) {
    setItem(IDEAS, ideas.filter((idea) => idea.id !== id));
  }
}

export function setIdeas(ideas) {
  setItem(IDEAS, ideas);
}

export function getIdeas() {
  return parseDatesShallow(getItem(IDEAS));
}
