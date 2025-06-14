import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sparkure</h3>
            <p className="text-gray-300">Where Clean Meets Cure</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/residential"
                  className="text-gray-300 hover:text-white"
                >
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/commercial"
                  className="text-gray-300 hover:text-white"
                >
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/vehicle"
                  className="text-gray-300 hover:text-white"
                >
                  Vehicle Detailing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@sparkure.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Sun 8AM-8PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Sparkure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
