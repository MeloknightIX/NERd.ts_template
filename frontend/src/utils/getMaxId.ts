type WithId = { id: number };

const getMaxId = <T extends WithId>(data: T[]): number => {
  var maxId = -1;
  data.forEach((d) => {
    if (d.id > maxId) {
      maxId = d.id;
    }
  });
  return maxId;
};
export default getMaxId;
