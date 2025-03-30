import { NextResponse } from "next/server";

const cache = new Map<string, { rate: number; timestamp: number }>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const amount = searchParams.get("amount");

  if (!from || !to || !amount) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  const cacheKey = `${from}-${to}`;
  const cacheTTL = 30 * 60 * 1000; // Cache 30 menit

  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      // console.log("Menggunakan data dari cache");
      return NextResponse.json({ conversion_rate: cachedData.rate });
    }
  }

  const API_KEY = process.env.CURRENCY_CONVERTER_API_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: "API Key is missing" },
      { status: 500 }
    );
  }

  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok)
      throw new Error("Failed to fetch exchange rate");

    const data = await response.json();

    cache.set(cacheKey, {
      rate: data.conversion_rate,
      timestamp: Date.now(),
    });
    setTimeout(() => {
      cache.delete(cacheKey);
      // console.log(`Cache expired untuk ${cacheKey}`);
    }, cacheTTL);

    return NextResponse.json({
      conversion_rate: data.conversion_rate,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch exchange rate" },
      { status: 500 }
    );
  }
}
