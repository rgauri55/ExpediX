import React from 'react';
import { Compass, Boxes, Radio, ShieldAlert, RefreshCw, BookOpen, AlertTriangle, CheckCircle2, User, Users, ChevronRight, Activity, MapPin, Layers, Clock, Globe, Shield, Terminal, LogOut } from 'lucide-react';

const icons = {
  Compass,
  Boxes,
  Radio,
  ShieldAlert,
  RefreshCw,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  User,
  Users,
  ChevronRight,
  Activity,
  MapPin,
  Layers,
  Clock,
  Globe,
  Shield,
  Terminal,
  LogOut,
};

export type IconName = keyof typeof icons;

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-4 h-4', size }) => {
  const IconComponent = icons[name as IconName] || Compass;
  return <IconComponent className={className} size={size} />;
};
