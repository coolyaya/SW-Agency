import { Mail, ExternalLink } from "lucide-react";
import { SiTiktok, SiInstagram, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t py-6 text-sm text-muted-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <p>© {new Date().getFullYear()} SW Entertainment</p>
        <div className="flex items-center gap-4">
          <a href="mailto:talent@sw-ent.com" aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
          <a href="https://tiktok.com/@placeholder" aria-label="TikTok">
            <SiTiktok className="h-5 w-5" />
          </a>
          <a href="https://instagram.com/placeholder" aria-label="Instagram">
            <SiInstagram className="h-5 w-5" />
          </a>
          <a href="https://youtube.com/@placeholder" aria-label="YouTube">
            <SiYoutube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
