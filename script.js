// Nakshatra calculation data
const nakshatraData = [
  { name: "Ashwini", lord: "Ketu", degree: [0, 13.20], letters: ["चु", "चे", "चो", "ला"] },
  { name: "Bharani", lord: "Venus", degree: [13.20, 26.40], letters: ["ली", "लु", "ले", "लो"] },
  { name: "Krittika", lord: "Sun", degree: [26.40, 40], letters: ["अ", "इ", "उ", "ए"] },
  { name: "Rohini", lord: "Moon", degree: [40, 53.20], letters: ["ओ", "वा", "वी", "वु"] },
  { name: "Mrigashira", lord: "Mars", degree: [53.20, 66.40], letters: ["वे", "वो", "का", "की"] },
  { name: "Ardra", lord: "Rahu", degree: [66.40, 80], letters: ["कु", "घ", "ङ", "छ"] },
  { name: "Punarvasu", lord: "Jupiter", degree: [80, 93.20], letters: ["के", "को", "हा", "ही"] },
  { name: "Pushya", lord: "Saturn", degree: [93.20, 106.40], letters: ["हु", "हे", "हो", "डा"] },
  { name: "Ashlesha", lord: "Mercury", degree: [106.40, 120], letters: ["डी", "डू", "डे", "डो"] },
  { name: "Magha", lord: "Ketu", degree: [120, 133.20], letters: ["मा", "मी", "मू", "मे"] },
  { name: "Purva Phalguni", lord: "Venus", degree: [133.20, 146.40], letters: ["मो", "टा", "टी", "टू"] },
  { name: "Uttara Phalguni", lord: "Sun", degree: [146.40, 160], letters: ["टे", "टो", "पा", "पी"] },
  { name: "Hasta", lord: "Moon", degree: [160, 173.20], letters: ["पु", "ष", "ण", "ठ"] },
  { name: "Chitra", lord: "Mars", degree: [173.20, 186.40], letters: ["पे", "पो", "रा", "री"] },
  { name: "Swati", lord: "Rahu", degree: [186.40, 200], letters: ["रु", "रे", "रो", "ता"] },
  { name: "Vishakha", lord: "Jupiter", degree: [200, 213.20], letters: ["ती", "तू", "ते", "तो"] },
  { name: "Anuradha", lord: "Saturn", degree: [213.20, 226.40], letters: ["ना", "नी", "नू", "ने"] },
  { name: "Jyeshtha", lord: "Mercury", degree: [226.40, 240], letters: ["नो", "या", "यी", "यू"] },
  { name: "Mula", lord: "Ketu", degree: [240, 253.20], letters: ["ये", "यो", "भा", "भी"] },
  { name: "Purva Ashadha", lord: "Venus", degree: [253.20, 266.40], letters: ["भू", "धा", "फा", "ढा"] },
  { name: "Uttara Ashadha", lord: "Sun", degree: [266.40, 280], letters: ["भे", "भो", "जा", "जी"] },
  { name: "Shravana", lord: "Moon", degree: [280, 293.20], letters: ["खी", "खू", "खे", "खो"] },
  { name: "Dhanishta", lord: "Mars", degree: [293.20, 306.40], letters: ["गा", "गी", "गू", "गे"] },
  { name: "Shatabhisha", lord: "Rahu", degree: [306.40, 320], letters: ["गो", "सा", "सी", "सू"] },
  { name: "Purva Bhadrapada", lord: "Jupiter", degree: [320, 333.20], letters: ["से", "सो", "दा", "दी"] },
  { name: "Uttara Bhadrapada", lord: "Saturn", degree: [333.20, 346.40], letters: ["दू", "थ", "झ", "ञ"] },
  { name: "Revati", lord: "Mercury", degree: [346.40, 360], letters: ["दे", "दो", "चा", "ची"] }
];

// Zodiac (Rashi) data with degree ranges
const rashiData = [
  { name: "Aries", degree: [0, 30] },
  { name: "Taurus", degree: [30, 60] },
  { name: "Gemini", degree: [60, 90] },
  { name: "Cancer", degree: [90, 120] },
  { name: "Leo", degree: [120, 150] },
  { name: "Virgo", degree: [150, 180] },
  { name: "Libra", degree: [180, 210] },
  { name: "Scorpio", degree: [210, 240] },
  { name: "Sagittarius", degree: [240, 270] },
  { name: "Capricorn", degree: [270, 300] },
  { name: "Aquarius", degree: [300, 330] },
  { name: "Pisces", degree: [330, 360] }
];

// Function to calculate absolute degree based on rashi and degree
function calculateAbsoluteDegree(rashi, degree) {
  // Find the rashi in our data
  const rashiInfo = rashiData.find(r => r.name.toLowerCase() === rashi.toLowerCase());
  
  if (!rashiInfo) {
    return null; // Invalid rashi
  }
  
  // Calculate absolute degree
  return rashiInfo.degree[0] + parseFloat(degree);
}

// Function to find nakshatra based on absolute degree
function findNakshatra(absoluteDegree) {
  if (absoluteDegree === null || isNaN(absoluteDegree)) {
    return null;
  }
  
  // Handle degrees > 360
  const normalizedDegree = absoluteDegree % 360;
  
  // Find the nakshatra that contains this degree
  return nakshatraData.find(n => {
    return normalizedDegree >= n.degree[0] && normalizedDegree < n.degree[1];
  });
}

// Function to calculate pada (quarter) of nakshatra
function calculatePada(nakshatra, absoluteDegree) {
  if (!nakshatra || absoluteDegree === null) {
    return null;
  }
  
  const normalizedDegree = absoluteDegree % 360;
  const nakshatraStartDegree = nakshatra.degree[0];
  const nakshatraSpan = nakshatra.degree[1] - nakshatra.degree[0];
  const padaSpan = nakshatraSpan / 4;
  
  const position = normalizedDegree - nakshatraStartDegree;
  const pada = Math.floor(position / padaSpan) + 1;
  
  return pada;
}

// Function to get the letter based on nakshatra and pada
function getLetter(nakshatra, pada) {
  if (!nakshatra || !pada || pada < 1 || pada > 4) {
    return null;
  }
  
  return nakshatra.letters[pada - 1];
}

// Main calculation function
function performCalculation(planet, rashi, degree) {
  // Validate inputs
  if (!rashi || !degree) {
    return { success: false, message: "Please enter both Rashi and Degree" };
  }
  
  // Parse degree as a number
  const degreeValue = parseFloat(degree);
  if (isNaN(degreeValue) || degreeValue < 0 || degreeValue >= 30) {
    return { success: false, message: "Degree must be a number between 0 and 29.99" };
  }
  
  // Calculate absolute degree
  const absoluteDegree = calculateAbsoluteDegree(rashi, degreeValue);
  if (absoluteDegree === null) {
    return { success: false, message: `Invalid Rashi: ${rashi}. Please enter a valid zodiac sign.` };
  }
  
  // Find nakshatra
  const nakshatra = findNakshatra(absoluteDegree);
  if (!nakshatra) {
    return { success: false, message: "Could not determine Nakshatra for the given position" };
  }
  
  // Calculate pada
  const pada = calculatePada(nakshatra, absoluteDegree);
  
  // Get letter if this is for a child's name (Moon position)
  let letter = null;
  if (planet.toLowerCase() === "moon") {
    letter = getLetter(nakshatra, pada);
  }
  
  // Prepare result
  const result = {
    success: true,
    planet: planet || "Not specified",
    rashi: rashi,
    degree: degreeValue,
    absoluteDegree: absoluteDegree,
    nakshatra: nakshatra.name,
    nakshatraLord: nakshatra.lord,
    pada: pada
  };
  
  if (letter) {
    result.suggestedFirstLetter = letter;
  }
  
  return result;
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const resultBox = document.querySelector('.result-box');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const planet = "Moon"; // Planet is now fixed as Moon
    const rashi = document.getElementById('rashi').value.trim();
    const degree = document.getElementById('degree').value.trim();
    
    const result = performCalculation(planet, rashi, degree);
    
    if (result.success) {
      let resultHTML = `<div class="result-content">`;
      resultHTML += `<p><strong>Planet:</strong> ${result.planet}</p>`;
      resultHTML += `<p><strong>Position:</strong> ${result.rashi} ${result.degree}°</p>`;
      resultHTML += `<p><strong>Nakshatra:</strong> ${result.nakshatra}</p>`;
      resultHTML += `<p><strong>Nakshatra Lord:</strong> ${result.nakshatraLord}</p>`;
      resultHTML += `<p><strong>Pada:</strong> ${result.pada}</p>`;
      
      if (result.suggestedFirstLetter) {
        resultHTML += `<p><strong>Suggested First Letter:</strong> <span class="highlight-result">${result.suggestedFirstLetter}</span></p>`;
      }
      
      resultHTML += `</div>`;
      resultBox.innerHTML = resultHTML;
      resultBox.style.color = '#d1d5db';
      resultBox.style.fontStyle = 'normal';
    } else {
      resultBox.innerHTML = `<p class="error">${result.message}</p>`;
      resultBox.style.color = '#ef4444';
    }
  });
});