import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

/**
 * Root page component for the Headless CMS Project.
 * This is a React Server Component (RSC) by default in the App Router.
 * We fetch no data here, serving as a clean landing page for demonstration.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 w-full max-w-xl items-center justify-between font-mono text-sm lg:flex flex-col space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to the Headless CMS Mockup
        </h1>

        {/* Input Component Showcase */}
        <section className="w-full space-y-4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Form Component Test</h2>

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Enter a secure password"
            error={true} // Demonstrating the error state
            helperText="Password must be at least 8 characters long."
          />
        </section>

        {/* Button Component Showcase */}
        <section className="w-full space-x-4 pt-4">
          <Button
            variant="primary"
            onClick={() => console.log("Primary clicked")}
          >
            Primary Button
          </Button>
          <Button variant="secondary" disabled>
            Secondary (Disabled)
          </Button>
        </section>
      </div>
    </main>
  );
}
