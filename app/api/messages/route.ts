import { NextRequest, NextResponse } from "next/server";

type Message = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
};

const messages: Message[] = [
  {
    id: 1,
    author: "선생님",
    text: "이 페이지는 프론트엔드와 백엔드가 어떻게 대화하는지 보여줍니다.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "JSON 형식으로 작성자를 포함한 메시지를 보내주세요." },
      { status: 400 }
    );
  }

  const author = String(body.author ?? "").trim();
  const text = String(body.text ?? "").trim();

  if (!author || !text) {
    return NextResponse.json(
      { error: "작성자와 메시지를 모두 입력해주세요." },
      { status: 400 }
    );
  }

  const newMessage: Message = {
    id: messages.at(-1)?.id ? messages.at(-1)!.id + 1 : 1,
    author,
    text,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);

  return NextResponse.json(newMessage, { status: 201 });
}

