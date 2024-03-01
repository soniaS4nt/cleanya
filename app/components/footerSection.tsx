export default function FooterSection() {
  return (
    <footer className="bg-gray-100 bottom-0 p-10">
      <div className="container mx-auto">
        <p className="text-center">
          &copy; {new Date().getFullYear()} - Hecho con 💙
        </p>
      </div>
    </footer>
  )
}
