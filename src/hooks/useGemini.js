import axios from "axios";

export async function generateItinerary(destination, budget, interests, days) {
const prompt = `Create a ${days}-day travel itinerary for ${destination}.
Budget: $${budget}. Interests: ${interests.join(", ")}.
Format EXACTLY like this, no introduction text, start directly with Day 1:

Day 1:
- Morning:
  • Activity 1: [activity name] - [description] - $[cost]
  • Activity 2: [activity name] - [description] - $[cost]
- Lunch:
  • [restaurant name] - [food description] - $[cost]
- Afternoon:
  • Activity 1: [activity name] - [description] - $[cost]
  • Activity 2: [activity name] - [description] - $[cost]
  • Activity 3: [activity name] - [description] - $[cost]
- Dinner:
  • [restaurant name] - [food description] - $[cost]
- Evening:
  • Activity 1: [activity name] - [description] - $[cost]

Do NOT add any introduction or conclusion. Start directly with Day 1.`;

  const response = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}
