import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sparkles, User, Link as LinkIcon, ArrowLeft, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  BRIDE_NAME,
  COUPLE_NAMES,
  GROOM_NAME,
  GUEST_PREFIXES,
  type GuestPrefix,
  buildInvitationUrl,
  formatGuestDisplayName,
} from '../config/wedding';

const buildInvitationMessage = (displayName: string, link: string) =>
  `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${COUPLE_NAMES}`;

/** Clipboard API with a textarea fallback for older mobile browsers and non-HTTPS previews. */
async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  if (!ok) throw new Error('Copy failed');
}

type Generated = { link: string; displayName: string };

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState<GuestPrefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const previewName = formatGuestDisplayName(prefix, guestName);
  const message = generated ? buildInvitationMessage(generated.displayName, generated.link) : '';

  // Editing the form invalidates the previous link so a stale one is never copied.
  const updatePrefix = (value: GuestPrefix) => {
    setPrefix(value);
    setGenerated(null);
  };
  const updateName = (value: string) => {
    setGuestName(value);
    setGenerated(null);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter a guest name');
      return;
    }
    setGenerated({
      link: buildInvitationUrl(window.location.origin, prefix, guestName),
      displayName: previewName,
    });
    setCopiedLink(false);
    setCopiedMessage(false);
    toast.success('Invitation link generated!');
  };

  const handleCopyLink = async () => {
    if (!generated) return;
    try {
      await copyText(generated.link);
      setCopiedLink(true);
      toast.success('Link copied!');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      toast.error('Could not copy. Please select the link and copy it manually.');
    }
  };

  const handleCopyMessage = async () => {
    if (!generated) return;
    try {
      await copyText(message);
      setCopiedMessage(true);
      toast.success('Message copied!');
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      toast.error('Could not copy. Please select the message and copy it manually.');
    }
  };

  const labelClass = 'block text-xs uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 flex items-center gap-2 ml-1';
  const fieldClass = 'w-full bg-white px-6 py-4 rounded-full border border-stone-200/80 focus:ring-2 focus:ring-brand-lavender/40 focus:border-brand-plum/40 outline-none transition-all font-serif text-lg shadow-inner text-stone-800';
  const copyButtonClass = 'flex-1 py-3.5 px-5 rounded-full font-sans tracking-[0.2em] font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100';

  return (
    <div className="min-h-screen bg-brand-blush py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800 relative overflow-hidden selection:bg-brand-plum/20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-radial from-brand-lavender/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-brand-lavender/40 text-stone-600 hover:text-brand-plum hover:bg-white transition-all shadow-sm font-medium text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Invitation
          </a>
          <span className="px-4 py-1.5 rounded-full bg-brand-rose border border-brand-lavender/40 text-brand-plum text-xs font-bold uppercase tracking-widest shadow-sm">
            Admin
          </span>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-brand-plum" />
            <span className="text-brand-plum uppercase tracking-[0.5em] text-xs font-bold">Invitation Link Generator</span>
            <Sparkles className="w-5 h-5 text-brand-plum" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-display text-stone-800 tracking-tight mb-3">
            {BRIDE_NAME} <span className="text-rose-gold px-1">&</span> {GROOM_NAME}
          </h1>
          <p className="text-stone-500 font-serif italic text-lg max-w-xl mx-auto">
            Create a personalised invitation link and WhatsApp message for each guest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(181,128,111,0.15)] relative overflow-hidden self-start"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-rose via-brand-plum to-brand-rose" />

            <form onSubmit={handleGenerate} className="space-y-7">
              <div>
                <label htmlFor="prefix" className={labelClass}>
                  <User className="w-4 h-4 text-brand-plum" />
                  Select Prefix
                </label>
                <select
                  id="prefix"
                  value={prefix}
                  onChange={(e) => updatePrefix(e.target.value as GuestPrefix)}
                  className={`${fieldClass} cursor-pointer`}
                >
                  {GUEST_PREFIXES.map((p) => (
                    <option key={p.value} value={p.value}>{p.value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="guestName" className={labelClass}>
                  <User className="w-4 h-4 text-brand-plum" />
                  Guest Name
                </label>
                <input
                  id="guestName"
                  type="text"
                  placeholder="e.g. Sanjaya"
                  autoComplete="off"
                  value={guestName}
                  onChange={(e) => updateName(e.target.value)}
                  className={`${fieldClass} italic placeholder:text-stone-400`}
                />
              </div>

              {/* Live greeting preview */}
              <div className="rounded-2xl bg-brand-rose/60 border border-brand-lavender/50 px-5 py-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-plum mb-1">Greeting</p>
                <p className="font-serif text-xl text-stone-800">
                  {previewName ? `Dear ${previewName} ❤️` : <span className="text-stone-400 italic">Dear … ❤️</span>}
                </p>
              </div>

              <button
                type="submit"
                className="rg-button w-full py-5 rounded-full font-sans tracking-[0.3em] font-bold text-xs uppercase transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <LinkIcon className="w-4 h-4" />
                Generate Link
              </button>
            </form>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 bg-white/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(181,128,111,0.15)] space-y-6"
          >
            <div>
              <p className={labelClass}>
                <LinkIcon className="w-4 h-4 text-brand-plum" />
                Generated Link
              </p>
              {generated ? (
                <a
                  href={generated.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200/80 font-mono text-sm text-brand-plum break-all hover:bg-white transition-colors"
                >
                  {generated.link}
                </a>
              ) : (
                <div className="px-5 py-4 rounded-2xl border-2 border-dashed border-stone-200 text-stone-400 font-serif italic">
                  Enter a guest and click Generate Link.
                </div>
              )}
            </div>

            <div>
              <p className={labelClass}>
                <MessageCircle className="w-4 h-4 text-brand-plum" />
                WhatsApp Message Preview
              </p>
              <div className="text-sm text-stone-700 font-serif whitespace-pre-wrap break-words leading-relaxed bg-stone-50 p-5 rounded-2xl border border-stone-200/80 min-h-[8rem]">
                {generated ? message : <span className="text-stone-400 italic">The full message will appear here.</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                disabled={!generated}
                className={`${copyButtonClass} bg-brand-rose text-brand-plum border border-brand-lavender/60 hover:bg-white`}
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedLink ? 'Link copied!' : 'Copy Link Only'}
              </button>
              <button
                type="button"
                onClick={handleCopyMessage}
                disabled={!generated}
                className={`${copyButtonClass} rg-button`}
              >
                {copiedMessage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedMessage ? 'Message copied!' : 'Copy Full Message'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
