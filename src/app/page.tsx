import Form from "./Form";
import Transactions from "./Transactions";
import WalletInfo from "./WalletInfo";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <Form />
        <WalletInfo />
      </div>
      <Transactions />
    </main>
  );
}
