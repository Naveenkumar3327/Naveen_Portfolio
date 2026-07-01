import { NextResponse } from 'next/server';

// Segment Cache configuration: revalidate cache every 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/Naveenkumar3327/repos?per_page=100&sort=updated', {
      headers: { 'User-Agent': 'Naveen-Portfolio' },
      next: { revalidate: 300 } // fallback double-guarantee for cache
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status: ${res.status}`);
    }

    const repos = await res.json();

    if (!Array.isArray(repos)) {
      throw new Error('GitHub API response is not an array');
    }

    // Technology mappings from lowercase keys to clean, display-ready tag names
    const TECH_MAP: Record<string, string> = {
      'nextjs': 'Next.js',
      'next.js': 'Next.js',
      'react': 'React.js',
      'reactjs': 'React.js',
      'react.js': 'React.js',
      'mongodb': 'MongoDB',
      'express': 'Express.js',
      'expressjs': 'Express.js',
      'nodejs': 'Node.js',
      'node': 'Node.js',
      'python': 'Python',
      'typescript': 'TypeScript',
      'javascript': 'JavaScript',
      'html': 'HTML',
      'css': 'CSS',
      'tailwind': 'Tailwind CSS',
      'tailwindcss': 'Tailwind CSS',
      'java': 'Java',
      'flask': 'Flask',
      'django': 'Django',
      'postgresql': 'PostgreSQL',
      'firebase': 'Firebase',
      'websockets': 'WebSockets',
      'framer-motion': 'Framer Motion'
    };

    // Filter out:
    // 1. Repository for the portfolio itself (Naveen_Portfolio or names containing "portfolio" case-insensitively)
    // 2. Forked repositories (we only want the user's original work)
    const filteredRepos = repos.filter((repo: any) => {
      const nameLower = repo.name.toLowerCase();
      const isPortfolio = nameLower.includes('portfolio') || nameLower === 'portfolio';
      return !isPortfolio && !repo.fork;
    });

    const projects = filteredRepos.map((repo: any) => {
      // Clean title format: replace hyphens/underscores with spaces and capitalize each word
      // e.g., "notes-taking-application" -> "Notes Taking Application"
      const title = repo.name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

      // Aggregate technologies used using both primary language and topic tags
      const techSet = new Set<string>();
      
      if (repo.language) {
        const langLower = repo.language.toLowerCase();
        techSet.add(TECH_MAP[langLower] || repo.language);
      }

      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((topic: string) => {
          const topicLower = topic.toLowerCase();
          techSet.add(TECH_MAP[topicLower] || topic.charAt(0).toUpperCase() + topic.slice(1));
        });
      }

      // Format technologies as a clean list, limited to 5 items to avoid visual clutter
      const tech = Array.from(techSet).slice(0, 5);
      if (tech.length === 0) {
        tech.push('Project');
      }

      return {
        id: repo.id.toString(),
        title,
        description: repo.description || 'A software application built and maintained on GitHub.',
        tech,
        liveUrl: repo.homepage || repo.html_url,
        gitUrl: repo.html_url,
        image: 'github_repo' // placeholder string matching interface expectations
      };
    });

    return NextResponse.json({
      success: true,
      projects
    });
  } catch (error: any) {
    console.error('Error fetching dynamic projects from GitHub:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch repositories'
    }, { status: 500 });
  }
}
