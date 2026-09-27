import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Boxes, 
  Package, 
  Users, 
  ShieldAlert, 
  BookOpen, 
  ArrowRight, 
  Lock, 
  User, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';
import { DEMO_USERS } from '../data/demoData';
import { ExpediXLogo } from '../components/common/ExpediXLogo';

const capabilities = [
  { name: 'Expedition Planning', icon: Compass },
  { name: 'Logistics & Assets', icon: Boxes },
  { name: 'Inventory Management', icon: Package },
  { name: 'Personnel Movement', icon: Users },
  { name: 'Emergency Response', icon: ShieldAlert },
  { name: 'Knowledge Hub', icon: BookOpen },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRole, setSelectedRole, loginWithRole } = useAuth();
  
  const [email, setEmail] = useState<string>(DEMO_USERS[selectedRole].email);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword('••••••••••••');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const targetRoute = loginWithRole(selectedRole);
      setIsLoading(false);
      navigate(targetRoute);
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-between overflow-x-hidden font-sans select-none">
      
      {/* 1. FULL-SCREEN REAL BHARATI ANTARCTIC RESEARCH STATION PHOTOGRAPH */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bharati-station.jpg')" }}
      >
        {/* Subtle Dark Navy Overlay on Left side only so white text remains crisp & readable */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-[#041A35]/90 via-[#082D56]/55 to-transparent pointer-events-none" />
      </div>

      {/* 2. MAIN VIEWPORT CONTAINER */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 py-8 lg:py-10">
        
        {/* LEFT COLUMN: BRANDING, LIFECYCLE, HERO TITLE, CAPABILITY ROW */}
        <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col justify-between min-h-[85vh] text-white py-2">
          
          {/* TOP-LEFT BRANDING */}
          <div className="space-y-5">
            
            {/* Logo & Product Identity */}
            <div className="flex items-center gap-4">
              <ExpediXLogo
                variant="horizontal"
                theme="dark"
                size="lg"
                badge="PROTOTYPE"
              />
            </div>
            <p className="text-xs sm:text-sm text-sky-100 font-medium tracking-wide drop-shadow -mt-2">
              Integrated Polar Expedition Logistics &amp; Knowledge Platform
            </p>

            {/* Lifecycle Navigation Ribbon */}
            <div className="pt-2">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-sky-100 font-semibold flex items-center flex-wrap gap-2 drop-shadow">
                <span className="text-sky-300">PLAN</span>
                <span className="text-white/40">/</span>
                <span className="text-sky-300">MANAGE</span>
                <span className="text-white/40">/</span>
                <span className="text-sky-300">TRACK</span>
                <span className="text-white/40">/</span>
                <span className="text-sky-300">RESPOND</span>
                <span className="text-white/40">/</span>
                <span className="text-sky-300">PRESERVE</span>
                <span className="text-white/40">/</span>
                <span className="text-sky-300">DISSEMINATE</span>
              </div>
            </div>

            {/* Large Hero Heading */}
            <div className="pt-4 sm:pt-6 max-w-xl">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
                Mission Control &amp; Logistics for<br />
                Polar Scientific Expeditions
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-100/90 font-normal leading-relaxed max-w-lg drop-shadow">
                ExpediX brings expedition planning, personnel, cargo, assets, inventory, field operations, emergency response and synchronization into one operational platform.
              </p>
            </div>

          </div>

          {/* BOTTOM-LEFT: 6 CAPABILITIES ROW & MOTTO */}
          <div className="pt-10 lg:pt-8 space-y-4">
            
            {/* 6 Capabilities in a clean horizontal row with dividers */}
            <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-4 py-3 px-4 rounded-2xl bg-[#04172C]/40 backdrop-blur-md border border-white/15 max-w-3xl shadow-xl">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <React.Fragment key={cap.name}>
                    <div className="flex-1 flex flex-col items-center text-center px-1 py-0.5 min-w-[80px]">
                      <div className="w-8 h-8 rounded-lg bg-sky-400/15 text-[#38BDF8] flex items-center justify-center mb-1">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-white leading-tight">
                        {cap.name}
                      </span>
                    </div>
                    {index < capabilities.length - 1 && (
                      <div className="hidden sm:block w-[1px] h-8 bg-white/20 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Bottom Motto Quote */}
            <div className="flex items-center gap-2.5 text-xs text-sky-200/90 font-medium drop-shadow">
              <span className="w-6 h-0.5 bg-[#38BDF8] rounded-full" />
              <span>&ldquo;Supporting India&apos;s polar research for a sustainable tomorrow.&rdquo;</span>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: LARGE WHITE / ICE-WHITE LOGIN CARD (35-38% WIDTH) */}
        <div className="w-full lg:w-[38%] xl:w-[36%] max-w-[460px] my-6 lg:my-0">
          
          <div className="bg-white rounded-3xl shadow-2xl border border-white/80 p-7 sm:p-9 text-slate-800">
            
            {/* Header */}
            <div className="mb-5">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#082D56] tracking-tight">
                Welcome Back
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Sign in to continue to ExpediX Mission Portal
              </p>
            </div>

            {/* SELECT DEMO ROLE PROFILE */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  SELECT DEMO ROLE PROFILE
                </label>
                <span className="text-[10px] text-[#0B65D8] font-semibold">1-Click Auto-Fill</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(DEMO_USERS) as UserRole[]).map((roleKey) => {
                  const isSelected = selectedRole === roleKey;
                  const label = 
                    roleKey === 'command-center' ? 'Command Center' : 
                    roleKey === 'expedition-officer' ? 'Expedition Officer' :
                    roleKey === 'field-team' ? 'Field Team' : 'Researcher';

                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => handleRoleSelect(roleKey)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0B65D8] text-white border-[#0B65D8] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{label}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Demo Profile Banner */}
            <div className="p-3 mb-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#082D56] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                {DEMO_USERS[selectedRole].initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {DEMO_USERS[selectedRole].name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {DEMO_USERS[selectedRole].roleTitle}
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSignIn} className="space-y-4">
              
              {/* Email / Username Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B65D8]/30 focus:border-[#0B65D8] focus:bg-white transition-all font-medium"
                    placeholder="you@domain.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B65D8]/30 focus:border-[#0B65D8] focus:bg-white transition-all font-medium"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Session */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#0B65D8] focus:ring-[#0B65D8]/30 border-slate-300"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember session</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Bharati Station</span>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#0B65D8] hover:bg-[#0951ad] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#0B65D8]/40 focus:outline-none disabled:opacity-75"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Bottom Demo Environment Badge */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-amber-700 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/60 font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>DEMO ENVIRONMENT • SIMULATED PROTOTYPE</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
