"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      if (!res.ok) throw new Error("Failed to change password");
      toast.success("Password changed");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Could not change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Current Password</label>
        <Input
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          type="password"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">New Password</label>
        <Input
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          type="password"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Confirm New Password</label>
        <Input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          required
        />
      </div>
      <AnimatedButton type="submit" disabled={saving} className="w-full">
        {saving ? "Saving..." : "Change Password"}
      </AnimatedButton>
    </form>
  );
}
