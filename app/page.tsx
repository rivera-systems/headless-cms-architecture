import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal, {
  ModalTrigger,
  ModalHeader,
  ModalContent,
} from "@/components/ui/Modal/Modal";

// Import fetching function (server-only capability)
import { getContentViews } from "@/services/contentService";
// Import types
import { ContentType } from "@/lib/types/content";

// Make the component asynchronous to allow 'await' calls
export default async function Home() {
  // KEY STEP: Server-Side Data Fetching (RSC)
  // This happens once, on the server, before the page is streamed.
  const contentTypes: ContentType[] = await getContentViews();

  // ... (Existing Modal and Trigger components) ...
  const modalTriggerElement = (
    <ModalTrigger>
      <Button variant="primary">Open CMS Configuration</Button>
    </ModalTrigger>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 w-full max-w-4xl items-center justify-between font-mono text-sm lg:flex flex-col space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to the Headless CMS Mockup
        </h1>

        {/* --- NEW SECTION: Content Types List (Rendered by RSC) --- */}
        <section className="w-full space-y-4 p-6 bg-white shadow-xl rounded-lg border border-green-100">
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
            Content Types
            <Button variant="primary">Create New</Button>
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name (Slug)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fields
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Mapping the fetched data */}
                {contentTypes.map((type) => (
                  <tr key={type.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {type.name} (
                      <span className="text-gray-500 italic">{type.slug}</span>)
                      <p className="text-xs text-gray-400 mt-1">
                        {type.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {type.fieldsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Formatting the date for display */}
                      {type.lastUpdated.toLocaleDateString()}{" "}
                      {type.lastUpdated.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* --- END OF SECTION --- */}

        {/* --- MODAL IMPLEMENTATION TEST --- */}
        <section className="w-full space-y-4 p-6 bg-white shadow-xl rounded-lg border border-blue-100">
          {/* ... Modal JSX (should still be fully functional) ... */}
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
      </div>
    </main>
  );
}
