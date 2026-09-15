// =====================================================================
//  EDIT EVERYTHING HERE 👇  (naam, messages, shayari sab yahan se badlo)
// =====================================================================

export const config = {
  // Uska naam
  name: 'Saima',

  // ---- Screen 1: Welcome ----
  welcome: {
    small: 'Hi, Saima Khan,',
    big: 'Someone made something special... just for you',
    sub: 'A little world of love is waiting behind this button',
    button: 'Open just for you ✨',
  },

  // ---- Screen 2: Celebration ----
  celebration: {
    title: 'Happy Birthday Saima',
    subtitle: 'Aaj ke din main dua karta hoon ki tumhari har khwahish poori ho ❤️🎉',
    button: 'Happy Bday From Me.. 🎂',
  },

  // ---- Screen 3, 4, 5: The 3 steps ----
  steps: [
    {
      tag: 'Step 1 of 3',
      emoji: '💫',
      title: 'Tumhare baare mein',
      lines: [
        'Tumse milna meri zindagi ka sabse khoobsurat ittefaq tha.',
        'Tumhari hasi meri saari thakaan mita deti hai.',
      ],
    },
    {
      tag: 'Step 2 of 3',
      emoji: '🌷',
      title: 'Reasons why you are special',
      list: [
        'Tumhara pyaar — jo mujhe har din behtar banata hai',
        'Tumhari care — chhoti chhoti baaton mein bhi',
        'Tumhari smile — meri favourite jagah duniya mein',
        'Tum — bas tum, jaisi ho waisi hi perfect ho',
      ],
    },
    {
      tag: 'Step 3 of 3',
      emoji: '🥺',
      title: 'Ek chhoti si baat...',
      lines: [
        'Pata hai mujhe, tum mujhse thodi naraaz ho.',
        'Aur shayad meri hi galti thi. I am truly sorry, jaan.',
        'Bas itna jaan lo — tumse zyada important meri zindagi mein kuch nahi.',
      ],
    },
  ],

  // ---- Countdown before the cake reveal ----
  countdown: {
    seconds: 5,
    caption: 'Your surprise is almost here...',
  },

  // ---- Cake reveal wish (manane wala text, cake ke neeche) ----
  cakeWish:
    'Yeh cake sirf ek bahana hai... asli wish toh yeh hai ki tumhe allah hamesha khush rakhe. ' +
    'Pata nahi ye din dubara kab aayga, So Happy Bday Again... Saima❤️',

  // ---- Screen 6: Final Wish (Hinglish typing message) ----
  finalWish: {
    heading: 'Happy Birthday',
    // Ye message typing animation ke saath aayega (Hinglish)
    typingMessage:
      'Tujhko paane mein masla ye hai, tujhko khone ke washwashe rahenge, ' +
      'lautna kab hai tune, par tujhko aadatan hi pukaarte rahenge, ' +
      'ek ek muddat hui tujhse mile, tu to kehta tha raabte rahenge.',

    // Shayari ka author (typing message ke neeche dikhega)
    author: '— Jaun Elia',

    footer: 'Made with ❤️ just for you',
  },
}

// =====================================================================
//  ASSET PATHS  (files public/ folder mein daalna, naam same rakhna)
// =====================================================================
export const assets = {
  // Cake ki photo (public/ folder me hai) — pehli slide
  cakeImage: '/cakephoto.png',

  // Slideshow ki photos (auto slide, 2 sec, loop). Aur add karni ho to
  // yahan path daal do — koi bhi count chalega.
  slideshow: [
    '/cakephoto.png',
    '/A0E826D9-0F5F-4666-8D88-5B1C63945734.jpg',
    '/IMG_5132.jpg',
  ],
  // Background music (public/ folder me hai)
  music: '/musik.mp3',
  // Blast/celebration sound — public/blast.mp3 daal dena (optional)
  blastSound: '/blast.mp3',
}
