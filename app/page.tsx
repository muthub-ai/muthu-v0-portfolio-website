import type React from "react"
import { GlobeIcon, CodeIcon, BriefcaseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects } from "@/lib/data"
import { ExperienceCard } from "@/components/experience-card"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { AnimatedSection } from "@/components/animated-section"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { CredentialsSection } from "@/components/credentials-section"
import { PortfolioHeader } from "@/components/portfolio-header"
import { getExperienceInfo, getTechnicalSkillsInfo } from "@/lib/data"

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">{children}</div>
}

export default function Home() {
  const projects = getAllProjects()
  const experienceInfo = getExperienceInfo()
  const technicalSkills = getTechnicalSkillsInfo()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>
      {/* Header */}
      <PortfolioHeader />
      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Enhanced Profile Section */}
          <div className="md:sticky md:top-24 self-start">
            <AnimatedSection animation="slide-right">
              <EnhancedProfile />
            </AnimatedSection>
          </div>
          {/* Main Content Sections */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Experience Section - Expanded */}
            <AnimatedSection animation="fade-up" id="experience">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-base font-medium">Experience</h3>
                  </div>
                  <div className="space-y-6 sm:space-y-8">
                    {experienceInfo.map((experience, index) => (
                      <ExperienceCard
                        key={index}
                        title={experience.title}
                        company={experience.company}
                        period={experience.period}
                        description={experience.description}
                        achievements={experience.achievements}
                        technologies={experience.technologies}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            {/* Credentials Section */}
            <AnimatedSection animation="fade-up" id="credentials">
              <CredentialsSection />
            </AnimatedSection>
            {/* Skills Section */}
            <AnimatedSection animation="fade-up" id="skills">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-base font-medium">Technical Skills</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {technicalSkills &&
                      Object.entries(technicalSkills).map(([category, skills], idx) => (
                        <AnimatedSection
                          key={category}
                          animation={idx % 2 === 0 ? "slide-right" : "slide-left"}
                          delay={100 * (idx + 1)}
                        >
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-zinc-400">
                              {category
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, str => str.toUpperCase())
                                .replace("And", "&")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(skills) &&
                                skills.map((skill, index) => (
                                  <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                                ))}
                            </div>
                          </div>
                        </AnimatedSection>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            {/* Leadership Philosophy Section */}
            <AnimatedSection animation="fade-up" id="leadership-philosophy">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-base font-medium">Leadership Philosophy</h3>
                  </div>
                  <div className="space-y-6">
                    {/* Origin Box */}
                    <Card className="bg-zinc-900/80 border-zinc-800 shadow-md">
                      <CardContent className="p-4 sm:p-6">
                        <h4 className="text-cyan-400 text-base font-semibold mb-2">The Origin: A Passion for Solving Complex Puzzles</h4>
                        <p className="text-zinc-300 text-sm mb-2">My fascination with technology didn't begin with code; it started with a deep-seated curiosity for solving complex, large-scale puzzles. Early in my career, I was drawn to the intricate systems that power global enterprises—the digital equivalent of a city's complex infrastructure. I saw technology not as an end in itself, but as the most powerful tool for bringing order to chaos, for creating efficiency where there was friction, and for building platforms that could unlock human potential at an unprecedented scale.</p>
                        <p className="text-zinc-300 text-sm">This perspective has been the driving force behind my two-decade journey. It has taken me from managing middleware platforms to architecting petabyte-scale data ecosystems and pioneering enterprise-grade Generative AI. Each step has reinforced my core belief: the greatest value of technology lies in its ability to solve tangible business problems and create elegant, scalable solutions for the most demanding challenges. This journey has been less about mastering specific technologies and more about mastering the art of applying technology to drive meaningful and measurable business outcomes.</p>
                      </CardContent>
                    </Card>
                    {/* Philosophy Box */}
                    <Card className="bg-zinc-900/80 border-zinc-800 shadow-md">
                      <CardContent className="p-4 sm:p-6">
                        <h4 className="text-cyan-400 text-base font-semibold mb-2">The Philosophy: Extreme Ownership and Collaborative Leadership</h4>
                        <p className="text-zinc-300 text-sm mb-2">My leadership philosophy is founded on a simple but powerful principle: <strong>Extreme Ownership</strong>. To me, this is the bedrock of accountability and high performance. It means taking full responsibility for every outcome, both successes and failures. It’s about understanding precisely why something happened and then creating a clear, decisive plan to move forward, ensuring we learn from every experience.</p>
                        <p className="text-zinc-300 text-sm mb-2">I have found that when a leader genuinely embodies this principle, it becomes a cultural catalyst. It empowers every individual on the team to take the same level of ownership over their work, fostering a culture where accountability and continuous learning are the norm. This environment doesn't just inspire creativity; it builds a resilient, high-performing team that consistently produces outstanding results because everyone is invested in the mission's success.</p>
                        <p className="text-zinc-300 text-sm">However, ownership is not a solitary endeavor. It thrives in a collaborative environment built on trust, transparency, and empathy. I make a conscious effort to actively listen to every member of my team. Their diverse opinions and unique perspectives are invaluable; they open the door to new ideas and help identify flaws and inconsistencies that might otherwise be missed. By combining a culture of extreme ownership with truly collaborative leadership, we create teams that are not only effective but also innovative and prepared to tackle the most complex business challenges.</p>
                      </CardContent>
                    </Card>
                    {/* Vision Box */}
                    <Card className="bg-zinc-900/80 border-zinc-800 shadow-md">
                      <CardContent className="p-4 sm:p-6">
                        <h4 className="text-cyan-400 text-base font-semibold mb-2">The Vision: Architecting an Intelligent Future</h4>
                        <p className="text-zinc-300 text-sm mb-2">Looking ahead, I believe we are at a pivotal moment in the evolution of enterprise technology. The future is not just about being "on the cloud" or "using AI"; it's about building an intelligent, data-driven foundation that is woven into the very fabric of the business. My vision is to move beyond technology as a support function and establish it as the core driver of strategy, innovation, and competitive advantage.</p>
                        <p className="text-zinc-300 text-sm">I am passionate about architecting this future—one where secure, scalable, and ethical AI and data platforms do more than just improve efficiency. They will empower organizations to anticipate customer needs, uncover new market opportunities, and make smarter, faster decisions at every level. The goal is to create systems that don't just answer the questions we ask today, but help us discover the questions we need to ask tomorrow. By leading with a clear vision and a commitment to excellence, I aim to continue building the transformative solutions that will define the next generation of industry leaders.</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            {/* Projects Section */}
            <AnimatedSection animation="fade-up" id="recent-projects">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                      <h3 className="text-base font-medium">Key Initiatives</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {projects.map((project, index) => (
                      <AnimatedSection key={project.id} animation="zoom-in" delay={100 * (index + 1)}>
                        <ProjectCard
                          title={project.title}
                          category={project.category}
                          image={project.thumbnailImage}
                          slug={project.slug}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
      {/* Footer */}
      <AnimatedSection
        animation="fade-in"
        delay={500}
        className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500"
      >
        <p className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>
            © {new Date().getFullYear()} Muthu. All rights reserved.
          </span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400 font-medium">Last updated May 2025</span>
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <a
              href="https://stats.uptimerobot.com/iALcI93wI3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 text-xs font-medium hover:underline"
            >
              All systems normal
            </a>
          </span>
        </p>
      </AnimatedSection>
      {/* Scroll to Top Button */}
      <EnhancedScrollIndicator />

    </main>
  );
}
