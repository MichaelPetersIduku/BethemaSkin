import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs.sendForm("service_fba8wjf", "SEND_MESSAGE_TEMPLATE", e.currentTarget, "Mw6qmfKGvgSNgWDxL").then(
      () => {
        setIsLoading(false);
        setEmail("");
        toast.success("You're on the list — welcome to Bethema!");
      },
      (error) => {
        setIsLoading(false);
        console.error(error.text);
        toast.error("Something went wrong, please try again");
      }
    );
  };

  return (
    <section className="bg-[#2b2724] text-white px-6 md:px-12 lg:px-20 pt-6 pb-16">
      <div className="max-w-md mx-auto md:max-w-2xl">
        <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl mb-4">Get exclusive perks and updates</h2>
        <form onSubmit={handleSubmit} className="flex items-center justify-between border-b border-[#fbf8f3] pb-2">
          <input
            type="email"
            name="reply_to"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-transparent text-sm placeholder:text-white/70 text-white focus:outline-none flex-1"
          />
          <input type="hidden" name="from_name" value="Newsletter Signup" />
          <input type="hidden" name="message" value="New newsletter signup" />
          <button type="submit" disabled={isLoading} className="font-['Syne',_sans-serif] font-semibold text-xl shrink-0 ml-4 disabled:opacity-60">
            {isLoading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
