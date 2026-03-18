// Generates a thoughtful response from "future self" based on the user's message
export function generateFutureResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Extract themes and keywords
  const themes = {
    career: /work|job|career|business|profession|success|money|salary/i.test(userMessage),
    love: /love|relationship|partner|marriage|family|heart|romance/i.test(userMessage),
    fear: /fear|worry|anxious|afraid|scared|uncertain|doubt/i.test(userMessage),
    dream: /dream|hope|wish|want|aspire|goal|future/i.test(userMessage),
    change: /change|different|new|transform|grow|evolve/i.test(userMessage),
    happiness: /happy|joy|peace|content|fulfilled/i.test(userMessage),
    struggle: /hard|difficult|struggle|challenge|pain|tough/i.test(userMessage),
  };

  // Opening phrases
  const openings = [
    "Reading your words now feels like discovering an old photograph—familiar, yet distant.",
    "It's strange to remember when I wrote what you're writing now.",
    "Ten years. That's how long it took for me to understand what you were really asking.",
    "Your words carried a weight you couldn't fully feel yet. I can now.",
    "I remember the exact moment you sent this. I was you, after all.",
  ];

  // Build personalized response
  let response = openings[Math.floor(Math.random() * openings.length)] + "\n\n";

  // Add thematic reflection
  if (themes.fear || themes.worry) {
    response += "The things you feared... some came true, some didn't. But here's what surprised me: the fears themselves mattered less than how they shaped your choices. You became braver than you believed possible, not by conquering fear, but by moving forward despite it.\n\n";
  }

  if (themes.dream || themes.hope) {
    response += "The dreams you held—they evolved. Some transformed into something unexpected, more textured than you imagined. Others quietly fell away, and that was okay too. What mattered was that you kept dreaming.\n\n";
  }

  if (themes.love || themes.relationship) {
    response += "Love looks different now than how you pictured it. It's quieter in some ways, deeper in others. The people who stayed weren't always the ones you expected, and the connections that mattered most took time to reveal themselves.\n\n";
  }

  if (themes.career || themes.success) {
    response += "Success... I learned it's not a destination but a series of small moments where you chose authenticity over expectation. The path wandered more than you planned, and that made all the difference.\n\n";
  }

  if (themes.change) {
    response += "You changed. Profoundly. And yet, reading this now, I recognize you completely. The core of who you are remained, even as everything else shifted.\n\n";
  }

  // Closing wisdom
  const closings = [
    "Trust the unfolding. The journey from where you are to where I am is worth every uncertain step.",
    "Be gentle with yourself. The version of you reading this now is doing better than you think.",
    "Some answers can only be found by living through the questions. Keep asking them.",
    "The future isn't somewhere you arrive—it's somewhere you become. You're already on your way.",
    "Ten years ago, I needed to hear this: You're enough. You were always enough.",
  ];

  response += closings[Math.floor(Math.random() * closings.length)];

  // Add personal touch if message is short
  if (userMessage.length < 100) {
    response += "\n\nI wish you'd written more. But I understand—some things are hard to put into words. I'm still learning that myself.";
  }

  // Sign off
  response += "\n\n— From the future you, with love";

  return response;
}
