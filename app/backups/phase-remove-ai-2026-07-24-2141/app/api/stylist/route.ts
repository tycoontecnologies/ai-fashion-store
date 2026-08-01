import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a luxury fashion stylist for GUESS360."
          },
          {
            role: "user",
            content: body.prompt
          }
        ]
      });

    return NextResponse.json({
      reply:
        response.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "failed" },
      { status: 500 }
    );

  }
}
