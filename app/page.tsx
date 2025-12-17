import Button from "@/components/ui/Button";
import Modal, {
  ModalTrigger,
  ModalHeader,
  ModalContent,
} from "@/components/ui/Modal/Modal";

import { getContentViews } from "@/services/contentService";
import { ContentType } from "@/lib/types/content";

export default async function Home() {
  let contentTypes: ContentType[] = [];

  try {
    contentTypes = await getContentViews();
  } catch (error) {
    console.error(
      "Error fetching content views, rendering empty table.",
      error
    );
    contentTypes = [];
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 w-full max-w-4xl items-center justify-between font-mono text-sm lg:flex flex-col space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to the Headless CMS Mockup
        </h1>

        <Modal initialOpen={false}>
          <section className="w-full space-y-4 p-6 bg-white shadow-xl rounded-lg border border-green-100">
            <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
              Content Types
              <ModalTrigger>
                <Button variant="primary">Create New</Button>
              </ModalTrigger>
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
                  {contentTypes.map((type) => (
                    <tr key={type.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {type.name} (
                        <span className="text-gray-500 italic">
                          {type.slug}
                        </span>
                        )
                        <p className="text-xs text-gray-400 mt-1">
                          {type.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {type.fieldsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {type.lastUpdated.toLocaleDateString()}{" "}
                        {type.lastUpdated.toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <ModalContent>
            <ModalHeader title="Test Modal - Simple Content" />
            <div className="p-4">
              <p>
                Si ves este mensaje, el Modal Compound Component y el Data
                Fetching RSC funcionan correctamente.
              </p>
              <ModalTrigger>
                <Button variant="secondary" className="mt-4">
                  Close Modal
                </Button>
              </ModalTrigger>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </main>
  );
}
