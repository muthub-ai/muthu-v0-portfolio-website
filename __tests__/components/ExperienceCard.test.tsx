import { render, screen } from "@testing-library/react";
import { ExperienceCard } from "@/components/experience-card";

describe("ExperienceCard", () => {
  const props = {
    title: "Software Engineer",
    company: "Tech Corp",
    period: "2020 - 2022",
    description: "Worked on cool stuff.",
    achievements: ["Built a scalable system", "Improved performance by 50%"],
    technologies: ["React", "TypeScript", "Node.js"],
  };

  it("renders title, company, and period", () => {
    render(<ExperienceCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.company)).toBeInTheDocument();
    expect(screen.getByText(props.period)).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ExperienceCard {...props} />);
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it("renders all achievements", () => {
    render(<ExperienceCard {...props} />);
    props.achievements.forEach((ach) => {
      expect(screen.getByText(ach)).toBeInTheDocument();
    });
  });

  it("renders all technologies as badges", () => {
    render(<ExperienceCard {...props} />);
    props.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });
});
