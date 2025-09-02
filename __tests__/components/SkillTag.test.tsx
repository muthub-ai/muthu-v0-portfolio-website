import { render, screen } from "@testing-library/react";
import { SkillTag } from "@/components/skill-tag";

describe("SkillTag", () => {
  it("renders children text", () => {
    render(<SkillTag>TypeScript</SkillTag>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
