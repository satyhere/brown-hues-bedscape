import { Link } from "react-router-dom";

export default function ShippingPolicy() {
  // Set page title
  document.title = "Shipping Policy | Brown Hues";
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <p>
              All orders are processed and shipped within 5 business days from the date of order confirmation. Delivery times may vary depending on your location and the shipping method selected at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Methods</h2>
            <p>We offer the following shipping methods:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days (additional charges may apply)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Areas</h2>
            <p>
              We currently ship to all major cities and towns across India. Please note that delivery times may be longer for remote areas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Order Tracking</h2>
            <p>
              Once your order has been shipped, you will receive a confirmation email with tracking information. You can use this information to track your package through our website or the courier's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Charges</h2>
            <p>
              Shipping charges are calculated based on the weight of your order and the delivery location. The exact shipping cost will be displayed at checkout before you complete your purchase.
            </p>
            <p className="mt-4">
              <strong>Note:</strong> Shipping charges are non-refundable, except in cases where the return is due to our error or a defective product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Undeliverable Packages</h2>
            <p>
              If a package is returned to us as undeliverable, we will attempt to contact you using the information provided at checkout. Additional shipping fees may apply for re-shipping the package.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about our shipping policy, please contact us at:</p>
            <address className="not-italic mt-2">
              SHIKHA PRIYADARSHINI<br />
              Carmelram, Bangalore, India<br />
              Email: [Your Contact Email]<br />
              Phone: [Your Contact Number]
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
