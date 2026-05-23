import { useState } from "react";

export function CompanyLogo({ domain, company, size = 28 }: { domain: string; company: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size };

  if (failed) {
    return (
      <div
        style={style}
        className="rounded-lg bg-[#43afde]/15 flex items-center justify-center text-xs font-bold text-[#43afde] shrink-0"
      >
        {company[0]}
      </div>
    );
  }
  return (
    <img
      src={"https://www.google.com/s2/favicons?domain=" + domain + "&sz=128"}
      alt={company + " logo"}
      style={style}
      className="rounded-lg object-contain shrink-0 bg-white border border-gray-100 p-0.5"
      onError={() => setFailed(true)}
    />
  );
}
