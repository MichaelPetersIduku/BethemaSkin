import { motion } from "motion/react";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const instagramPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGZsYXRsYXklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjUyNzcwODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 2845,
    comments: 134,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjBiZWF1dHl8ZW58MXx8fHwxNzY1MjUyMDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 3124,
    comments: 189,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1549427990-34b2f9d79b94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBhZXN0aGV0aWMlMjBtaW5pbWFsfGVufDF8fHx8MTc2NTI3NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 2567,
    comments: 98,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1613380832897-6942ddd40a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0cyUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjUyNzcwODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 4231,
    comments: 245,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzY1MTk0NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 1987,
    comments: 76,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1654973433534-1238e06f6b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjUxODMxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 3456,
    comments: 167,
  },
];

export function InstagramFeed1() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden bg-white cursor-pointer"
            >
              {/* Image */}
              <ImageWithFallback
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 fill-white" />
                    <span className="text-sm">{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
        </div>
      </div>
    </section>
  );
}
