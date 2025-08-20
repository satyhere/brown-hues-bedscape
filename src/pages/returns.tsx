import { Link } from "react-router-dom";

export default function ReturnPolicy() {
  // Set page title
  document.title = "Return Policy | Brown Hues";
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Return & Exchange Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Return Policy</h2>
            <p>
              We offer returns and exchanges within 3 days from the date of delivery. To be eligible for a return or exchange, your item must be:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Unused and in the same condition as received</li>
              <li>In its original packaging with all tags and accessories</li>
              <li>Accompanied by the original receipt or proof of purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Non-Returnable Items</h2>
            <p>The following items cannot be returned or exchanged:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Perishable goods (e.g., flowers, food items)</li>
              <li>Personalized or custom-made products</li>
              <li>Items marked as "Final Sale" or "Non-Returnable"</li>
              <li>Products without original packaging or tags</li>
              <li>Items that have been used, damaged, or altered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our customer service team within 3 days of receiving your order</li>
              <li>Provide your order number and reason for return</li>
              <li>Our team will guide you through the return process</li>
              <li>Once approved, you'll receive return instructions</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Ship the item back to us using the provided return label</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Return Shipping</h2>
            <p>
              Customers are responsible for return shipping costs, except in cases where the return is due to our error or a defective product. We recommend using a trackable shipping service and purchasing shipping insurance for valuable items.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Process</h2>
            <p>Once we receive your returned item, we will inspect it and notify you of the status of your refund. If approved, your refund will be processed within 7-10 business days to your original method of payment. Please note that shipping fees are non-refundable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Exchanges</h2>
            <p>We only replace items if they are defective or damaged. If you need to exchange an item for a different size or color, please return the original item and place a new order for the desired item.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Damaged or Defective Items</h2>
            <p>If you receive a damaged or defective item, please contact us immediately with photos of the damage. We will arrange for a replacement or refund once we receive the damaged item back.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about our return policy, please contact us at:</p>
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
