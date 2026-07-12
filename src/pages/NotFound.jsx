import Seo from '../components/Seo'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found — ZUR Construction" />
      <section className="grid min-h-screen place-items-center bg-ink text-center text-white">
        <div className="container-wide">
          <p className="eyebrow justify-center text-accent">— Error 404</p>
          <h1 className="display mt-6 text-7xl sm:text-9xl">Off the blueprint</h1>
          <p className="mx-auto mt-6 max-w-md text-white/60">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on solid ground.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button to="/" variant="accent">Back Home</Button>
            <Button to="/projects" variant="outline-light">View Projects</Button>
          </div>
        </div>
      </section>
    </>
  )
}

