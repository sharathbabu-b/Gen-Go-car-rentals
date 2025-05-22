export default function Footer(){
    return (
    <footer className="bg-gray-900 text-white py-4 px-6 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} GEN-GO Car Rentals. All rights reserved.
      </p>
      <div className="mt-2 text-xs">
        <a href="/about" className="hover:underline mx-2">About</a>
        <a href="/terms" className="hover:underline mx-2">Terms</a>
        <a href="/privacy" className="hover:underline mx-2">Privacy</a>
      </div>
    </footer>
  );

}