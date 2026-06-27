import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {

  try {

    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "imageUrl required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
Analyze this fashion product.

Return ONLY valid JSON:

{
  "name":"",
  "color":"",
  "pattern":"",
  "category":"",
  "style":"",
  "occasion":"",
  "description":""
}
`
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      response_format: {
        type: "json_object"
      }
    });

    const content =
      response.choices[0].message.content;

    return NextResponse.json(
      JSON.parse(content || "{}")
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "analysis failed",
        details:
          error instanceof Error
            ? error.message
            : "unknown"
      },
      { status: 500 }
    );

  }

}
