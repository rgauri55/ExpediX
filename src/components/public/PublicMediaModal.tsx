import React from 'react';
import { X, Play, MapPin, Compass } from 'lucide-react';
import type { PublicMediaItem } from '../../types';

interface PublicMediaModalProps {
  media: PublicMediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PublicMediaModal: React.FC<PublicMediaModalProps> = ({
  media,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full shadow-2xl overflow-hidden text-xs animate-fadeIn">
        
        {/* Media Preview Container */}
        <div className="relative bg-slate-900 aspect-video flex items-center justify-center overflow-hidden">
          <img
            src={media.image}
            alt={media.title}
            className="w-full h-full object-cover"
          />
          {media.type === 'Video' && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 text-polar-blue flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-8 h-8 ml-1 fill-current" />
              </div>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Details */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-polar-blue">
                {media.type}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 font-mono text-xs">{media.durationOrCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{media.location}</span>
            </div>
          </div>

          <h2 className="font-heading font-bold text-lg text-slate-900">
            {media.title}
          </h2>

          <p className="text-slate-600 text-xs leading-relaxed">
            {media.description}
          </p>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-polar-blue" />
              <span className="font-mono text-slate-700">{media.expedition}</span>
            </div>
            <span className="font-mono">
              ExpediX Public Media Archive
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
