import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Upload, Link as LinkIcon, X, Check } from 'lucide-react';
import { GIRLFRIEND_CONFIG, PhotoSlot } from '@/src/data/girlfriendData';
import { playCutePopSound, playRomanticHarp } from '@/src/utils/soundEffects';
import { fireHeartConfetti } from '@/src/utils/confetti';

export const TwoPhotoArea: React.FC = () => {
  const [slot1, setSlot1] = useState<PhotoSlot>(GIRLFRIEND_CONFIG.photo1);
  const [slot2, setSlot2] = useState<PhotoSlot>(GIRLFRIEND_CONFIG.photo2);
  const [editingSlot, setEditingSlot] = useState<1 | 2 | null>(null);
  const [lightboxImage, setLightboxImage] = useState<PhotoSlot | null>(null);

  // Quick edit modal form states
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customCaption, setCustomCaption] = useState('');

  // Load any saved custom photos from localStorage
  useEffect(() => {
    try {
      const saved1 = localStorage.getItem('girlfriend_custom_photo1');
      if (saved1) setSlot1(JSON.parse(saved1));
      const saved2 = localStorage.getItem('girlfriend_custom_photo2');
      if (saved2) setSlot2(JSON.parse(saved2));
    } catch {
      // ignore
    }
  }, []);

  const openEditor = (slotNum: 1 | 2) => {
    playCutePopSound();
    const current = slotNum === 1 ? slot1 : slot2;
    setCustomTitle(current.title);
    setCustomCaption(current.caption);
    setCustomUrl(current.image.startsWith('data:') ? '' : current.image);
    setEditingSlot(slotNum);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    const base = editingSlot === 1 ? slot1 : slot2;
    const updated: PhotoSlot = {
      ...base,
      title: customTitle.trim() || base.title,
      caption: customCaption.trim() || base.caption,
      image: customUrl.trim() || base.image,
    };

    if (editingSlot === 1) {
      setSlot1(updated);
      try {
        localStorage.setItem('girlfriend_custom_photo1', JSON.stringify(updated));
      } catch {}
    } else {
      setSlot2(updated);
      try {
        localStorage.setItem('girlfriend_custom_photo2', JSON.stringify(updated));
      } catch {}
    }

    playRomanticHarp();
    fireHeartConfetti();
    setEditingSlot(null);
  };

  return (
    <section className="py-8 md:py-14 relative">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-200/80 px-3.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Our Two Precious Memories</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-800">
            Photo Memories 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Two special snapshots dedicated to you. Click any photo to enlarge or change it.
          </p>
        </div>

        {/* The Two Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-3xl mx-auto items-stretch">
          {/* PHOTO SLOT 1 */}
          <motion.div
            whileHover={{ y: -6, rotate: -1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white p-4 pb-6 rounded-md shadow-lg shadow-rose-100/70 border border-rose-100 flex flex-col justify-between"
            style={{ transform: `rotate(${slot1.rotation})` }}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape z-10 -rotate-1 rounded-xs pointer-events-none" />

            <div>
              {/* Image Frame */}
              <div
                onClick={() => {
                  playCutePopSound();
                  setLightboxImage(slot1);
                }}
                className="relative aspect-4/3 w-full bg-rose-50 rounded-sm overflow-hidden mb-4 border border-slate-100 cursor-pointer group"
              >
                <img
                  src={slot1.image}
                  alt={slot1.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/600x450/ffe4e6/be185d?text=Photo+1';
                  }}
                />
                <span className="absolute bottom-2 right-2 text-3xl select-none drop-shadow-sm group-hover:scale-125 transition-transform duration-300">
                  {slot1.sticker}
                </span>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                  Tap to view full
                </div>
              </div>

              {/* Text & Details */}
              <div className="text-center px-2">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-1">
                  {slot1.dateOrNote}
                </span>
                <h3 className="font-handwriting text-2xl font-bold text-slate-800 leading-tight">
                  {slot1.title}
                </h3>
                <p className="font-serif-display text-xs text-slate-600 mt-2 italic leading-relaxed">
                  "{slot1.caption}"
                </p>
              </div>
            </div>

            {/* Quick Change Button */}
            <div className="mt-4 pt-3 border-t border-dashed border-rose-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-400">Photo 1</span>
              <button
                onClick={() => openEditor(1)}
                className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-full border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Camera className="w-3 h-3" />
                <span>Change Photo</span>
              </button>
            </div>
          </motion.div>

          {/* PHOTO SLOT 2 */}
          <motion.div
            whileHover={{ y: -6, rotate: 1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white p-4 pb-6 rounded-md shadow-lg shadow-rose-100/70 border border-rose-100 flex flex-col justify-between"
            style={{ transform: `rotate(${slot2.rotation})` }}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape-lavender z-10 rotate-1 rounded-xs pointer-events-none" />

            <div>
              {/* Image Frame */}
              <div
                onClick={() => {
                  playCutePopSound();
                  setLightboxImage(slot2);
                }}
                className="relative aspect-4/3 w-full bg-rose-50 rounded-sm overflow-hidden mb-4 border border-slate-100 cursor-pointer group"
              >
                <img
                  src={slot2.image}
                  alt={slot2.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/600x450/f5d0fe/86198f?text=Photo+2';
                  }}
                />
                <span className="absolute bottom-2 right-2 text-3xl select-none drop-shadow-sm group-hover:scale-125 transition-transform duration-300">
                  {slot2.sticker}
                </span>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                  Tap to view full
                </div>
              </div>

              {/* Text & Details */}
              <div className="text-center px-2">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">
                  {slot2.dateOrNote}
                </span>
                <h3 className="font-handwriting text-2xl font-bold text-slate-800 leading-tight">
                  {slot2.title}
                </h3>
                <p className="font-serif-display text-xs text-slate-600 mt-2 italic leading-relaxed">
                  "{slot2.caption}"
                </p>
              </div>
            </div>

            {/* Quick Change Button */}
            <div className="mt-4 pt-3 border-t border-dashed border-rose-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-purple-400">Photo 2</span>
              <button
                onClick={() => openEditor(2)}
                className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-600 text-xs font-semibold rounded-full border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Camera className="w-3 h-3" />
                <span>Change Photo</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Small subtle code hint */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-slate-400 font-light">
            💡 To add photos permanently in the codebase, edit <code className="bg-rose-50 text-rose-600 px-1 py-0.5 rounded font-mono text-[10px]">photo1</code> and <code className="bg-rose-50 text-rose-600 px-1 py-0.5 rounded font-mono text-[10px]">photo2</code> in <code className="bg-rose-50 text-rose-600 px-1 py-0.5 rounded font-mono text-[10px]">src/data/girlfriendData.ts</code>
          </p>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative border border-rose-100 p-4 text-center"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-600 shadow-sm cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-4/3 w-full rounded-lg overflow-hidden bg-slate-100 mb-3">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-handwriting text-2xl font-bold text-slate-800">
                {lightboxImage.title}
              </h4>
              <p className="font-serif-display text-xs text-slate-600 mt-1 italic">
                "{lightboxImage.caption}"
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK CHANGE PHOTO MODAL */}
      <AnimatePresence>
        {editingSlot !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative border border-rose-100"
            >
              <button
                onClick={() => setEditingSlot(null)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif-display text-lg font-bold text-slate-900 mb-1">
                Change Photo {editingSlot} 🌸
              </h3>
              <p className="text-[11px] text-slate-500 mb-4">
                Upload from your phone or paste an image link to view it immediately!
              </p>

              <form onSubmit={saveCustomPhoto} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Upload from Device:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-rose-100 file:text-rose-700 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Or Paste Image Link:
                  </label>
                  <input
                    type="url"
                    value={customUrl.startsWith('data:') ? '' : customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 text-xs border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Photo Title:
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full px-2.5 py-1.5 text-xs border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Cute Caption:
                  </label>
                  <input
                    type="text"
                    value={customCaption}
                    onChange={(e) => setCustomCaption(e.target.value)}
                    placeholder="Sweet caption..."
                    className="w-full px-2.5 py-1.5 text-xs border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSlot(null)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                  >
                    Update Photo ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
