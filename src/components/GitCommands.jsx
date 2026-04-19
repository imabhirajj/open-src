import { useState } from 'react';
import { Check, Copy, Terminal, GitBranch, Lightbulb, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const GIT_COMMANDS = [
  {
    group: "1. Global Setup & Cloning",
    icon: <Terminal className="w-5 h-5 text-primary" />,
    items: [
      { 
        cmd: 'git config --global user.name "Your Name"', 
        name: "Set Up Identity",
        desc: "Registers your name and email to your Git commits.", 
        details: "Before you can contribute, GitHub needs to know who you are! This command permanently links your identity to any code modifications you make on this computer.",
        tip: "Run this along with `git config --global user.email 'you@example.com'` exactly once when setting up a new PC."
      },
      { 
        cmd: "git clone <url>", 
        name: "Download Repository",
        desc: "Downloads an exact copy of a project from GitHub to your computer.",
        details: "Think of this as hitting 'Download' but for developers. It creates a local folder connected to the remote repository, pulling all the code, branches, and version history so you can edit it offline.",
        tip: "Copy the <url> from the green 'Code' button on the project's GitHub page."
      }
    ]
  },
  {
    group: "2. Safe Branching",
    icon: <GitBranch className="w-5 h-5 text-primary" />,
    items: [
      { 
        cmd: "git checkout -b <branch-name>", 
        name: "Create Safe Workspace",
        desc: "Creates a brand new isolated copy of the code to work on.",
        details: "In open source, you NEVER edit the main code directly. Creating a branch is like taking a photocopy of a document to draft your changes. If you break something, the main code stays perfectly safe!",
        tip: "Name branches descriptively, like 'fix-login-bug' or 'add-dark-mode'."
      },
      {
        cmd: "git switch <branch-name>",
        name: "Hop Between Branches",
        desc: "Moves your local workspace into a different branch.",
        details: "Once a branch is created, you use switch to jump between different features you are working on. Your folders will instantly update to reflect the files inside that specific branch."
      }
    ]
  },
  {
    group: "3. The Core Saving Loop",
    icon: <Check className="w-5 h-5 text-primary" />,
    items: [
      { 
        cmd: "git status", 
        name: "Check Current State",
        desc: "Shows what files you have modified.",
        details: "Whenever you are lost, type git status. It acts like a map, telling you exactly which files you've edited, which are ready to be saved, and which branch you are currently standing on."
      },
      { 
        cmd: "git add .", 
        name: "Stage Changes",
        desc: "Gathers all your modified files and prepares them to be saved.",
        details: "Think of 'git add' like putting items into a shopping cart. You are telling Git: 'Hey, I want all these modified files grouped together in my next official save point.' You can also do `git add file.js` to add specific files."
      },
      { 
        cmd: 'git commit -m "Fix login button click"', 
        name: "Permanently Save (Commit)",
        desc: "Locks in your 'staged' files into the official timeline.",
        details: "This is exactly like hitting 'Save As' with a version note. When you commit, you write a short message explaining what your code does so other maintainers can verify your intentions.",
        tip: "Always use present-tense action verbs! Say 'Add feature' instead of 'Added feature'."
      }
    ]
  },
  {
    group: "4. Syncing & Contributing",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
    items: [
      { 
        cmd: "git pull origin main", 
        name: "Fetch Latest Updates",
        desc: "Downloads new updates from the master project.",
        details: "Open source is active! While you were coding, others might have pushed changes. Always run a pull before you start coding to ensure your files are synced with the newest official version."
      },
      { 
        cmd: "git push origin <branch-name>", 
        name: "Upload Your Code",
        desc: "Pushes your local saved commits upwards to GitHub.",
        details: "Ready to share your code? Git Push uploads your branch to the cloud. After pushing, you can hop onto the GitHub website to officially open your Pull Request (PR) to the project managers!",
        tip: "You only push outward when you are ready to back up your code or submit it for review."
      }
    ]
  }
];

export default function GitCommands() {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const handleCopy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6 shadow-sm">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-primary tracking-wide">Beginner's Masterclass</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
          The Ultimate <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Git Handbook</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
          Version control is the lifeblood of open source. Don't let the terminal scare you—here is your production-grade, plain-English breakdown of exactly how developers sync, save, and safely submit code worldwide.
        </p>
      </div>

      {/* Commands Layout - Stacking them linearly for deep diving */}
      <div className="flex flex-col gap-10">
        {GIT_COMMANDS.map((section, idx) => (
          <motion.div 
            key={section.group}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="flex flex-col bg-card/60 backdrop-blur-xl border border-border rounded-4xl overflow-hidden shadow-lg"
          >
            {/* Section Header */}
            <div className="bg-primary/5 border-b border-border px-8 py-5 flex items-center gap-4">
              <div className="p-3 bg-card rounded-xl border border-border shadow-sm">
                {section.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                {section.group}
              </h3>
            </div>

            {/* Section Commands */}
            <div className="p-8 flex flex-col gap-8">
              {section.items.map((item) => (
                <div key={item.cmd} className="relative flex flex-col lg:flex-row gap-6 lg:gap-10 border-b border-border/50 pb-8 last:border-0 last:pb-0">
                  
                  {/* Left Column: Command & Description */}
                  <div className="lg:w-2/5 flex flex-col gap-3">
                    <h4 className="text-xl font-bold text-foreground/90">{item.name}</h4>
                    <p className="text-primary font-semibold text-sm tracking-wide uppercase">{item.desc}</p>
                    
                    <div className="mt-2 group relative">
                      <div className="bg-[#0a0a0a] border border-border rounded-2xl p-4 pr-12 flex flex-col gap-1 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                        <code className="text-[15px] font-mono text-[#d4d4d4] font-medium leading-relaxed whitespace-pre-wrap word-break">
                          <span className="text-primary/60 select-none mr-2">$</span>
                          {item.cmd}
                        </code>
                      </div>
                      <button 
                        onClick={() => handleCopy(item.cmd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all border border-white/5 backdrop-blur-sm"
                        title="Copy command"
                      >
                        {copiedCmd === item.cmd ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: In-depth Explanations */}
                  <div className="lg:w-3/5 flex flex-col justify-center">
                    <p className="text-muted-foreground md:text-lg leading-relaxed font-medium">
                      {item.details}
                    </p>
                    
                    {item.tip && (
                      <div className="mt-5 inline-flex items-start gap-3 bg-accent/20 border border-accent/30 rounded-xl p-4">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-foreground/80 leading-relaxed">
                          <span className="text-primary font-bold mr-1">Pro Tip:</span> 
                          {item.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
