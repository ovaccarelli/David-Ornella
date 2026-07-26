"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function RsvpForm() {
  const { t } = useLanguage();
  const [attendance, setAttendance] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function clearError(field: string) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const adults = Number(form.get("adults"));
    const children = Number(form.get("children"));
    const nextErrors: Record<string, string> = {};

    if (!String(form.get("name") ?? "").trim()) nextErrors.name = t.rsvp.required;
    if (!attendance) nextErrors.attendance = t.rsvp.choose;
    if (attendance === "yes") {
      if (!Number.isInteger(adults) || adults < 1) nextErrors.adults = t.rsvp.validNumber;
      if (!Number.isInteger(children) || children < 0) nextErrors.children = t.rsvp.validNumber;
      if (!form.get("transport")) nextErrors.transport = t.rsvp.choose;
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const subject = t.rsvp.subject;
    const attendingText = attendance === "yes" ? t.rsvp.yes : t.rsvp.no;
    const body = [
      `${t.rsvp.name}: ${form.get("name")}`,
      `${t.rsvp.attending}: ${attendingText}`,
      ...(attendance === "yes"
        ? [
            `${t.rsvp.adults}: ${form.get("adults")}`,
            `${t.rsvp.children}: ${form.get("children")}`,
            `${t.rsvp.shuttle}: ${form.get("transport")}`,
            `${t.rsvp.dietary}: ${form.get("diet") || t.rsvp.none}`,
          ]
        : []),
      `${t.rsvp.message}: ${form.get("message") || t.rsvp.none}`,
    ].join("\n");

    window.location.href =
      `mailto:o.vaccarelli@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="rsvpForm" onSubmit={handleSubmit} noValidate>
      <label>
        {t.rsvp.name}
        <input name="name" type="text" placeholder={t.rsvp.namePlaceholder} onInput={() => clearError("name")} aria-invalid={Boolean(errors.name)} />
        {errors.name && <span className="fieldError">{errors.name}</span>}
      </label>
      <label>
        {t.rsvp.attending}
        <select
          name="attendance"
          value={attendance}
          onChange={(event) => {
            setAttendance(event.target.value);
            clearError("attendance");
          }}
          aria-invalid={Boolean(errors.attendance)}
        >
          <option value="" disabled>{t.rsvp.select}</option>
          <option value="yes">{t.rsvp.yes}</option>
          <option value="no">{t.rsvp.no}</option>
        </select>
        {errors.attendance && <span className="fieldError">{errors.attendance}</span>}
      </label>
      {attendance === "yes" && (
        <>
          <label>
            {t.rsvp.adults}
            <input name="adults" type="number" min="1" max="8" defaultValue="1" onInput={() => clearError("adults")} aria-invalid={Boolean(errors.adults)} />
            {errors.adults && <span className="fieldError">{errors.adults}</span>}
          </label>
          <label>
            {t.rsvp.children}
            <input name="children" type="number" min="0" max="8" defaultValue="0" onInput={() => clearError("children")} aria-invalid={Boolean(errors.children)} />
            {errors.children && <span className="fieldError">{errors.children}</span>}
          </label>
          <label>
            {t.rsvp.shuttle}
            <select name="transport" defaultValue="" onChange={() => clearError("transport")} aria-invalid={Boolean(errors.transport)}>
              <option value="" disabled>{t.rsvp.select}</option>
              <option>{t.rsvp.shuttleYes}</option>
              <option>{t.rsvp.shuttleNo}</option>
            </select>
            {errors.transport && <span className="fieldError">{errors.transport}</span>}
          </label>
          <label>
            {t.rsvp.dietary}
            <textarea name="diet" rows={1} />
          </label>
        </>
      )}
      <label className="fullField">
        {t.rsvp.message}
        <textarea name="message" rows={3} placeholder={t.rsvp.messagePlaceholder} />
      </label>
      <button className="button" type="submit">{t.rsvp.submit}</button>
    </form>
  );
}
