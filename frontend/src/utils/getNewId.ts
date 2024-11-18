type WithId = { id: number };

const getNewId = <T extends WithId>(data: T[]): number => {
  var maxId = -1;
  data.forEach((d) => {
    if (d.id > maxId) {
      maxId = d.id;
    }
  });
  return maxId + 1;
};
export default getNewId;
