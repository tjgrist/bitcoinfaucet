
export default function Header() {
    return (
        <header className="shadow-md py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <a href="#" className="font-bold text-lg">Testnet Bitcoin Faucet</a>
                <ul className="flex space-x-6">
                    <li><a href="#" className="hover:text-600">Donate</a></li>
                </ul>
            </nav>
        </header>
    )
}