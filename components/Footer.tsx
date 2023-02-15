function Footer() {
	return (
		<footer className="p-4 dark:bg-gray-800 sm:flex sm:items-center sm:justify-between sm:p-6">
			<span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
				© 2023{" "}
				<a href="https://flowbite.com/" className="hover:underline">
					<span className="text-primary-700">Inn</span>
					fluenced™
				</a>
				. All Rights Reserved.
			</span>
			<ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<a
						href="/privacy-policy.html"
						className="mr-4 hover:underline sm:mr-6"
					>
						Privacy Policy
					</a>
				</li>
				<li>
					<a href="#" className="mr-4 hover:underline sm:mr-6">
						Licensing
					</a>
				</li>
				<li>
					<a href="#" className="hover:underline">
						Contact
					</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
