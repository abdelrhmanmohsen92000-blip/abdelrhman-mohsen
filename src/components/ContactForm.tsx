"use client";

import { useState, type FormEvent } from "react";

interface Copy {
  fields: { name: string; email: string; topic: string; message: string };
  topics: string[];
  submit: string;
  submitService: string;
  note: string;
  sent: string;
  sentService: string;
  error: string;
}

// When NEXT_PUBLIC_FORM_ENDPOINT is set (for example a Formspree form URL), messages are posted
// there. Without it the form composes an email in the visitor's own mail app; nothing is
// collected or stored by this site.
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function ContactForm({ to, copy }: { to: string; copy: Copy }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot filled in: a bot

    const name = String(data.get("name") ?? "");
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "");

    if (!endpoint) {
      const subject = `${topic} – ${name}`;
      const body = `${message}\n\n${name}\n${data.get("email") ?? ""}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field">
          <span className="t-label">{copy.fields.name}</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="field">
          <span className="t-label">{copy.fields.email}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className="field">
        <span className="t-label">{copy.fields.topic}</span>
        <select name="topic" defaultValue={copy.topics[0]}>
          {copy.topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="t-label">{copy.fields.message}</span>
        <textarea name="message" rows={6} required />
      </label>
      <label className="sr-only" aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {endpoint ? copy.submitService : copy.submit}
        </button>
        {!endpoint && <p className="t-meta max-w-[44ch]">{copy.note}</p>}
      </div>
      <p role="status" className="min-h-6 text-[0.9375rem]">
        {status === "sent" && (endpoint ? copy.sentService : copy.sent)}
        {status === "error" && <span className="text-accent">{copy.error}</span>}
      </p>
    </form>
  );
}
