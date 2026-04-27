import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GitPullRequest, MoveRight, Code, Code2, SearchCheck } from 'lucide-react';
import SkillSelector from '../components/SkillSelector';
import { GITHUB_REPO_URL } from '../config/site';

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  const handleSkillChange = (skill) => {
    navigate('/explore', { state: { selectedSkills: [skill] } });
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-transparent mt-[-40px]">
      <main className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full px-4 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative">
          <div className="flex-1 z-10 w-full text-center md:text-left pt-10 md:pt-0">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 mb-8"
            >
              <span className="text-lg">🎯</span>
              <span className="font-data-mono text-orange-500 text-[10px] uppercase tracking-tighter">Your goal today: Make your first PR</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-h1 text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight max-w-2xl mx-auto md:mx-0"
            >
              Make Your First <span className="text-gradient">Open Source Contribution</span> 🚀
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body-lg text-lg text-slate-400 mb-6 max-w-lg mx-auto md:mx-0"
            >
              Find your first open source issue in under 2 minutes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-data-mono text-xs">
                <span className="text-emerald-400 font-bold">✓</span> No experience needed
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-data-mono text-xs">
                <span className="text-emerald-400 font-bold">✓</span> Start with small contributions
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <Link 
                to="/explore"
                className="bitcoin-gradient px-8 py-4 rounded-full text-on-primary-fixed font-bold flex items-center gap-3 orange-glow group hover:scale-[1.02] transition-transform"
              >
                <GitPullRequest className="w-5 h-5" />
                Start Your First PR
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/20 px-8 py-4 rounded-full text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all hover:scale-[1.02]"
              >
                <Code className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </div>
          
          <div className="flex-1 relative mt-16 md:mt-0 w-full flex justify-center items-center scale-90 md:scale-100">
            {/* 3D Orb Effect */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px]">
              <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border-2 border-orange-500/10 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-12 rounded-full bg-linear-to-br from-orange-500/20 to-transparent blur-2xl opacity-50"></div>
              <div className="absolute inset-24 bg-black rounded-full shadow-[0_0_100px_rgba(247,147,26,0.2)] flex flex-col items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-500">
                <GitPullRequest className="w-16 h-16 md:w-20 md:h-20 text-orange-500 mb-1 relative z-10" />
                <div className="flex items-center leading-none">
                  <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">PR</span>
                  <span className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600 tracking-tighter">Flow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Start Without Fear Banner */}
        <section className="w-full px-4 md:px-12 mb-12 flex justify-center">
          <div className=" glass-panel rounded-2xl border-orange-500/20 px-6 py-8 sm:px-10 text-center w-full max-w-4xl shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Start Without Fear
            </h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Open source is for learners too. You can begin today, one small step at a time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-data-mono">
              <p className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white/90">
                No experience needed
              </p>
              <p className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white/90">
                Start with small contributions
              </p>
              <p className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white/90">
                Everyone makes their first PR
              </p>
            </div>
          </div>
        </section>

        {/* Expertise Selection */}
        <section className="w-full px-4 md:px-12 py-12 md:py-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="font-h2 text-3xl md:text-4xl text-white mb-4">Select Your Expertise</h2>
              <p className="text-slate-400 font-body-md max-w-xl text-base md:text-lg">
                Filter the global repository index by your core technical competencies.
              </p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full"
          >
            <SkillSelector
              selectedSkills={selectedSkills}
              onSkillChange={handleSkillChange}
            />
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="w-full px-8 md:px-12 py-20 md:py-32 border-t border-white/5 overflow-hidden">
          <div className="text-center mb-20 md:mb-24">
            <h2 className="font-h2 text-3xl md:text-4xl text-white mb-4">How It Works</h2>
            <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-4">
              Three simple steps to go from learning to contributing.
            </p>
            <div className="w-24 h-1 bitcoin-gradient mx-auto rounded-full"></div>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-orange-500 via-orange-500/20 to-transparent"></div>
            
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 group">
              <div className="hidden md:block w-[42%] text-right pr-6">
                <h3 className="font-h3 text-2xl text-white mb-3">Select Your Skill</h3>
                <p className="text-slate-400 text-base leading-relaxed">Choose the technology you know best to get tailored issue recommendations.</p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bitcoin-gradient flex items-center justify-center text-black font-bold text-lg shadow-[0_0_20px_rgba(247,147,26,0.4)] shrink-0 self-start md:self-auto mx-0 md:mx-auto">
                01
              </div>
              <div className="w-full md:w-[42%] mt-6 md:mt-0 glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border-t-2 border-r-2 border-orange-500/40 hover:bg-white/5 transition-colors ml-12 md:ml-0 md:pl-8">
                <Code2 className="absolute -right-4 -bottom-4 w-40 h-40 text-white/5 group-hover:text-orange-500/10 transition-colors pointer-events-none" />
                <div className="md:hidden relative z-10">
                  <h3 className="font-h3 text-xl font-bold text-white mb-2">Select Your Skill</h3>
                  <p className="text-slate-400 text-sm">Choose the technology you know best to get tailored issue recommendations.</p>
                </div>
                <img className="w-full h-32 md:h-40 object-cover rounded-xl border border-white/10 mt-4 hidden md:block" alt="complex code on a dark monitor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2XKgCsMl-UEi8J0UD_nq1sFxYRX20dZvVcah6GeOwxFF-9ahmuhG9IUs_W0mVeII4T-69CAxtKbRL26cYA69ffpVgBlmktyKryylApc4w6I3KHHVsdIJ7WjNJ0TGvpxrTEVwLGjx98pr5ySXGcBE52ycYKAK47lYAW30v08l0hSt69poJRFZmKOHjo1WAYSiTIfOZqiXSnVnPfTJlHReUYdgg-_Jq4ebdO8hk7Cma26l4CgSZbxrJuOBgrS-0HFysGVxE3putKU0" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between mb-16 md:mb-24 group">
              <div className="hidden md:block w-[42%] text-left pl-6">
                <h3 className="font-h3 text-2xl text-white mb-3">Explore Beginner-Friendly Issues</h3>
                <p className="text-slate-400 text-base leading-relaxed">Browse curated issues with scores to quickly find approachable tasks.</p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bitcoin-gradient flex items-center justify-center text-black font-bold text-lg shadow-[0_0_20px_rgba(247,147,26,0.4)] shrink-0 self-start md:self-auto mx-0 md:mx-auto">
                02
              </div>
              <div className="w-full md:w-[42%] mt-6 md:mt-0 glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border-t-2 border-l-2 border-orange-500/40 hover:bg-white/5 transition-colors ml-12 md:ml-0 md:pr-8">
                <SearchCheck className="absolute -left-4 -bottom-4 w-40 h-40 text-white/5 group-hover:text-orange-500/10 transition-colors pointer-events-none" />
                <div className="md:hidden relative z-10">
                  <h3 className="font-h3 text-xl font-bold text-white mb-2">Explore Beginner-Friendly Issues</h3>
                  <p className="text-slate-400 text-sm">Browse curated issues with scores to quickly find approachable tasks.</p>
                </div>
                <img className="w-full h-32 md:h-40 object-cover rounded-xl border border-white/10 mt-4 hidden md:block" alt="digital data visualizations" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqK6esUePfzS-lOagxrsOc6_Cga84HBNvRkdCHxvllzgf6b93tD_0BeDa18Y1C4we3iYQgyl-OfLeBsn7SDKTbb1uK31uS9HvEgFx4-_F_l6afVUDvp6wvs-KbUFQ6RTm6tVtth8gwdGc_aaBHRi25ZUDKu7jZ5OTmYFEl0J_UQ68ArenHa-3E0dIfgH6H5lHS0duFWcXHOOd3eY1hSRDu2aXV7j2OjWp8Pr7tAjODhT0-UZsrkj0vtzXASp3Ro2Pba_-X4TxtFRI" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="hidden md:block w-[42%] text-right pr-6">
                <h3 className="font-h3 text-2xl text-white mb-3">Make Your First Pull Request</h3>
                <p className="text-slate-400 text-base leading-relaxed">Follow the guidance, push your fix, and open your first PR with confidence.</p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bitcoin-gradient flex items-center justify-center text-black font-bold text-lg shadow-[0_0_20px_rgba(247,147,26,0.4)] shrink-0 self-start md:self-auto mx-0 md:mx-auto">
                03
              </div>
              <div className="w-full md:w-[42%] mt-6 md:mt-0 glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border-t-2 border-r-2 border-orange-500/40 hover:bg-white/5 transition-colors ml-12 md:ml-0 md:pl-8">
                <GitPullRequest className="absolute -right-4 -bottom-4 w-40 h-40 text-white/5 group-hover:text-orange-500/10 transition-colors pointer-events-none" />
                <div className="md:hidden relative z-10">
                  <h3 className="font-h3 text-xl font-bold text-white mb-2">Make Your First Pull Request</h3>
                  <p className="text-slate-400 text-sm">Follow the guidance, push your fix, and open your first PR with confidence.</p>
                </div>
                <img className="w-full h-32 md:h-40 object-cover rounded-xl border border-white/10 mt-4 hidden md:block" alt="abstract architectural geometry" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjWiI8H5DRf00pRfZ6_aNby2cJ1EZ3Fcx0TnYSpf6MrCGrdcnRNdFeyDFOPlwZMMxxyJ8DnNUdXhdPYGe2fQ9JeWXcXBnmW_nektzN2QZ1mu0znQc5G9oB98ZXWmEF01uJ5mUemZqB5NrVNfKaMx3v9sqFqX1FsMiVwyOL2EwtwRN3NNV_3YzdAcPL53b-IG5XHr6iJuSvjlgQVmG8ODftLx0ILyvdHXmGUh7DPBPByPbQk4oK6jHuhypM07WGhr68cUjK0W2T6ac" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

