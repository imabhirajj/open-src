import {
  Compass,
  Sparkles,
  MoveRight,
  Code,
  Code2,
  SearchCheck,
  GitPullRequest,
} from 'lucide-react';
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SkillSelector from '../components/SkillSelector';
import { GITHUB_REPO_URL } from '../config/site';

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  const handleSkillChange = (skill) => {
    // Auto-navigate to explore page showing issues for the selected skill
    navigate('/explore', { state: { selectedSkills: [skill] } });
  };

  return (
    <div className="w-full flex justify-center pb-16 md:pb-20">
      <div className="w-full mt-2 sm:mt-6 flex flex-col items-center">
        {/* Signature Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative overflow-hidden rounded-3xl mb-12 md:mb-16 border border-white/10 shadow-2xl bg-linear-to-br from-[#0f1730]/95 via-[#131b38]/90 to-[#181033]/95"
        >
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/25 rounded-full blur-[90px]" />
          <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(124,137,255,0.12),transparent_35%)]" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-10 py-20 md:py-28 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
                Welcome to Open Source Navigator
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Make Your First <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-cyan-300 to-violet-300">Open Source Contribution</span> 🚀
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-medium text-foreground/90 max-w-2xl leading-relaxed mb-3"
            >
              Find your first open source issue in under 2 minutes.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
            >
              No experience needed. We guide you step-by-step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                to="/explore"
                state={{ selectedSkills }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-primary-foreground bg-primary rounded-full overflow-hidden transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(124,137,255,0.55)] hover:shadow-[0_0_40px_-5px_rgba(124,137,255,0.7)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  <GitPullRequest className="w-5 h-5" />
                  Start Your First PR
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-foreground bg-white/5 hover:bg-white/10 rounded-full border border-white/15 backdrop-blur-sm transition-all duration-200 ease-in-out hover:scale-[1.02] hover:border-white/30 active:scale-[0.98]"
              >
                <Code className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>

        <section className="w-full mb-12 md:mb-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-8 sm:px-10 text-center shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Start Without Fear
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Open source is for learners too. You can begin today, one small step at a time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm sm:text-base">
              <p className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-foreground/90">
                No experience needed
              </p>
              <p className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-foreground/90">
                Start with small contributions
              </p>
              <p className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-foreground/90">
                Everyone makes their first PR
              </p>
            </div>
          </div>
        </section>

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

        <section className="w-full mt-14 md:mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Three simple steps to go from learning to contributing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-200 ease-in-out hover:-translate-y-1.5 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Select Your Skill</h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose the technology you know best to get tailored issue recommendations.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-200 ease-in-out hover:-translate-y-1.5 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <SearchCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Explore Beginner-Friendly Issues</h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse curated issues with scores to quickly find approachable tasks.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-200 ease-in-out hover:-translate-y-1.5 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Make Your First Pull Request</h3>
              <p className="text-muted-foreground leading-relaxed">
                Follow the guidance, push your fix, and open your first PR with confidence.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
