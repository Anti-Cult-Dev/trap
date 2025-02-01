import React, { useState } from 'react';
import { Copy, Twitter, Facebook, Link2 } from 'lucide-react';

interface ShareModalProps {
  url: string;
  onClose: () => void;
  title?: string;
  image?: string;
}

export default function ShareModal({ url, onClose, title, image }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    const text = title || "Check out this amazing AI companion! 💖";
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}>
      <div className="bg-gradient-to-br from-pink-900/80 to-purple-900/80 rounded-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-['Orbitron'] uppercase tracking-wider mb-6">Share Profile</h3>
        
        <div className="space-y-4">
          {/* URL Display */}
          <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
            <div className="flex-1 truncate text-pink-100">{url}</div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-pink-500/20 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-pink-400" />
            </button>
          </div>

          {copied && (
            <div className="text-center text-pink-400 text-sm">
              URL copied to clipboard! 🎉
            </div>
          )}

          {/* Share Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2]/10 
                hover:bg-[#1DA1F2]/20 rounded-lg transition-colors"
            >
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              <span>Twitter</span>
            </button>
            <button
              onClick={shareToFacebook}
              className="flex items-center justify-center gap-2 p-3 bg-[#4267B2]/10 
                hover:bg-[#4267B2]/20 rounded-lg transition-colors"
            >
              <Facebook className="w-5 h-5 text-[#4267B2]" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 px-6 py-2 bg-pink-500/20 hover:bg-pink-500/30 
              rounded-lg transition-colors text-pink-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}