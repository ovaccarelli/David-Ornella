"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function RsvpForm() {
  const { t } = useLanguage();
  const [attendance, setAttendance] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
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
    <form className="rsvpForm" onSubmit={handleSubmit}>
      <label>
        {t.rsvp.name}
        <input name="name" type="text" placeholder={t.rsvp.namePlaceholder} required />
      </label>
      <label>
        {t.rsvp.attending}
        <select
          name="attendance"
          value={attendance}
          onChange={(event) => setAttendance(event.target.value)}
          required
        >
          <option value="" disabled>{t.rsvp.select}</option>
          <option value="yes">{t.rsvp.yes}</option>
          <option value="no">{t.rsvp.no}</option>
        </select>
      </label>
      {attendance === "yes" && (
        <>
          <label>
            {t.rsvp.adults}
            <input name="adults" type="number" min="1" max="8" defaultValue="1" required />
          </label>
          <label>
            {t.rsvp.children}
            <input name="children" type="number" min="0" max="8" defaultValue="0" required />
          </label>
          <label>
            {t.rsvp.shuttle}
            <select name="transport" defaultValue="" required>
              <option value="" disabled>{t.rsvp.select}</option>
              <option>{t.rsvp.shuttleYes}</option>
              <option>{t.rsvp.shuttleNo}</option>
            </select>
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
