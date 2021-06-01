/* eslint-disable no-underscore-dangle */
const GLOB = globalThis.glob;
const [R, G, B, K] = ['color:red', 'color:green', 'color:blue', 'color:black'];

function logPrices(obj) {
  if (GLOB.log_pause) return;
  GLOB.log_pause = true;

  const _sales = obj.sale ? `%c/$${obj.sale}%c` : '%c%c';
  const _normal = `%c${obj.count}%c @ %c$${obj.price}${_sales}`;

  console.log(`${_normal} = total %c$${obj.total}`, G, K, G, R, K, B);
  if (GLOB.log_spacer) console.log(' ');

  GLOB.log_pause = false;
}

export default logPrices;
