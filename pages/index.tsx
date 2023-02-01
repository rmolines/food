export default function Main() {
	return (
		<div className="my-auto">
			<section className="dark:bg-gray-900">
				<div className="gap-8 items-center px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 md:py-16 lg:px-6">
					<div className="mt-4 md:mt-0">
						<h2 className="mb-4 text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white">
							Não deixe que seu conteúdo pegue poeira
						</h2>
						<p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
							Tenha uma plataforma para você expor seus conteúdos
							novos e antigos de maneira organizada e estruturada
							para seus seguidores.
						</p>
						<label
							htmlFor="input-group-1"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Entre na lista de espera
						</label>
						<div className="inline-flex w-full">
							<div className="relative grow">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
									</svg>
								</div>
								<input
									type="text"
									id="input-group-1"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Seu email..."
								/>
							</div>
							<a
								href="#"
								className="inline-flex items-center border border-primary-700 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-r-lg text-sm px-3 py-2.5 text-center dark:focus:ring-primary-900"
							>
								Inscrever
							</a>
						</div>
					</div>
					<img
						className="dark:hidden"
						src="/post.png"
						alt="dashboard image"
					/>
					{/* <img
							className="max-w-full hidden dark:block max-h-full"
							src="/mobile-app-2.svg"
							alt="dashboard image"
						/> */}
				</div>
			</section>
		</div>
	);
}
