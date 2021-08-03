import React, { useState } from "react";
// import axios from "../utils/axiosConfig";
import axios from "axios";
import "../styles/TextField.css";
const TextField = () => {
	const [search, setSearch] = useState();
	const [error, setError] = useState();
	const [stores, setStores] = useState([]);
	const [addresses, setAddresses] = useState([]);
	const [numbers, setNumbers] = useState([]);
	let liststores;
	let listaddresses;
	let listnumbers;
	const handleSearch = async (e) => {
		e.preventDefault();
		if (search.length === 5) {
			setError("");
			await axios({
				method: "POST",
				url: "/api/search",
				data: {
					search: search,
				},
			})
				.then((res) => {
					setStores(res.data.stores);
					setAddresses(res.data.addresses);
					setNumbers(res.data.numbers);
					if (res.data.error) {
						setError(res.data.error);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("Zip code is not long enough");
			setError("Zip code is not long enough");
		}
	};

	if (stores) {
		liststores = stores.map((store, idx) => {
			return <li key={idx}>{store}</li>;
		});
	}

	if (addresses) {
		listaddresses = addresses.map((address, idx) => {
			return <li key={idx}>{address}</li>;
		});
	}
	if (numbers) {
		listnumbers = numbers.map((number, idx) => {
			return <li key={idx}>{number}</li>;
		});
	}

	const handleOnChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<>
			<div className="title-container">
				<img
					src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/ddeik3s-b6f2d5ab-bce2-4a4a-8ecd-b118f3005bca.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg0ZGMxM2I3LWEyZTctNGI0NS04M2VjLTMxMWU3MmU4MjkwMFwvZGRlaWszcy1iNmYyZDVhYi1iY2UyLTRhNGEtOGVjZC1iMTE4ZjMwMDViY2EucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.M5-VPLmNnbPVuOI2kHBjNxPZrD6kCnuzA8lZZvaMuYY"
					alt="tracker"
				/>
				<div className="title">COVID-19 Vaccine Locator</div>
			</div>
			<div className="container">
				<form action="submit" onSubmit={handleSearch}>
					<label htmlFor="search">Zip Code</label>
					<input
						id="zip"
						type="text"
						pattern="[0-9]{5}"
						className="search-input"
						maxLength="5"
						onChange={handleOnChange}
					/>
					<div>{error}</div>
				</form>
			</div>

			<div className="result-container">
				<div className="store">
					<div>Stores</div>
					{liststores}
				</div>
				<div className="address">
					<div>Addresses</div>

					{listaddresses}
				</div>
				<div className="phone">
					<div>Phone Numbers</div>
					{listnumbers}
				</div>
			</div>
		</>
	);
};

export default TextField;
