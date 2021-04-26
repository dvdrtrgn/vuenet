const NOTES = 'A AB B C CD D DE E F FG G GA'.split(' ');
const FLAT = true;
const SYMBOL = {
  sharp: '♯',
  flat: '♭',
  natural: '♮',
};
const MIN = 12;
const MAX = 120;

function freqFromMidi(midi) {
  return (2 ** ((midi - 69) / 12) * 440).toPrecision(4);
}

function octaveFromMidi(midi) {
  return Math.floor((midi - 12) / 12);
}

function nameFromMidi(midi) {
  return NOTES[(midi + 3) % 12];
}

function asSharp(str) {
  return str.length > 1 ? str[0] + SYMBOL.sharp : str[0] + SYMBOL.natural;
}

function asFlat(str) {
  return str.length > 1 ? str[1] + SYMBOL.flat : str[0] + SYMBOL.natural;
}

function normalize(num) {
  let norm = num;
  if (num < MIN) norm = MIN; else if (num > MAX) norm = MAX;
  if (norm !== num) console.warn(`Normalizing ${num} to ${norm}`);
  return Math.round(norm);
}

function makeNote(num) {
  const midi = normalize(num);
  const name = nameFromMidi(midi);

  return {
    name: makeNote.flat ? asFlat(name) : asSharp(name),
    octave: octaveFromMidi(midi),
    frequency: freqFromMidi(midi),
    midi,
    // asSharp: asSharp(name),
    // asFlat: asFlat(name),
  };
}

makeNote.min = MIN;
makeNote.max = MAX;
makeNote.flat = FLAT;
makeNote.symbol = SYMBOL;

export default makeNote;

/*

*/
