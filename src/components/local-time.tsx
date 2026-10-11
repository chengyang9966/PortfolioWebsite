"use client";

import { useEffect, useState } from "react";

export function LocalTime({ timeZone, place }: { timeZone: string; place: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  if (!time) return <>Based in {place} (GMT+8)</>;
  return (
    <>
      It’s <span className="text-paper">{time}</span> in {place} right now
    </>
  );
}
