export interface SubjectTopicMap {
  [subject: string]: string[];
}

export interface NcertClassMap {
  [classNum: number]: SubjectTopicMap;
}

export const NCERT_DATA: NcertClassMap = {
  // Primary Classes (1-5)
  1: {
    "Environmental Studies (EVS)": ["Our Body", "Animals around us", "Plants & Flowers", "Weather & Seasons"],
    "Mathematics": ["Shapes & Space", "Numbers 1 to 9", "Addition & Subtraction", "Patterns"],
  },
  5: {
    "Environmental Studies (EVS)": ["Super Senses", "A Snake Charmer's Story", "From Tasting to Digesting", "Seeds and Seeds", "Every Drop Counts"],
    "Mathematics": ["The Fish Tale", "Shapes and Angles", "How Many Squares?", "Parts and Wholes", "Be My Multiple, I'll be your Factor"],
  },

  // Middle Classes (6-8)
  8: {
    "Science": ["Crop Production and Management", "Microorganisms: Friend and Foe", "Coal and Petroleum", "Combustion and Flame"],
    "Mathematics": ["Rational Numbers", "Linear Equations in One Variable", "Data Handling"],
    "Social Science": ["How, When and Where", "From Trade to Territory", "Resources", "The Indian Constitution"],
  },

  // Secondary Classes (9-10)
  10: {
    "Science": ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Life Processes", "Electricity"],
    "Mathematics": ["Real Numbers", "Polynomials", "Quadratic Equations", "Introduction to Trigonometry"],
    "Social Science": ["The Rise of Nationalism in Europe", "Resources and Development", "Power Sharing", "Sectors of the Indian Economy"],
  },

  // Higher Secondary Classes (11-12) - Arts & Humanities Focus
  11: {
    "History": [
      "Writing and City Life (Mesopotamia)",
      "An Empire Across Three Continents (Roman Empire)",
      "Nomadic Empires",
      "Paths to Modernisation (East Asia)"
    ],
    "Geography": [
      "Geography as a Discipline",
      "Interior of the Earth & Continental Drift",
      "Landforms and their Evolution",
      "Atmospheric Circulation and Weather Systems",
      "India: Location, Structure, and Relief"
    ],
    "English": [
      "The Portrait of a Lady",
      "We're Not Afraid to Die...",
      "Discovering Tut: the Saga Continues",
      "The Voice of the Rain & Childhood",
      "Silk Road"
    ],
    "Hindi": [
      "नमक का दारोगा (प्रेमचंद)",
      "मियाँ नसीरुद्दीन (कृष्णा सोबती)",
      "अपू के साथ ढाई साल (सत्यजित राय)",
      "कबीर के पद",
      "राजस्थान की रजत बूंदें (अनुपम मिश्र)"
    ]
  },
  12: {
    "History": [
      "Bricks, Beads and Bones (Harappan Civilisation)",
      "Kings, Farmers and Towns (Early States & Economies)",
      "Thinkers, Beliefs and Buildings (Buddhism & Jainism)",
      "Through the Eyes of Travellers (Al-Biruni, Ibn Battuta)",
      "Mahatma Gandhi and the Nationalist Movement"
    ],
    "Geography": [
      "Human Geography: Nature and Scope",
      "World Population: Distribution, Density and Growth",
      "Primary, Secondary & Tertiary Activities",
      "Transport and Communication",
      "India: People, Economy & Human Settlements"
    ],
    "English": [
      "The Last Lesson",
      "Lost Spring (Stories of Stolen Childhood)",
      "Deep Water",
      "My Mother at Sixty-Six",
      "The Third Level"
    ],
    "Hindi": [
      "भक्तिन (महादेवी वर्मा)",
      "बाज़ार दर्शन (जैनेंद्र कुमार)",
      "काले मेघा पानी दे (धर्मवीर भारती)",
      "आत्मपरिचय (हरिवंश राय बच्चन)",
      "सिल्वर वैडिंग (मनोहर श्याम जोशी)"
    ]
  }
};