import Form from "./Form";
import Transactions from "./Transactions";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Form />
      <Transactions />

    </main>
  );
}
