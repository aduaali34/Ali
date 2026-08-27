export default function Footer(){
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="container mx-auto p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Intentional Students Network. All rights reserved.
      </div>
    </footer>
  )
}
