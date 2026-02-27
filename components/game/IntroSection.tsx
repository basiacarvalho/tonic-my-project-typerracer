export default function IntroSection() {
  return (
    <section aria-labelledby="intro-heading" className="mb-12">
      <h2 id="intro-heading" className="sr-only">
        Game Introduction
      </h2>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-2xl shadow-sm">
        <p className="text-xl text-blue-900 leading-relaxed">
          Think you&apos;ve got quick fingers? ⌨️
          <span className="font-bold p-2">
            {" "}
            Prove it in 30 seconds! 💥{" "}
          </span>{" "}
          <br />
          Type the text below as fast as you can. Mistakes will slow you down.
        </p>
      </div>
    </section>
  );
}
