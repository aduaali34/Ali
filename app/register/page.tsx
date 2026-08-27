export default function RegisterPage(){
  return (
    <section className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="mt-2 text-gray-600">Create an account to join ISN.</p>

      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-sm">Full name</label>
          <input name="name" className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" name="email" className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" name="password" className="w-full mt-1 p-2 border rounded" />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Create Account</button>
      </form>
    </section>
  )
}
