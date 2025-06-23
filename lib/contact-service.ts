import { ContactFormValues, ContactSubmissionResponse } from "@/types";

class ContactService {
  private baseUrl = "/api/contact";

  async submitContactForm(
    data: ContactFormValues
  ): Promise<ContactSubmissionResponse> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to submit contact form");
    }

    return response.json();
  }
}

export const contactService = new ContactService();
