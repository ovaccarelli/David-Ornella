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

function isTrustedGoogleOrigin(origin: string) {
  try {
    const url = new URL(origin);

    return (
      url.protocol === "https:" &&
      (
        url.hostname === "script.google.com" ||
        url.hostname === "script.googleusercontent.com" ||
        url.hostname.endsWith(
          "-script.googleusercontent.com",
        )
      )
    );
  } catch {
    return false;
  }
}

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

  const [errors, setErrors] =
    useState<Record<string, string>>({});

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
      if (
        !isTrustedGoogleOrigin(
          event.origin,
        ) ||
        event.data?.type !==
          "RSVP_RESULT" ||
        typeof event.data?.ok !==
          "boolean"
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
    const formData =
      new FormData(event.currentTarget);
    const nextErrors:
      Record<string, string> = {};
    const adults = Number(
      formData.get("adults"),
    );
    const children = Number(
      formData.get("children"),
    );

    if (
      !String(
        formData.get("name") || "",
      ).trim()
    ) {
      nextErrors.name =
        t.rsvp.required;
    }

    if (!attendance) {
      nextErrors.attendance =
        t.rsvp.choose;
    }

    if (attendance === "yes") {
      if (
        !Number.isInteger(adults) ||
        adults < 1
      ) {
        nextErrors.adults =
          t.rsvp.validNumber;
      }

      if (
        !Number.isInteger(children) ||
        children < 0
      ) {
        nextErrors.children =
          t.rsvp.validNumber;
      }

      if (!formData.get("transport")) {
        nextErrors.transport =
          t.rsvp.choose;
      }
    }

    if (
      Object.keys(nextErrors).length
    ) {
      event.preventDefault();
      setErrors(nextErrors);
      return;
    }

    setErrors({});

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
        noValidate
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
            aria-invalid={
              Boolean(errors.name)
            }
            onInput={() => {
              setErrors((current) => ({
                ...current,
                name: "",
              }));
            }}
          />
          {errors.name && (
            <span className="fieldError">
              {errors.name}
            </span>
          )}
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
              setErrors((current) => ({
                ...current,
                attendance: "",
              }));
            }}
            aria-invalid={
              Boolean(
                errors.attendance,
              )
            }
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
          {errors.attendance && (
            <span className="fieldError">
              {errors.attendance}
            </span>
          )}
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
                aria-invalid={
                  Boolean(
                    errors.adults,
                  )
                }
                onInput={() => {
                  setErrors(
                    (current) => ({
                      ...current,
                      adults: "",
                    }),
                  );
                }}
              />
              {errors.adults && (
                <span className="fieldError">
                  {errors.adults}
                </span>
              )}
            </label>

            <label>
              {t.rsvp.children}

              <input
                name="children"
                type="number"
                min="0"
                max="8"
                defaultValue="0"
                aria-invalid={
                  Boolean(
                    errors.children,
                  )
                }
                onInput={() => {
                  setErrors(
                    (current) => ({
                      ...current,
                      children: "",
                    }),
                  );
                }}
              />
              {errors.children && (
                <span className="fieldError">
                  {errors.children}
                </span>
              )}
            </label>

            <label>
              {t.rsvp.shuttle}

              <select
                name="transport"
                defaultValue=""
                aria-invalid={
                  Boolean(
                    errors.transport,
                  )
                }
                onChange={() => {
                  setErrors(
                    (current) => ({
                      ...current,
                      transport: "",
                    }),
                  );
                }}
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
              {errors.transport && (
                <span className="fieldError">
                  {errors.transport}
                </span>
              )}
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
