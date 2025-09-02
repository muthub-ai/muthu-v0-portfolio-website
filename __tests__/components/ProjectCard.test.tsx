import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/project-card";

const mockProject = {
  title: "Test Project",
  category: "AI",
  image: "/test.jpg",
  slug: "test-project"
};

describe("ProjectCard", () => {
  it("renders project title and category", () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders project image", () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("links to the project details page", () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects/test-project");
  });
});
