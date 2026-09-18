import React from "react";
import { ME } from "./screenData";

export default function Annotation({ title, body }) {
  return (
    <div className="min-w-0 border-t pt-4" style={{ borderColor: ME.pale }}>
      <h4
        className="font-body text-[15px] font-semibold tracking-tight"
        style={{ color: ME.navy }}
      >
        {title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed sm:text-[15px]" style={{ color: ME.slate }}>
        {body}
      </p>
    </div>
  );
}
