import { User } from "@/lib/hooks/use-auth";
import { SignInFormValues, SignUpFormValues } from "@/lib/validations/auth";

class AuthService {
  private baseUrl = "/api/auth";

  async signUp(
    data: SignUpFormValues
  ): Promise<{ user: User; message: string }> {
    const response = await fetch(`${this.baseUrl}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Sign up failed");
    }

    return response.json();
  }

  async signIn(
    data: SignInFormValues
  ): Promise<{ user: User; message: string; token: string }> {
    const response = await fetch(`${this.baseUrl}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Sign in failed");
    }

    return response.json();
  }

  async signOut(): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/sign-out`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Sign out failed");
    }

    return response.json();
  }

  async getCurrentUser(): Promise<{ user: User }> {
    const response = await fetch(`${this.baseUrl}/me`, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get user");
    }

    return response.json();
  }
}

export const authService = new AuthService();
