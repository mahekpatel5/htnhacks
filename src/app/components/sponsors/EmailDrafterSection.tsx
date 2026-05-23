import { useState } from "react";
import { Sparkles, Clock, Send, CheckCircle } from "lucide-react";
import {
  formatDate,
  daysSince,
  getContactAttentionState,
  CONTACT_INDICATOR_TOOLTIPS,
} from "../../utils/sponsors";
import { ContactTooltip } from "./ui/ContactTooltip";
import type { Sponsor } from "../../types";

const EMAIL_TEMPLATES: Record<string, (s: Sponsor) => string> = {
  initial: (s) =>
    "Subject: Hack the North 2026 – Sponsorship Opportunity for " +
    s.company +
    "\n\n" +
    "Hi " +
    s.contact.name.split(" ")[0] +
    ",\n\n" +
    "Hope this finds you well! I'm " +
    s.currentDri +
    ", a sponsorship coordinator at Hack the North – our annual hackathon bringing together 800+ students from across North America.\n\n" +
    "I'd love to explore a partnership with " +
    s.company +
    " for Hack the North 2026. We have several tiers available (Startup, Bronze, Silver, Gold) with options for recruiting booths, workshops, and API challenges.\n\n" +
    "Would you have 20 minutes for a quick call this week or next?\n\n" +
    "Best,\n" +
    s.currentDri +
    "\nHack the North Sponsorship Team",

  bump: (s) => {
    const bumps = s.resources.filter(
      (r) => r.type === "email" && r.label.includes("bump"),
    ).length;
    const ordinal = s.years.length === 1 ? "nd" : "th";
    const yearClause =
      s.years.length > 0
        ? s.years.length + 1 + ordinal + " year"
        : "first year";
    const experienceLine =
      s.years.length > 0
        ? " – we had a great experience in " + s.years[s.years.length - 1].year
        : "";
    return (
      "Subject: Re: Hack the North 2026 Sponsorship – Following Up\n\n" +
      "Hi " +
      s.contact.name.split(" ")[0] +
      ",\n\n" +
      "Just circling back on my previous note about Hack the North 2026 sponsorship. This would be our " +
      yearClause +
      " partnering together" +
      experienceLine +
      ".\n\n" +
      "We're finalizing our sponsor lineup and would love to include " +
      s.company +
      ". Happy to send over our full sponsorship package if helpful.\n\n" +
      "Do you have 15 minutes this week?\n\n" +
      "Best,\n" +
      s.currentDri +
      "\nHack the North Sponsorship Team\n\n" +
      "---\nThis is follow-up #" +
      (bumps + 1) +
      ". Last contact: " +
      formatDate(s.lastBumpDate) +
      "."
    );
  },

  renewal: (s) => {
    const lastYear = [...s.years].sort((a, b) => b.year - a.year)[0];
    const tierCap = lastYear?.tier
      ? lastYear.tier.charAt(0).toUpperCase() + lastYear.tier.slice(1)
      : "Sponsorship";
    const tierLine =
      lastYear?.tier === "gold"
        ? "maintaining your gold tier"
        : "an upgrade to the next tier";
    const addOnLine = lastYear?.addOns.length
      ? "\n\nWe can include the same add-ons as last year (" +
        lastYear.addOns.join(", ") +
        ") plus some new options."
      : "";
    const historyLine = lastYear ? " as a " + lastYear.tier + " sponsor" : "";
    return (
      "Subject: Hack the North 2026 Renewal – " +
      tierCap +
      " Tier\n\n" +
      "Hi " +
      s.contact.name.split(" ")[0] +
      ",\n\n" +
      "Thank you again for " +
      s.company +
      "'s support at Hack the North " +
      (lastYear?.year ?? "last year") +
      historyLine +
      ". It was fantastic having you there.\n\n" +
      "We're excited to invite " +
      s.company +
      " back for Hack the North 2026. Based on our previous partnership, I think " +
      tierLine +
      " would be a great fit." +
      addOnLine +
      "\n\n" +
      "Would you be open to a quick renewal call?\n\n" +
      "Best,\n" +
      s.currentDri +
      "\nHack the North Sponsorship Team"
    );
  },

  followup: (s) => {
    const notesBlock = s.notes
      ? "Key points from our conversation:\n" + s.notes + "\n\n"
      : "";
    const reconnect =
      s.status === "Negotiating"
        ? "once you've had a chance to review the contract"
        : "next week to discuss next steps";
    return (
      "Subject: Hack the North 2026 – Post-Meeting Follow-Up\n\n" +
      "Hi " +
      s.contact.name.split(" ")[0] +
      ",\n\n" +
      "Great speaking with you! As discussed, I'm sending over the details we covered.\n\n" +
      notesBlock +
      "Next steps:\n• I'll send over the full sponsorship package by end of week\n• Please loop in anyone else on your team who should be part of the decision\n• Let's plan to reconnect " +
      reconnect +
      "\n\n" +
      "Thanks again – excited about the potential partnership!\n\n" +
      "Best,\n" +
      s.currentDri +
      "\nHack the North Sponsorship Team"
    );
  },
};

export function EmailDrafterSection({
  sponsor,
  compact = false,
}: {
  sponsor: Sponsor | null;
  compact?: boolean;
}) {
  const [emailType, setEmailType] = useState<
    "initial" | "bump" | "renewal" | "followup" | "other"
  >("bump");
  const [customPrompt, setCustomPrompt] = useState("");
  const [draftText, setDraftText] = useState("");
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function generateDraft() {
    if (!sponsor) return;
    let base = "";
    if (emailType === "other") {
      // Use the custom prompt / manual content as the draft base when "Other" is selected
      base =
        customPrompt.trim() ||
        "Subject: [Your subject here]\n\n[Write your custom message here]";
    } else {
      base = EMAIL_TEMPLATES[emailType](sponsor);
      if (customPrompt.trim()) {
        base += "\n\n---\n[Custom context: " + customPrompt.trim() + "]";
      }
    }
    setDraftText(base);
    setGenerated(true);
    setSent(false);
  }

  function handleSend() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  }

  const attention = sponsor ? getContactAttentionState(sponsor) : null;

  return (
    <div className="space-y-4">
      {sponsor && (
        <div className="bg-gradient-to-br from-[#43afde]/10 to-purple-50 rounded-xl p-3 border border-[#43afde]/20">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={12} className="text-[#43afde]" />
            <span className="text-xs font-semibold text-[#43afde]">
              Context
            </span>
          </div>
          <ul className="text-xs text-gray-600 space-y-0.5 leading-relaxed text-left">
            <li>
              • Status: <strong>{sponsor.status}</strong>
            </li>
            <li>
              • Last contact:{" "}
              {attention ? (
                <ContactTooltip label={CONTACT_INDICATOR_TOOLTIPS[attention]}>
                  <strong className={attention === "overdue" ? "text-red-600" : "text-gray-800"}>
                    {formatDate(sponsor.lastBumpDate)}
                  </strong>
                </ContactTooltip>
              ) : (
                <strong>{formatDate(sponsor.lastBumpDate)}</strong>
              )}{" "}
              ({daysSince(sponsor.lastBumpDate)} days ago)
            </li>
            {sponsor.years.length > 0 && (
              <li>
                • Sponsored {sponsor.years.length}x – last at{" "}
                <strong>
                  {[...sponsor.years].sort((a, b) => b.year - a.year)[0].tier}
                </strong>{" "}
                tier
              </li>
            )}
            <li>
              • Contact: <strong>{sponsor.contact.name}</strong> (
              {sponsor.contact.email})
            </li>
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Email Type
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {(["initial", "bump", "renewal", "followup", "other"] as const).map(
            (t) => (
              <button
                key={t}
                onClick={() => {
                  setEmailType(t);
                  setGenerated(false);
                }}
                className={
                  "px-3 py-2 rounded-lg text-sm border transition-all " +
                  (emailType === t
                    ? "border-[#43afde] bg-[#43afde]/10 text-[#43afde] font-medium"
                    : "border-gray-200 text-gray-600 hover:border-gray-300")
                }
              >
                {t === "followup"
                  ? "Follow-up"
                  : t === "other"
                  ? "Other"
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Additional Instructions
        </h3>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={3}
          placeholder={
            emailType === "other"
              ? "Write the full email or subject/body here. This will be used as the draft."
              : "e.g. Mention the new AI track. Keep it under 150 words. Reference our 2023 partnership metrics."
          }
          className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 resize-none outline-none focus:border-[#43afde] placeholder:text-gray-300 leading-relaxed"
        />
      </div>

      <button
        onClick={generateDraft}
        disabled={!sponsor}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#43afde] text-white rounded-xl text-sm font-semibold hover:bg-[#2395c6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Sparkles size={15} />
        Generate Draft with AI
      </button>

      {generated && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Draft
          </h3>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={14}
            className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4 resize-none outline-none focus:border-[#43afde] font-mono leading-relaxed"
          />
          {sent ? (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-4 py-3 rounded-xl">
              <CheckCircle size={16} />
              Email sent to {sponsor?.contact.email}
            </div>
          ) : (
            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1f2937] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors"
            >
              {sending ? (
                <>
                  <Clock size={15} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={15} /> Send Email
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
