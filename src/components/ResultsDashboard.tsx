import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  LayoutDashboard, 
  Users, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
  User,
  Loader2
} from 'lucide-react';
import { Industry, GROWTH_LEVELS } from '../types';

interface ResultsDashboardProps {
  score: number;
  industry: Industry;
  truckCount: number;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ score, industry, truckCount }) => {
  const [booked, setBooked] = React.useState(false);
  const [isBooking, setIsBooking] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(14);
  const [selectedTime, setSelectedTime] = React.useState('10:30 AM');
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          industry,
          truckCount,
          score,
          date: selectedDate,
          time: selectedTime
        })
      });

      if (response.ok) {
        setBooked(true);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const getLevel = () => {
    if (score < 40) return 1;
    if (score < 60) return 2;
    if (score < 80) return 3;
    if (score < 95) return 4;
    return 5;
  };

  const currentLevel = getLevel();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto space-y-12 pb-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Operational Blueprint</h2>
        <p className="text-white/60">Based on your {industry} shop with {truckCount} trucks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: Health Gauge */}
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-8">Business Health Gauge</h3>
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="8"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{score}</span>
              <span className="text-xs text-white/40 font-mono">/ 100</span>
            </div>
          </div>
          <p className="mt-6 text-white/70">
            Your shop is operating at <span className="text-[#00E5FF] font-bold">{score}% efficiency</span>.
          </p>
        </div>

        {/* Section 2: Heatmap Grid */}
        <div className="glass-card p-8">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-8">Where the Money Is Leaking</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Dispatch', status: score > 70 ? 'smooth' : 'friction' },
              { label: 'Scheduling', status: score > 80 ? 'smooth' : score > 50 ? 'friction' : 'lost time' },
              { label: 'Lead Response', status: score > 60 ? 'smooth' : 'lost time' },
              { label: 'Job Tracking', status: score > 75 ? 'smooth' : 'friction' },
              { label: 'Billing', status: score > 85 ? 'smooth' : 'friction' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-medium">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded ${
                    item.status === 'smooth' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'friction' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {item.status}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'smooth' ? 'bg-green-500' :
                    item.status === 'friction' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Growth Path Ladder */}
      <div className="glass-card p-8">
        <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-10 text-center">Growth Path Ladder</h3>
        <div className="relative space-y-4">
          {GROWTH_LEVELS.map((level) => (
            <div 
              key={level.level}
              className={`relative flex items-center gap-6 p-6 rounded-2xl border transition-all ${
                currentLevel === level.level 
                  ? 'bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.1)]' 
                  : 'bg-white/5 border-white/10 opacity-40'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                currentLevel === level.level ? 'bg-[#00E5FF] text-black' : 'bg-white/10 text-white'
              }`}>
                {level.level}
              </div>
              <div>
                <h4 className="font-bold text-lg">{level.title}</h4>
                <p className="text-sm text-white/60">{level.description}</p>
              </div>
              {currentLevel === level.level && (
                <div className="ml-auto flex items-center gap-2 text-[#00E5FF] font-mono text-[10px] uppercase tracking-widest">
                  <Zap size={14} /> Current Level
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Asset Reveal */}
      <div className="glass-card p-10 border-[#00E5FF]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <ShieldCheck className="text-[#00E5FF]/20" size={120} />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6">Your Proprietary Command Center</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Company Profile</div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-sm font-bold mb-1">Elite {industry} Systems</div>
                <div className="text-xs text-white/40">{truckCount} Truck Fleet</div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">System Preview</div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex gap-4">
                <div className="w-1/2 h-24 bg-white/5 rounded-lg border border-white/5 flex flex-col p-2 gap-2">
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-2/3 bg-white/10 rounded" />
                  <div className="mt-auto flex gap-1">
                    <div className="w-4 h-4 rounded bg-[#00E5FF]/20" />
                    <div className="w-4 h-4 rounded bg-[#00E5FF]/20" />
                  </div>
                </div>
                <div className="w-1/2 h-24 bg-white/5 rounded-lg border border-white/5 flex flex-col p-2 gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#00E5FF]/20 mx-auto" />
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-1/2 bg-white/10 rounded mx-auto" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl text-white/80 mb-8 max-w-2xl">
            This isn't a subscription. It's a <span className="text-[#00E5FF] font-bold">custom system</span> built specifically for your company.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8 pt-8 border-t border-white/10">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-2">See Your Custom System</h4>
              <p className="text-white/40">Book a 20-minute strategy session based on your results.</p>
            </div>
            {booked ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500/20 border border-green-500/40 text-green-400 px-8 py-4 rounded-xl font-bold flex items-center gap-2"
              >
                <ShieldCheck size={20} /> Session Requested
              </motion.div>
            ) : showForm ? (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleBooking}
                className="w-full md:w-96 space-y-4"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input 
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#00E5FF] outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input 
                    required
                    type="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#00E5FF] outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input 
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#00E5FF] outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-[#00E5FF] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  {isBooking ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Booking'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full text-white/40 text-xs uppercase tracking-widest hover:text-white transition-all"
                >
                  Cancel
                </button>
              </motion.form>
            ) : (
              <button 
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto bg-[#00E5FF] text-black font-bold px-10 py-5 rounded-xl text-xl shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-3"
              >
                Book Strategy Session <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Calendar Mock */}
      <div className="glass-card p-8 border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <CalendarIcon className="text-[#00E5FF]" size={24} />
          <h3 className="text-xl font-bold">Select a Time</h3>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-8">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={`day-label-${i}`} className="text-center text-[10px] font-mono text-white/20 mb-2">{d}</div>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <button 
              key={`day-btn-${i}`} 
              onClick={() => setSelectedDate(i + 1)}
              className={`h-10 rounded-lg flex items-center justify-center text-sm border transition-all ${
                selectedDate === i + 1 ? 'bg-[#00E5FF] text-black border-[#00E5FF]' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'].map((t) => (
            <button 
              key={t} 
              onClick={() => setSelectedTime(t)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                selectedTime === t ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' : 'bg-white/5 border-white/10 text-white/60 hover:border-[#00E5FF] hover:text-[#00E5FF]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
