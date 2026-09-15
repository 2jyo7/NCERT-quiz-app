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
    "English": ["Two Little Hands", "Greetings", "Picture Reading", "Fun with Numbers"],
    "Hindi": ["झूला", "आम की कहानी", "पत्ते ही पत्ते", "पकौड़ी"],
  },
  2: {
    "Environmental Studies (EVS)": ["My Family", "Food We Eat", "Water and Air", "Safety Rules"],
    "Mathematics": ["What is Long, What is Round?", "Counting in Groups", "How Much Can You Carry?", "Patterns"],
    "English": ["First Day at School", "Haldi's Adventure", "I am Lucky!", "I Want"],
    "Hindi": ["ऊँट चला", "भालू ने खेली फुटबॉल", "म्याऊँ, म्याऊँ!", "अधिक बलवान कौन?"],
  },
  3: {
    "Environmental Studies (EVS)": ["Poonam's Day Out", "The Plant Fairy", "Water O' Water!", "Our First School"],
    "Mathematics": ["Where to Look From", "Fun with Numbers", "Give and Take", "Long and Short"],
    "English": ["Good Morning", "The Magic Garden", "Bird Talk", "Nina and the Baby Sparrows"],
    "Hindi": ["कक्कू", "शेखीबाज़ मक्खी", "चाँद वाली अम्मा", "मन करता है"],
  },
  4: {
    "Environmental Studies (EVS)": ["Going to School", "Ear to Ear", "A Day with Nandu", "The Story of Amrita"],
    "Mathematics": ["Building with Bricks", "Long and Short", "A Trip to Bhopal", "Tick-Tick-Tick"],
    "English": ["Wake Up!", "Neha's Alarm Clock", "Noses", "The Little Fir Tree"],
    "Hindi": ["मन के भोले-भाले बादल", "जैसी करनी वैसी भरनी", "किरमिच की गेंद", "पापा जब बच्चे थे"],
  },
  5: {
    "Environmental Studies (EVS)": ["Super Senses", "A Snake Charmer's Story", "From Tasting to Digesting", "Seeds and Seeds", "Every Drop Counts"],
    "Mathematics": ["The Fish Tale", "Shapes and Angles", "How Many Squares?", "Parts and Wholes", "Be My Multiple, I'll be your Factor"],
    "English": ["Ice-Cream Man", "Wonderful Waste!", "Teamwork", "Flying Together"],
    "Hindi": ["राख की रस्सी", "फ़सलों के त्योहार", "खिलौनेवाला", "नन्हा फनकार"],
  },

  // Middle Classes (6-8)
  6: {
    "Science": ["Components of Food", "Sorting Materials into Groups", "Separation of Substances", "Getting to Know Plants", "Body Movements"],
    "Mathematics": ["Knowing Our Numbers", "Whole Numbers", "Playing with Numbers", "Basic Geometrical Ideas"],
    "Social Science": ["What, Where, How and When?", "From Gathering to Growing Food", "The Earth in the Solar System", "Understanding Diversity"],
    "English": ["A House, A Home", "Who Did Patrick's Homework?", "How the Dog Found Himself a New Master!"],
  },
  7: {
    "Science": ["Nutrition in Plants", "Nutrition in Animals", "Heat", "Acids, Bases and Salts", "Physical and Chemical Changes"],
    "Mathematics": ["Integers", "Fractions and Decimals", "Data Handling", "Simple Equations", "Lines and Angles"],
    "Social Science": ["Tracing Changes Through a Thousand Years", "New Kings and Kingdoms", "Our Environment", "On Equality"],
    "English": ["Three Questions", "A Gift of Chappals", "The Rebel", "Gopal and the Hilsa Fish"],
  },
  8: {
    "Science": ["Crop Production and Management", "Microorganisms: Friend and Foe", "Coal and Petroleum", "Combustion and Flame", "Force and Pressure"],
    "Mathematics": ["Rational Numbers", "Linear Equations in One Variable", "Understanding Quadrilaterals", "Data Handling", "Square and Square Roots"],
    "Social Science": ["How, When and Where", "From Trade to Territory", "Resources", "The Indian Constitution", "Judiciary"],
    "English": ["The Best Christmas Present in the World", "The Tsunami", "Glimpses of the Past", "Macavity: The Mystery Cat"],
  },

  // Secondary Classes (9-10)
  9: {
    "Science": ["Matter in Our Surroundings", "Is Matter Around Us Pure", "Atoms and Molecules", "The Fundamental Unit of Life", "Motion", "Force and Laws of Motion"],
    "Mathematics": ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in Two Variables", "Lines and Angles", "Triangles"],
    "Social Science": ["The French Revolution", "Socialism in Europe & Russian Revolution", "India - Size and Location", "What is Democracy? Why Democracy?"],
    "English": ["The Fun They Had", "The Sound of Music", "The Little Girl", "A Truly Beautiful Mind", "The Road Not Taken"],
  },
  10: {
    "Science": ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Life Processes", "Control and Coordination", "Light - Reflection and Refraction", "Electricity"],
    "Mathematics": ["Real Numbers", "Polynomials", "Pair of Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progressions", "Introduction to Trigonometry"],
    "Social Science": ["The Rise of Nationalism in Europe", "Nationalism in India", "Resources and Development", "Power Sharing", "Federalism", "Sectors of the Indian Economy"],
    "English": ["A Letter to God", "Nelson Mandela: Long Walk to Freedom", "Two Stories about Flying", "Dust of Snow", "Fire and Ice"],
  },

  // Higher Secondary Classes (11-12)
  11: {
    "Physics": ["Units and Measurements", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", "Work, Energy and Power"],
    "Chemistry": ["Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements and Periodicity", "Chemical Bonding and Molecular Structure"],
    "Mathematics": ["Sets", "Relations and Functions", "Trigonometric Functions", "Complex Numbers and Quadratic Equations", "Linear Inequalities"],
    "Biology": ["The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom", "Cell: The Unit of Life"],
    "History": ["Writing and City Life (Mesopotamia)", "An Empire Across Three Continents (Roman Empire)", "Nomadic Empires", "Paths to Modernisation (East Asia)"],
    "Geography": ["Geography as a Discipline", "Interior of the Earth & Continental Drift", "Landforms and their Evolution", "Atmospheric Circulation and Weather Systems", "India: Location, Structure, and Relief"],
    "English": ["The Portrait of a Lady", "We're Not Afraid to Die...", "Discovering Tut: the Saga Continues", "The Voice of the Rain & Childhood", "Silk Road"],
    "Hindi": ["नमक का दारोगा (प्रेमचंद)", "मियाँ नसीरुद्दीन (कृष्णा सोबती)", "अपू के साथ ढाई साल (सत्यजित राय)", "कबीर के पद", "राजस्थान की रजत बूंदें (अनुपम मिश्र)"],
  },
  12: {
    "Physics": ["Electric Charges and Fields", "Electrostatic Potential and Capacitance", "Current Electricity", "Moving Charges and Magnetism", "Ray Optics and Optical Instruments"],
    "Chemistry": ["Solutions", "Electrochemistry", "Chemical Kinetics", "The d- and f-Block Elements", "Coordination Compounds", "Haloalkanes and Haloarenes"],
    "Mathematics": ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants", "Continuity and Differentiability", "Integrals"],
    "Biology": ["Sexual Reproduction in Flowering Plants", "Human Reproduction", "Principles of Inheritance and Variation", "Molecular Basis of Inheritance", "Biotechnology: Principles and Processes"],
    "History": ["Bricks, Beads and Bones (Harappan Civilisation)", "Kings, Farmers and Towns (Early States & Economies)", "Thinkers, Beliefs and Buildings (Buddhism & Jainism)", "Through the Eyes of Travellers (Al-Biruni, Ibn Battuta)", "Mahatma Gandhi and the Nationalist Movement"],
    "Geography": ["Human Geography: Nature and Scope", "World Population: Distribution, Density and Growth", "Primary, Secondary & Tertiary Activities", "Transport and Communication", "India: People, Economy & Human Settlements"],
    "English": ["The Last Lesson", "Lost Spring (Stories of Stolen Childhood)", "Deep Water", "My Mother at Sixty-Six", "The Third Level"],
    "Hindi": ["भक्तिन (महादेवी वर्मा)", "बाज़ार दर्शन (जैनेंद्र कुमार)", "काले मेघा पानी दे (धर्मवीर भारती)", "आत्मपरिचय (हरिवंश राय बच्चन)", "सिल्वर वैडिंग (मनोहर श्याम जोशी)"],
  },
};