const NOTES = 'A AB B C CD D DE E F FG G GA'.split(' ');
const SHARP = !true;
const SYMBOL = {
  sharp: '♯',
  flat: '♭',
  natural: '♮',
};

function freqFromMidi(midi) {
  return Math.round(2 ** ((midi - 69) / 12) * 440);
}

function octaveFromMidi(midi) {
  return Math.floor((midi - 12) / 12);
}

function nameFromMidi(midi) {
  return NOTES[(midi - 21) % 12];
}

function asSharp(str) {
  return str.length > 1 ? str[0] + SYMBOL.sharp : str[0];
}

function asFlat(str) {
  return str.length > 1 ? str[1] + SYMBOL.flat : str[0];
}

function normalize(num) {
  let norm = num;
  if (num < 21) norm = 21; else if (num > 128) norm = 128;
  if (norm !== num) console.warn(`Normalizing ${num} to ${norm}`);
  return Math.round(norm);
}

function makeNote(num) {
  const midi = normalize(num);
  const name = nameFromMidi(midi);

  return {
    name: SHARP ? asSharp(name) : asFlat(name),
    octave: octaveFromMidi(midi),
    frequency: freqFromMidi(midi),
    midi,
    // asSharp: asSharp(name),
    // asFlat: asFlat(name),
  };
}

export default makeNote;

/*

*/
