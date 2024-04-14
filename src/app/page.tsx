import Form from "./Form";
import Transactions from "./Transactions";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <Form />
      <Transactions />
    </main>
  );
}
