const ConvertDta = (data, type) => {
  const convertNewData = data[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1],
    };
  });
  return convertNewData;
};
export { ConvertDta };
