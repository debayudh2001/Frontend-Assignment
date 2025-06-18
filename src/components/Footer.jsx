import { Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#002D60] text-white py-6 lg:py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
    
          <div>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-white hover:text-blue-200 transition-colors text-sm lg:text-base"
              >
                All
              </a>
              <a
                href="#"
                className="block text-white hover:text-blue-200 transition-colors text-sm lg:text-base"
              >
                Electronic
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-white hover:text-blue-200 transition-colors text-sm lg:text-base"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-white hover:text-blue-200 transition-colors text-sm lg:text-base"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 lg:w-10 lg:h-10 bg-[#0858A8] hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 lg:w-10 lg:h-10 bg-[#0858A8] hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 lg:w-10 lg:h-10 bg-[#0858A8] hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-blue-800">
          <p className="text-white text-sm lg:text-base">© 2024 American</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
