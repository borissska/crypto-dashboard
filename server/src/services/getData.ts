import fs from "fs";
import path from "path";

const DATA_DIR = path.join(__dirname, "../tickers");

export const getCryptoData = async (symbol: string) => {
  const filePath = path.join(DATA_DIR, `${symbol}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const data = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
};