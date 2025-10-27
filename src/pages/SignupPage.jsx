import { SignupForm } from "@/components/common/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-100">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
