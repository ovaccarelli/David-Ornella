"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLanguage } from "./LanguageProvider";

const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxSd_Ob9x7-WJK3L7JIL6ypLcHNBMygDmD_rVWc9Xo-WwZ7MUoSVo55XMVroEw3rgs66w/exec";

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export function RsvpForm() {
  const { t } = useLanguage();

  const [attendance, setAttendance] =
    useState("");

  const [
    submittedAttendance,
    setSubmittedAttendance,
  ] = useState("");

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const iframeRef =
    useRef<HTMLIFrameElement>(null);

  const timeoutRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  useEffect(() => {
    function handleMessage(
      event: MessageEvent,
    ) {
      /*
       * Accepter uniquement le message
       * provenant de l’iframe du formulaire.
       */
      if (
        event.source !==
          iframeRef.current?.contentWindow ||
        event.data?.type !==
          "RSVP_RESULT"
      ) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current,
        );
      }

      setStatus(
        event.data.ok
          ? "success"
          : "error",
      );
    }

    window.addEventListener(
      "message",
      handleMessage,
    );

    return () => {
      window.removeEventListener(
        "message",
        handleMessage,
      );

      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current,
        );
      }
    };
  }, []);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    /*
     * Ne pas utiliser preventDefault :
     * le formulaire doit réellement être envoyé
     * à Apps Script.
     */
    const formData =
      new FormData(event.currentTarget);

    setSubmittedAttendance(
      String(
        formData.get("attendance") ||
          "",
      ),
    );

    setStatus("submitting");

    if (timeoutRef.current) {
      clearTimeout(
        timeoutRef.current,
      );
    }

    timeoutRef.current =
      setTimeout(() => {
        setStatus("error");
      }, 20000);
  }

  if (status === "success") {
    return (
      <div
        className="rsvpSuccess"
        role="status"
      >
        <h3>
          {t.rsvp.successTitle}
        </h3>

        <p>
          {submittedAttendance ===
          "yes"
            ? t.rsvp.successYes
            : t.rsvp.successNo}
        </p>

        <button
          className="button"
          type="button"
          onClick={() => {
            setStatus("idle");
            setAttendance("");
            setSubmittedAttendance(
              "",
            );
          }}
        >
          {t.rsvp.anotherResponse}
        </button>
      </div>
    );
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        name="rsvp-submit-frame"
        title="RSVP submission result"
        hidden
      />

      <form
        className="rsvpForm"
        action={RSVP_ENDPOINT}
        method="POST"
        target="rsvp-submit-frame"
        onSubmit={handleSubmit}
      >
        {/*
         * Champ invisible antispam.
         * Il n’apparaît pas pour les invités.
         */}
        <div
          className="rsvpHoneypot"
          aria-hidden="true"
        >
          <label>
            Website

            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <label>
          {t.rsvp.name}

          <input
            name="name"
            type="text"
            placeholder={
              t.rsvp.namePlaceholder
            }
            autoComplete="name"
            required
          />
        </label>

        <label>
          {t.rsvp.attending}

          <select
            name="attendance"
            value={attendance}
            onChange={(event) => {
              setAttendance(
                event.target.value,
              );
            }}
            required
          >
            <option
              value=""
              disabled
            >
              {t.rsvp.select}
            </option>

            <option value="yes">
              {t.rsvp.yes}
            </option>

            <option value="no">
              {t.rsvp.no}
            </option>
          </select>
        </label>

        {attendance === "yes" && (
          <>
            <label>
              {t.rsvp.adults}

              <input
                name="adults"
                type="number"
                min="1"
                max="8"
                defaultValue="1"
                required
              />
            </label>

            <label>
              {t.rsvp.children}

              <input
                name="children"
                type="number"
                min="0"
                max="8"
                defaultValue="0"
                required
              />
            </label>

            <label>
              {t.rsvp.shuttle}

              <select
                name="transport"
                defaultValue=""
                required
              >
                <option
                  value=""
                  disabled
                >
                  {t.rsvp.select}
                </option>

                <option value="yes">
                  {t.rsvp.shuttleYes}
                </option>

                <option value="no">
                  {t.rsvp.shuttleNo}
                </option>
              </select>
            </label>

            <label>
              {t.rsvp.dietary}

              <textarea
                name="diet"
                rows={1}
              />
            </label>
          </>
        )}

        <label className="fullField">
          {t.rsvp.message}

          <textarea
            name="message"
            rows={3}
            placeholder={
              t.rsvp.messagePlaceholder
            }
          />
        </label>

        <button
          className="button"
          type="submit"
          disabled={
            status === "submitting"
          }
        >
          {status === "submitting"
            ? t.rsvp.submitting
            : t.rsvp.submit}
        </button>

        {status === "error" && (
          <p
            className="rsvpError fullField"
            role="alert"
          >
            {t.rsvp.error}
          </p>
        )}
      </form>
    </>
  );
}