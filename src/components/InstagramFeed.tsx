import { InstagramEmbed } from "react-social-media-embed";
import { motion, AnimatePresence } from "motion/react";
import { Instagram } from "lucide-react";

export function InstagramFeed() {
  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-10xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Instagram className="w-8 h-8" />
                <h2 className="text-4xl md:text-5xl tracking-wider">@BETHEMASKIN</h2>
              </div>
              <p className="text-black/60 max-w-2xl mx-auto">Follow us for skincare tips, behind-the-scenes content, and exclusive offers</p>
            </motion.div>
          </div>

          {/* Instagram Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> */}
          <div className="instagram-container pb-7">
            <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/reel/DN6CAaQjdIx/?igsh=MTB0NG95dGV3bjhwbQ==" width={328} height={608} />
            <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/p/DL-W3VWouIh/?igsh=MXhvemFzMXV1ang5aQ==" width={328} height={608} />
            <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/reel/DCE31-fO72k/?igsh=anZxanUxdnpuOGJk" width={328} height={608} />
            <InstagramEmbed className="instagram-embed" url="https://www.instagram.com/reel/DJ4KGjLI5Z-/?igsh=cnlodWo3MHg5cndi" width={328} height={608} />
          </div>
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 bg-black text-white tracking-wider hover:bg-black/80 transition-colors inline-flex items-center space-x-2 cursor-pointer"
            onClick={() => window.open("https://instagram.com/BethemaSkin", "_blank")}
          >
            <Instagram className="w-5 h-5" />
            <span>FOLLOW US ON INSTAGRAM</span>
          </motion.button>
          {/* </div> */}
        </div>
      </section>
    </>
  );
}
