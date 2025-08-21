import { Link } from "react-router-dom";

export default function RefundPolicy() {
  // Set page title
  document.title = "Refund Policy | Brown Hues";
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Refund & Cancellation Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
            <p>
              Cancellations will only be considered if the request is made within 3 days of placing the order. However, cancellation requests may not be entertained if:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>The orders have been communicated to our sellers/merchants and they have initiated the shipping process</li>
              <li>The product is already out for delivery</li>
            </ul>
            <p className="mt-4">
              In such cases, you may choose to reject the product at the time of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Non-Returnable Items</h2>
            <p>SHIKHA PRIYADARSHANI does not accept cancellation requests for the following categories of items:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">

              <li>Products marked as "non-returnable" on the product page</li>
              <li>Personalized or made-to-order items</li>
              <li>Products without original packaging, and accessories</li>
            </ul>
            <p className="mt-4">
              However, refund/replacement may be considered if the quality of the product delivered is not as expected. Such requests must be reported within 3 days of receiving the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Damaged or Defective Items</h2>
            <p>
              In case of receipt of damaged or defective items, please report to our customer service team immediately. The request will be processed once our team has verified the issue. Please report any damage or defects within 3 days of receiving the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Warranty Claims</h2>
            <p>
              For products that come with a manufacturer's warranty, please refer any issues directly to the manufacturer as per the terms of the warranty.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Processing</h2>
            <p>
              For approved refunds, please allow up to 7 business days for the refund to be credited to your original payment method. The exact timing may vary depending on your bank or payment provider.

            </p>
            <p>For any replacement, the replacement will be shipped within 7 days and will be delivered in another 7 days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about our Refund & Cancellation Policy, please contact us at:</p>
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
