exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: "GEMINI_API_KEY is not configured." };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    if (!payload.prompt || !Array.isArray(payload.videos) || payload.videos.length < 2) {
      return { statusCode: 400, body: "Prompt and two videos are required." };
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [
            { text: payload.prompt },
            ...payload.videos.map((video) => ({
              inline_data: {
                mime_type: video.mimeType || "video/mp4",
                data: video.data,
              },
            })),
          ],
        }],
        generationConfig: { temperature: 0.2 },
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      return { statusCode: response.status, body: json.error?.message || "Gemini API error." };
    }

    const text = json.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() || "";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.message || "Unexpected error." };
  }
};
