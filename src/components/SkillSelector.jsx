// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function SkillSelector({ selectedSkills = [], onSkillChange }) {
  // A predefined list of common skills
  const availableSkills = [
    'JavaScript', 'Python', 'TypeScript', 'HTML', 'Java', 
    'C++', 'CSS', 'React', 'Node.js', 'Go', 
    'Ruby', 'Rust', 'Swift', 'Kotlin', 'PHP',
    'C#', 'Dart', 'Scala', 'Vue', 'Angular'
  ];
  
  // Function to handle a skill click
  const handleSkillClick = (skill) => {
    if (onSkillChange) {
      onSkillChange(skill);
    }
  };

  return (
    <div className="w-full p-8 md:p-10 bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 my-8 relative overflow-hidden group">
      {/* Decorative hover glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors duration-200"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shadow-inner border border-primary/30">
            <Target className="w-5 h-5" />
          </div>
          Select a Skill
        </h2>
        
        {/* Skill Buttons Container */}
        <div className="flex flex-wrap gap-3 mb-8">
          {availableSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={skill}
                onClick={() => handleSkillClick(skill)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_20px_-5px_rgba(124,137,255,0.5)] border border-primary/80' 
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_15px_-5px_rgba(124,137,255,0.3)]'
                }`}
              >
                {skill}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Skills Preview Container */}
        {selectedSkills.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4"
          >
            <span className="text-sm font-medium text-slate-400">Filtering by:</span>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span 
                  key={`preview-${skill}`} 
                  className="inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-medium bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm shadow-[0_0_10px_-2px_rgba(124,137,255,0.2)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
