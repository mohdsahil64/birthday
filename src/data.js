// =====================================================================
//  EDIT EVERYTHING HERE 👇  (naam, messages, shayari sab yahan se badlo)
// =====================================================================

export const config = {
  // Uska naam
  name: 'Saima',

  // ---- Screen 0: Envelope (sabse pehle) ----
  gift: {
    caption: 'A little something for you',
    hint: 'just for you ♡',
    tap: 'TAP TO OPEN ✿',
  },

  // ---- Screen 1: Welcome ----
  welcome: {
    badge: 'Assalamualykum',
    small: 'Hey Saima,',
    big: 'This little moment is made just for you',
    sub: 'Take a breath, smile, and let’s begin ✨',
    button: 'Begin the moment',
  },

  // ---- Screen 2: Celebration ----
  celebration: {
    title: 'Happy Birthday Saima',
    subtitle: '“May Allah bless you with good health and happiness on your birthday and the coming year!” ❤️🎉',
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
    '“On your special day, may Allah shower His blessings and mercies upon you and fulfill your heart with lasting joy”......     ' +
    'Dekho mujhe tumse koi wo nahi ki tumne esa kiu kiya wesa kiu kiya baat ye hai ke tum khus ho and allah se dua hai hamesha raho... And pata nahi ab bhi mujhe konsi ummeed hai tumse Khatam hi nahi hoti but mujhe pata hai is ummeed ka koi fyda nahi hai.. bye the way chodo in bataon ko Pata nahi ye din dubara kab aaygaa. So Happy Bday Again... Saima❤️',

  // ---- Screen 6: Final Wish (Hinglish typing message) ----
  finalWish: {
    heading: 'Happy Birthday',
    // Heading (Happy Birthday Saima) ke neeche, photos se pehle wala paragraph
    blessing:
      '“On this special day, may Allah’s mercy surround you, and His love fill your heart.”',
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
  cakeImage: '/cake1.png',

  // Slideshow ki photos (auto slide, 3 sec, loop, series 1->2->3->...).
  // Aur add karni ho to yahan path daal do — koi bhi count chalega.
  slideshow: [
    '/cake1.png',
    '/cake5.jpg',
    '/cake2.png',
    '/cake3.jpg',
    '/cake4.jpg',
  ],
  // Background music (public/ folder me hai)
  music: '/musik.mp3',
  // Blast/celebration sound — public/blast.mp3 daal dena (optional)
  blastSound: '/blast.mp3',
}
