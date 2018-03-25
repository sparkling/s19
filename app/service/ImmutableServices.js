export function updateObjectInArray(array, id, property, value) {
  return array.map((item) => {
    if (item.get('id') !== id) {
      return item;
    }
    return item.set(property, value);
  });
}

export function removeMatchingItem(array, property, value) {
  return array.filter((item) => item.get(property) !== value);
}
