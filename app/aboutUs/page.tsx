import ContactSection from '@/components/contactSection'

export default function Page() {
  return (
    <>
      <header className="flex flex-col m-10 items-center justify-center pt-16 my-5 md:bg-[url('/aboutHeroDesk.svg')] bg-no-repeat bg-contain md:w-screen md:h-screen">
        <h1 className="lg:font-extrabold font-bold text-4xl text-center">
          Sobre CleanYa
        </h1>
        <div className="flex flex-col text-justify md:mx-64">
          <p>
            En CleanYa, somos más que una empresa de limpieza; somos una familia
            comprometida con la excelencia y el servicio excepcional. Desde
            nuestros humildes comienzos como una empresa familiar, hemos crecido
            con una pasión inquebrantable por ofrecer un servicio de limpieza
            que supere las expectativas de nuestros clientes. Valoramos
            profundamente el poder del boca a boca y la confianza que nuestros
            clientes depositan en nosotros. Es por eso que cada miembro de
            nuestro equipo se esfuerza por brindar un servicio personalizado,
            atención al detalle y resultados impecables en cada visita. Nos
            enorgullece ser una empresa que valora la honestidad, la integridad
            y la transparencia en todo lo que hacemos. Creemos que estas
            cualidades son fundamentales para construir relaciones duraderas con
            nuestros clientes y nuestra comunidad. En CleanYa, estamos
            emocionados por el futuro y por la oportunidad de crecer y
            expandirnos. Con cada cliente satisfecho, vemos una nueva
            oportunidad para hacer brillar hogares, oficinas y espacios
            comerciales en toda nuestra comunidad. Confía en CleanYa para cuidar
            de tu espacio como si fuera nuestro propio. Estamos aquí para hacer
            que tu vida sea más limpia, más brillante y más fácil.
          </p>
        </div>
      </header>

      <ContactSection />
    </>
  )
}
