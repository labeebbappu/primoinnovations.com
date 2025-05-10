"use client";

import { updateSessionAction } from "./actions";

export default function SessionUpdater() {
  return <div onLoad={() => updateSessionAction()}></div>;
}
