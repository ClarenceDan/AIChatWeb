import { prettyObject } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";
import { requestOpenai } from "../../common";

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  // console.log("[OpenAI Route] params ", params);

  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  try {
    console.log("[OpenAI Route] About to request OpenAI...");
    const response = await requestOpenai(req);
    // console.log("[OpenAI Route] Received response with status:", response.status);
    // console.log("[OpenAI Route] Response body:", response.body);
    return response;
  } catch (e) {
    console.error("[OpenAI] ", e);
    return NextResponse.json(prettyObject(e));
  }
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
