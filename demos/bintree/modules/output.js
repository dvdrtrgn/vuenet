function cleanSoft(str) {
  return str.replaceAll('"', '');
}

function cleanHard(str) {
  return str.replaceAll('"', '').replaceAll(/\n\D+\n/g, '\n');
}

function print(id, obj, nom) {
  const ele = document.querySelector('#' + id);
  let str = JSON.stringify(obj, null, 2);

  str = id === 'C' ? cleanHard(str) : cleanSoft(str);
  ele.innerText = `${id}-${nom} ${str}`;
}

function output(root, id, fn) {
  const temp = fn(root);
  const name = fn.name;

  print(id, temp, name);

  console.log({ [name]: temp });
}

export default output;
