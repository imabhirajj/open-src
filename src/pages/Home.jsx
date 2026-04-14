import { Compass, Sparkles, MoveRight, Code } from 'lucide-react';
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SkillSelector from '../components/SkillSelector';

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  const handleSkillChange = (skill) => {
    // Auto-navigate to explore page showing issues for the selected skill
    navigate('/explore', { state: { selectedSkills: [skill] } });
  };

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-full max-w-7xl mt-4 sm:mt-8 flex flex-col items-center">
        {/* Modern Gradient Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative overflow-hidden bg-white/5 backdrop-blur-2xl rounded-3xl mb-16 py-20 md:py-32 px-6 flex flex-col items-center text-center shadow-2xl border border-white/10"
        >
          {/* Glass mesh grid background overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC00MHY0MGg0MFYweiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDAuNWg0ME0wIDQwLjVoNDBNMC41IDB2NDBNMzkuNSAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50"></div>
          
          <div className="relative z-10 max-w-4xl flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary/90 tracking-wide">Next-Gen Contribution</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-foreground leading-[1.1]"
            >
              Open Source navigation <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-ring">made simple.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-medium"
            >
              Discover, explore, and contribute to amazing open-source projects tailored specifically to your toolkit and skill level.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <Link 
                to="/explore" 
                state={{ selectedSkills }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(46,125,50,0.5)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  Start Exploring
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-foreground bg-muted/50 hover:bg-muted rounded-2xl border border-border backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              >
                <Code className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>

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
      </div>
    </div>
  );
}
