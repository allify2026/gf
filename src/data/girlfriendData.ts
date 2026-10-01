/**
 * ==============================================================================
 * 🌸 GIRLFRIEND DAY WEBSITE - PHOTO SLOTS & CONFIGURATION
 * ==============================================================================
 * 
 * ✨ HOW TO CHANGE THE TWO PHOTOS:
 * Simply replace the `image` URL below for Photo 1 and Photo 2!
 * You can:
 * - Put your image in /public/ (e.g. /public/my_photo.jpg) and write: image: '/my_photo.jpg'
 * - OR paste any online image link (e.g. 'https://...'):
 * ==============================================================================
 */

// Default high-aesthetic photos
import defaultPhoto1 from '@/src/assets/images/gf_cafe_date_1790870405003.jpg';
import defaultPhoto2 from '@/src/assets/images/gf_sunset_beach_1790870421023.jpg';

export interface PhotoSlot {
  title: string;
  image: string;
  caption: string;
  dateOrNote: string;
  sticker: string;
  tapeColor: 'pink' | 'mint' | 'lavender';
  rotation: string;
}

export const GIRLFRIEND_CONFIG = {
  // Her name and sweet subtitle
  herName: 'My Sweet Girl',
  nickname: 'Princess',
  senderName: 'Your Boyfriend',
  subtitle: 'Happy Girlfriend Day to the most wonderful girl in the entire world 🌸',

  // Cute animated statements shown below the kiss button
  bannerQuotes: [
    'You make my heart smile in ways no one else can 🌷',
    'Loving you is the easiest, sweetest thing I ever do 🍓',
    'In a room full of art, I would still stare at you ✨',
    'My favorite notification is your name on my phone 💌',
    'You are my favorite thought before I sleep and when I wake up 🌙',
    'Every love song suddenly makes sense when I look at you 🎧',
    'I fall in love with you a little bit more every single day 💖',
    'Your smile is literally the prettiest thing in the entire universe 🌸',
    'Thank you for being my happiest place on earth 🧸',
    'No matter how my day went, seeing you makes everything okay 🤍',
    'Forever isn’t even long enough to love you 🥰',
  ],

  // ============================================================================
  // 📸 TWO PHOTO AREA (Change your photos here!)
  // ============================================================================
  photo1: {
    title: 'The Prettiest Girl in the World 🌸',
    // ⬇️ REPLACE THIS WITH YOUR PHOTO (e.g. '/photo1.jpg' or 'https://...'):
    image: defaultPhoto1,
    caption: 'Every time you smile, my whole day becomes brighter. You look so gorgeous effortlessly.',
    dateOrNote: 'My Favorite View',
    sticker: '🍓',
    tapeColor: 'pink' as const,
    rotation: '-2deg',
  },

  photo2: {
    title: 'Our Sweetest Moment Together 💕',
    // ⬇️ REPLACE THIS WITH YOUR PHOTO (e.g. '/photo2.jpg' or 'https://...'):
    image: defaultPhoto2,
    caption: 'Holding your hand and making memories with you is my absolute favorite place to be.',
    dateOrNote: 'Forever & Always',
    sticker: '✨',
    tapeColor: 'lavender' as const,
    rotation: '2deg',
  },

  // ============================================================================
  // 💌 CUTE LOVE LETTER
  // ============================================================================
  loveLetter: {
    salutation: 'To my dearest,',
    paragraphs: [
      'Happy Girlfriend Day! I wanted to make this cute little website just for you to remind you how deeply loved and appreciated you are.',
      'Thank you for bringing so much gentle happiness, sweet laughs, and warmth into my life. Every ordinary day feels like a beautiful memory whenever you are by my side.',
      'I love you today, tomorrow, and with all my heart.',
    ],
    closing: 'Always by your side,',
    signature: 'With all my love ❤️',
  },
};
