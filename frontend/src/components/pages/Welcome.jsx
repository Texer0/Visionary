const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

const Welcome = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">¡Bienvenido a Nuestra Plataforma!</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Descubre una nueva forma de trabajar, conectar y crecer. Únete a nuestra comunidad y
          accede a herramientas innovadoras diseñadas para ti.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
            Explorar
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-blue-600 transition">
            Más información
          </button>
        </div>
      </div>
    )
  }
  
  export default Welcome
  