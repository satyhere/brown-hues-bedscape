import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  // Set page title
  document.title = "Privacy Policy | Brown Hues";
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              This Privacy Policy describes how SHIKHA PRIYADARSHANI and its affiliates (collectively "SHIKHA PRIYADARSHANI, we, our, us") collect, use, share, protect or otherwise process your information/ personal data through our website brownhues.in (hereinafter referred to as Platform).
            </p>
            <p className="mt-4">
              Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship. This may include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name, date of birth, address, telephone/mobile number, email ID</li>
              <li>Information shared as proof of identity or address</li>
              <li>Bank account or credit/debit card details (processed securely)</li>
              <li>Transaction history and preferences</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>We may use your information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent security incidents and other malicious or illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners to offer you certain products, services, or promotions</li>
              <li>Law enforcement or other government officials, in response to a verified request</li>
              <li>Other parties in connection with any company transaction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify any personal data that is inaccurate</li>
              <li>Request the deletion of your personal data</li>
              <li>Restrict or object to our processing of your personal data</li>
              <li>Withdraw your consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <address className="not-italic mt-2">
              SHIKHA PRIYADARSHINI<br />
              Carmelram, Bangalore, India<br />
              Email: contact@brownhues.in<br />
              Phone: +91 9153976407
            </address>
          </section>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border">
            <Link to="/" className="text-primary hover:underline">
              &larr; Back to Home
            </Link>
      </div>
    </div>
  );
}
