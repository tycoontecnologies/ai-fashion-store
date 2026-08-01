import Container from "../layout/Container";

export default function Footer() {
  return (
    <footer className="border-t py-16">

      <Container>

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-black">
              GUESS360
            </h2>

            <p className="mt-3 text-neutral-500">
              Premium Fashion. Powered by AI.
            </p>

          </div>

          <div className="text-neutral-500">
            © 2026 Guess360
          </div>

        </div>

      </Container>

    </footer>
  );
}
