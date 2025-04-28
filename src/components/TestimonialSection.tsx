import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-12 md:py-20 px-2 md:px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Instagram Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-4 md:p-6 rounded-xl"
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass p-4 md:p-6 rounded-xl"
              >
                <div className="flex gap-1 mb-2">
                  {Array(5).fill(null).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                  "Amazing quality and perfect fit for my room! The delivery was smooth
                  and the team was very professional."
                </p>
                <div className="font-semibold text-sm md:text-base">Happy Customer</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
