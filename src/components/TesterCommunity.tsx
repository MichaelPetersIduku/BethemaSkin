import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, Camera, Users } from "lucide-react";

export function TesterCommunity() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-neutral-900" />
              <span className="text-sm tracking-wider uppercase text-neutral-600">Join Our Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">Bethema Skin Tester Community</h2>
            {/* <div className="h-1 w-24 bg-neutral-900 mx-auto mb-8" /> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-sm shadow-lg p-8 md:p-12 mb-8"
          >
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              We're looking for passionate skincare enthusiasts to be part of our exclusive{" "}
              <strong className="text-neutral-900">Bethema Skin Tester Community!</strong> As a tester, you'll get early access to our products and help us
              shape the future of healthy, glowing skin.
            </p>

            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              As part of this community, we'd love for you to share before and after photos of your skin. These photos help us celebrate real results and
              inspire others on their skincare journey. By submitting your photos, you give us permission to use them respectfully for educational and marketing
              purposes.
            </p>

            <p className="text-lg text-neutral-700 leading-relaxed mb-8">
              Your input will help us improve our products and showcase real results. Be part of our journey—
              <strong className="text-neutral-900"> your skin is our north star!</strong>
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pt-8 border-t border-neutral-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 text-white rounded-full mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-lg mb-2">Early Access</h3>
                <p className="text-sm text-neutral-600">Be the first to try our new formulations</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 text-white rounded-full mb-4">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-lg mb-2">Share Results</h3>
                <p className="text-sm text-neutral-600">Document your journey with before & after photos</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 text-white rounded-full mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg mb-2">Join Community</h3>
                <p className="text-sm text-neutral-600">Connect with fellow skincare enthusiasts</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                onClick={() => window.open("https://forms.gle/fAHhL2tiuSWvcwUc7", "_blank")}
                className="inline-block bg-neutral-900 text-white px-10 py-4 hover:bg-neutral-800 transition-all duration-300 text-lg tracking-wide"
              >
                Apply to Join Now
              </motion.button>
              <p className="text-sm text-neutral-500 mt-4">Fill out a quick form to become a tester</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
