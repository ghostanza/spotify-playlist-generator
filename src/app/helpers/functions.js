module.exports.arrayOfObjectsContains = (array, key, value) => {
  let found = false,
      index = -1,
      item = {};
  for(let i = 0; i < array.length; i++){
    if(array[i][key] == value){
      found = true;
      index = i;
      item = array[i];
      break;
    }
  }

  return [found, index, item];
}
