import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-slate-900 p-6 sticky">
            <Link to={`/`}>
                <h1 className="text-3xl font-oswald font-bold text-red-500">Movie Match</h1>
            </Link>
        </nav>
    )
}