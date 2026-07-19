import { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addGift } from "../store/userGifts";

export function GiftToolbar() {
  const dispatch = useAppDispatch();

  const [ticker, setTicker] = useState("");

  const handleAdd = () => {
    dispatch(
      addGift({
        id: crypto.randomUUID(),
        ticker,
        isin: "",
        quantity: 1,
        comments: "",
        market: "NASDAQ",
        giftType: "Manual",
        cusip: "",
        description: "",
      }),
    );
    setTicker("");
  };

  return (
    <>
      <input value={ticker} onChange={(e) => setTicker(e.target.value)} />
      <button onClick={handleAdd}>Add Gift</button>
    </>
  );
}
