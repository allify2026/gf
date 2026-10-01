/**
 * Gentle Web Audio Synthesizer for cute sound effects and soft lofi melody
 */

let audioCtx: AudioContext | null = null;
let isLofiPlaying = false;
let lofiInterval: ReturnType<typeof setInterval> | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a cute soft chime when clicking buttons or hearts
 */
export function playCutePopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency slide for a cute "bubble pop" sound
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

/**
 * Play a romantic harp flourish when opening the love letter or redeeming a coupon
 */
export function playRomanticHarp() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // C Major 7 notes: C5, E5, G5, B5, C6
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.65);
    });
  } catch {
    // Fallback
  }
}

/**
 * Gentle dreamy background lofi chords (Looping romantic synthesizer)
 */
export function toggleBackgroundMusic(onStateChange?: (playing: boolean) => void): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isLofiPlaying) {
    if (lofiInterval) {
      clearInterval(lofiInterval);
      lofiInterval = null;
    }
    isLofiPlaying = false;
    onStateChange?.(false);
    return false;
  }

  isLofiPlaying = true;
  onStateChange?.(true);

  // Soft romantic lofi chord progression (Fmaj7 - Em7 - Dm7 - Cmaj7)
  const chords = [
    [349.23, 440.0, 523.25, 659.25], // Fmaj7
    [329.63, 392.0, 493.88, 587.33], // Em7
    [293.66, 349.23, 440.0, 523.25], // Dm7
    [261.63, 329.63, 392.0, 493.88], // Cmaj7
  ];

  let chordIndex = 0;

  const playChord = () => {
    if (!isLofiPlaying || !ctx) return;
    const chord = chords[chordIndex % chords.length];
    chordIndex++;

    const now = ctx.currentTime;
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      // Soft warm filtered sine/triangle
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.3);
    });
  };

  playChord();
  lofiInterval = setInterval(playChord, 3200);
  return true;
}

export function isMusicPlaying(): boolean {
  return isLofiPlaying;
}
