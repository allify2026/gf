import confetti from 'canvas-confetti';

export function fireHeartConfetti(x = 0.5, y = 0.6) {
  // Fire cute pastel pink hearts and stars
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { x, y },
    colors: ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#e879f9', '#ffd1dc'],
    shapes: ['circle'],
    ticks: 200,
    gravity: 0.8,
    scalar: 1.2,
    drift: 0,
  });
}

export function fireCelebrationConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.35), y: Math.random() - 0.2 },
      colors: ['#ff69b4', '#ffb6c1', '#ffc0cb', '#f3a683', '#f8a5c2', '#f78fb3'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.65, 0.85), y: Math.random() - 0.2 },
      colors: ['#ff69b4', '#ffb6c1', '#ffc0cb', '#f3a683', '#f8a5c2', '#f78fb3'],
    });
  }, 250);
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
