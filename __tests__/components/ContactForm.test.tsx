import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/contact-form";

describe("ContactForm", () => {
  it("renders all input fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty submit", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/subject must be at least 5 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it("shows success message after submit", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Hello World" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "This is a test message." } });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
      expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument();
    });
  });
});
