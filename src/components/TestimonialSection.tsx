
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instagram Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-6 rounded-xl"
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-secondary/20">
              {/* Instagram Reel Embed */}
              <div className="w-full h-full flex items-center justify-center">
                Instagram Reel
              </div>
            </div>
          </motion.div>

          {/* Written Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="glass p-6 rounded-xl">
                <div className="flex gap-1 mb-2">
                  {Array(5).fill(null).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Amazing quality and perfect fit for my room! The delivery was smooth
                  and the team was very professional."
                </p>
                <div className="font-semibold">Happy Customer</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
