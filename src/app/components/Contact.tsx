import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Pause,
  Play,
  Send,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { profile } from "../data/portfolio";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Reveal, SectionHeading } from "./Reveal";

export function Contact({
  ambientPaused,
  onToggleAmbient,
}: {
  ambientPaused: boolean;
  onToggleAmbient: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const reduced = useReducedMotion();
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio enquiry from ${form.name.trim()}`,
    );
    const body = encodeURIComponent(
      `${form.message.trim()}\n\nFrom: ${form.name.trim()}\nEmail: ${form.email.trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus(
      "Your email draft is ready to open in your email app. Review and send it there. If no app opens, copy the email address to write directly.",
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setStatus("Email address copied.");
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 3000);
    } catch {
      setStatus(`Please select and copy the email address: ${profile.email}`);
    }
  };

  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeading
          id="contact-title"
          label="05 / Get in touch"
          title="Let’s build something useful."
          tone="green"
          description="Have a project, an idea, or a question about my work? Let’s start a conversation."
        />
        <div className="contact-grid">
          <Reveal>
            <div className="contact-form-card">
              <h3>
                <MessageSquare size={20} aria-hidden="true" /> Start a
                conversation
              </h3>
              <p className="form-intro">
                Write a note and open it in your email app.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Your name</label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email address</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Your message</label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={1800}
                    rows={5}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="action-button primary-button form-submit"
                >
                  <Send size={16} aria-hidden="true" /> Open email draft{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Button>
                <p className="form-note">
                  Opens your email app. You review and send the message.
                </p>
              </form>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="contact-info">
            <div className="contact-orb" aria-hidden="true">
              <Mail size={38} strokeWidth={1.3} />
            </div>
            <h3>
              Good conversations
              <br />
              start with a hello.
            </h3>
            <p>
              AI applications, software systems,
              <br className="desktop-break" /> and ideas worth exploring.
            </p>
            <div className="contact-email-row">
              <a href={`mailto:${profile.email}`} className="email-link">
                {profile.email}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="icon-button copy-button"
                onClick={copyEmail}
                aria-label={
                  copied ? "Email address copied" : "Copy email address"
                }
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <div className="contact-location">
              <MapPin size={16} aria-hidden="true" />
              <span>
                {profile.location} · {profile.university}
              </span>
            </div>
            <a href={profile.cv} download className="text-link">
              <Download size={16} aria-hidden="true" /> Download my CV
            </a>
          </Reveal>
        </div>
        <p className="contact-status" role="status">
          {status}
        </p>
        <footer className="site-footer">
          <a href="#home" className="footer-name">
            {profile.name}
            <span>.</span>
          </a>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="footer-actions">
            {!reduced && (
              <button
                type="button"
                className="motion-toggle"
                onClick={onToggleAmbient}
                aria-pressed={ambientPaused}
              >
                {ambientPaused ? (
                  <Play size={13} aria-hidden="true" />
                ) : (
                  <Pause size={13} aria-hidden="true" />
                )}
                {ambientPaused ? "Resume motion" : "Pause motion"}
              </button>
            )}
            <a href="#home" className="back-to-top">
              Back to top <ArrowUp size={15} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
