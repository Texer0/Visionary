function FAQ_Question({ title, description }) {
	return (
		<details className="group">
			<summary className="w-fit cursor-pointer text-lg font-medium text-gray-700 hover:text-blue-500 transition">
				{title}
			</summary>
			<p className="text-lg text-gray-600 mt-2 opacity-0 transition duration-500 ease-in-out group-open:opacity-100 group-open:translate-x-5">
				{description}
			</p>
		</details>
	)
}

export default FAQ_Question