import GitCommands from '../components/GitCommands';
import GitHelpGuide from '../components/GitHelpGuide';
import { motion } from 'framer-motion';

export default function GitGuide() {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="w-full flex-1 flex flex-col items-center pb-20 pt-4"
    >
      <GitHelpGuide />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
      <GitCommands />
    </motion.div>
  );
}
