import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal, {
  ModalTrigger,
  ModalHeader,
  ModalContent,
} from "@/components/ui/Modal/Modal";

/**
 * Root page component for the Headless CMS Project.
 * This is a React Server Component (RSC) by default.
 */
export default function Home() {
  const modalTriggerElement = (
    <ModalTrigger>
      <Button variant="primary">Open CMS Configuration</Button>
    </ModalTrigger>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm lg:flex flex-col space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to the Headless CMS Mockup
        </h1>

        {/* --- MODAL IMPLEMENTATION TEST --- */}
        <section className="w-full space-y-4 p-6 bg-white shadow-xl rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">
            Compound Component Test (Modal)
          </h2>

          <Modal initialOpen={false} trigger={modalTriggerElement}>
            <ModalHeader title="CMS Settings Management" />

            <ModalContent>
              <p className="text-gray-600 mb-4">
                This content is rendered via the Context API, proving state is
                shared without prop drilling.
              </p>

              <Input
                label="API Key"
                id="apiKey"
                type="password"
                placeholder="sk_******************"
                containerClassName="mb-4"
              />

              <div className="flex justify-end">
                <ModalTrigger>
                  <Button variant="secondary">Close</Button>
                </ModalTrigger>
              </div>
            </ModalContent>
          </Modal>
        </section>
        {/* --- END MODAL TEST --- */}

        <section className="w-full space-y-4 p-6 bg-white shadow-md rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-3">UI Component Showcase</h2>
          <Input label="Test Input" id="test" placeholder="Type something..." />
        </section>
      </div>
    </main>
  );
}
