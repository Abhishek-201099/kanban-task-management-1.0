"use client";

export default function Error({ error, reset }) {
  return <div>{error.message}</div>;
}
