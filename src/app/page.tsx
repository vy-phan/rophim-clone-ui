import { redirect } from 'next/navigation';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
export default function Page() {
    redirect('/phimhay');
}
