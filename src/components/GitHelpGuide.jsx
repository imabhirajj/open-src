import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Compass, Rocket, AlertTriangle, Lightbulb, BookOpen, Code, GitBranch, Copy, Check, Send } from 'lucide-react';

const GUIDE_SECTIONS = [
  {
    id: 'understanding',
    title: '1. Understanding Open Source',
    icon: <Globe className="w-5 h-5" />,
    content: `**What is Open Source?**

Open source means code that anyone can view, download, and contribute to. Think of it like a shared document—anyone can suggest improvements.

**Why Contribute?**

- Learn by reading real, working code
- Build your portfolio with actual projects
- Connect with developers worldwide
- Improve tools you use every day

**Benefits for Beginners**

- No pressure—maintainers expect newbies
- Documentation issues need no coding
- Small fixes teach you the workflow
- You can ask questions publicly`
  },
  {
    id: 'choosing',
    title: '2. Choosing Issues',
    icon: <Compass className="w-5 h-5" />,
    content: `**Start with "good first issue"**

These are specifically tagged by maintainers for newcomers. They're tested and documented.

**Prefer Documentation or Small Fixes**

- Documentation: Fix typos, improve README
- Small fixes: Typos, minor bugs, formatting
- These have clear requirements

**Avoid Complex Features Initially**

Skip issues tagged:
- "architecture"
- "refactor"
- "migration"
- "performance"

These require understanding large codebases.

**Quick Signs an Issue is Good**

✓ Has "good first issue" label
✓ Few comments (not complicated)
✓ Clear description
✓ Recently updated`
  },
  {
    id: 'flow',
    title: '3. Step-by-Step Contribution Flow',
    icon: <Rocket className="w-5 h-5" />,
    content: `**1. Fork the Repository**

Click "Fork" button on GitHub. Creates your own copy.

**2. Clone Repo Locally**

git clone <your-fork-url>

**3. Create a New Branch**

git checkout -b fix-typo

**4. Make Your Changes**

Edit files, save, test if possible.

**5. Commit Changes**

git add .
git commit -m "Fix typo in README"

**6. Push to GitHub**

git push origin fix-typo

**7. Create Pull Request**

Click "Compare & Pull Request" on GitHub. Describe your changes clearly.`
  },
  {
    id: 'workflow',
    title: '4. Real Contribution Workflow',
    icon: <Rocket className="w-5 h-5" />,
    content: `**1. Find an Issue**

Browse GitHub for "good first issue" labels. Pick one that interests you.

**2. Understand the Problem**

Read the issue description carefully. Check if there's more context in comments.

**3. Explore the Codebase**

Search for relevant files. Look for similar code patterns. Understand how things work.

**4. Make a Small Change**

Start with the smallest fix possible. One file, one change at a time.

**5. Test Locally**

Run the project. Verify your change works. Break nothing else.

**6. Create Pull Request**

Push your branch. Open a PR. Explain what you changed and why.`
  },
  {
    id: 'mistakes',
    title: '5. Common Beginner Mistakes',
    icon: <AlertTriangle className="w-5 h-5" />,
    content: `**Choosing Difficult Issues**

Don't start with "help wanted" or complex features. Pick easy wins.

**Not Reading README**

Almost every repo has setup instructions. Read them first.

**Not Testing Code**

Run the project locally. Break things. Make sure your fix works.

**Large Pull Requests**

One small change = one PR. Don't fix 10 things at once.

**Giving Up After One Rejection**

Maintainers often ask for changes. That's normal! Iterate and try again.`
  },
  {
    id: 'protips',
    title: '6. Pro Tips (Advanced)',
    icon: <Lightbulb className="w-5 h-5" />,
    content: `**Read Past Pull Requests**

Check closed PRs to understand what gets accepted. Look at merged PRs.

**Search Code Before Editing**

Use GitHub's search to find similar code. Understand patterns first.

**Keep Commits Small and Clear**

- "Fix login typo"
- "Add error message"
- Bad: "Fix everything"

**Communicate in Issue Comments**

- Ask before starting work
- Don't claim issues silently
- Update on progress

**Use Draft PRs Early**

Share your approach before finishing. Get feedback early.

**Check for Contributing Guidelines**

Most repos have CONTRIBUTING.md. Read it first.`
  }
];

export default function GitHelpGuide() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-5 shadow-sm">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-primary tracking-wide">Complete Guide</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
          How to Contribute to Open Source
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-medium">
          From zero to your first pull request. Everything you need to know.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="flex flex-col gap-3">
        {GUIDE_SECTIONS.map((section, idx) => {
          const isOpen = openSection === section.id;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-primary/20 transition-all duration-200"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-primary">
                    {section.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{section.title}</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base border-t border-white/5 mt-0">
                      <p className="pt-4 font-medium">{section.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Pro Tips Highlight */}
      <div className="mt-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
        <h4 className="text-base font-bold text-amber-300 mb-4 flex items-center gap-2">
          <span className="text-lg">💡</span>
          Pro Tips
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2 text-muted-foreground">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Always start small — documentation fixes are the easiest way to contribute</span>
          </li>
          <li className="flex items-start gap-2 text-muted-foreground">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Read existing pull requests to understand the project's code style</span>
          </li>
          <li className="flex items-start gap-2 text-muted-foreground">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Keep your pull request focused on one change</span>
          </li>
          <li className="flex items-start gap-2 text-muted-foreground">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Write clear commit messages — explain what and why, not just what</span>
          </li>
        </ul>
      </div>

      {/* Quick Reference */}
      <div className="mt-10 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 rounded-2xl p-6">
        <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          Quick Git Reference
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="bg-[#0a0a0a]/80 rounded-xl p-3 border border-white/10">
            <code className="text-primary font-mono text-xs">git clone url</code>
            <p className="text-muted-foreground text-xs mt-1">Download repo</p>
          </div>
          <div className="bg-[#0a0a0a]/80 rounded-xl p-3 border border-white/10">
            <code className="text-primary font-mono text-xs">git checkout -b name</code>
            <p className="text-muted-foreground text-xs mt-1">Create branch</p>
          </div>
          <div className="bg-[#0a0a0a]/80 rounded-xl p-3 border border-white/10">
            <code className="text-primary font-mono text-xs">git add .</code>
            <p className="text-muted-foreground text-xs mt-1">Stage changes</p>
          </div>
          <div className="bg-[#0a0a0a]/80 rounded-xl p-3 border border-white/10">
            <code className="text-primary font-mono text-xs">git commit -m "msg"</code>
            <p className="text-muted-foreground text-xs mt-1">Save changes</p>
          </div>
          <div className="bg-[#0a0a0a]/80 rounded-xl p-3 border border-white/10">
            <code className="text-primary font-mono text-xs">git push origin name</code>
            <p className="text-muted-foreground text-xs mt-1">Upload to GitHub</p>
          </div>
          <div className="bg-[#0a0a0a]/80 rounded-xl p-3 border border-white/10">
            <code className="text-primary font-mono text-xs">git pull origin main</code>
            <p className="text-muted-foreground text-xs mt-1">Get latest</p>
          </div>
        </div>
      </div>
    </div>
  );
}