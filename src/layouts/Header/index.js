import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import LoginModal from "../../components/LoginModal";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaBolt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const Header = () => {
	const { t } = useTranslation();

	const setGlobalState = useDispatch();
	const userName = useSelector((state) => state.name);
	const userEmail = useSelector((state) => state.email);
	const localization = useSelector((state) => state.localization);
	const [show, setShow] = useState(false);

	const LoginHandler = () => {
		setShow(true);
	};

	const LogOutHandler = () => {
		console.log("logout");
		setGlobalState({ type: "set", name: "", email: "", localization: "" });
	};

	const login = (formValues) => {
		console.log("Login action triggered");
		delete formValues.password;
		setGlobalState({ type: "set", ...formValues });
	};

	const handleClose = () => {
		setShow(false);
	};

	const localizationHandler = (e) => {
		setGlobalState({ type: "set", localization: e.value });
	};

	const localizationList = [
		{ value: "tr", label: "Türkçe" },
		{ value: "en", label: "English" }
	];

	const customStyles = {
		control: (base) => ({
			...base,
			width: 250,
			minWidth: 250
		})
	};
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ marginBottom: "20px" }}>
			<Container>
				<LoginModal show={show} login={login} handleClose={handleClose} />
				<LinkContainer to="/">
					<Navbar.Brand>
						<FaBolt size="30" className="d-inline-block align-top" />
						{t("home-page")}
					</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />

				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/contact-us">
							<Nav.Link>{t("contact-us")}</Nav.Link>
						</LinkContainer>
					</Nav>

					<Nav>
						<Select
							className="basic-single"
							classNamePrefix="select"
							placeholder={t("select-country")}
							isDisabled={false}
							isLoading={false}
							isClearable={false}
							isRtl={false}
							value={localization === "tr" ? localizationList[0] : localizationList[1]}
							isSearchable={false}
							name="Country"
							options={localizationList}
							onChange={localizationHandler}
							styles={customStyles}
							required
						/>
					</Nav>
					{userName === "" ? (
						<Nav>
							<Nav.Link onClick={LoginHandler}>{t("login")}</Nav.Link>
						</Nav>
					) : (
						<Nav>
							<NavDropdown title={userName} id="navbarScrollingDropdown">
								<NavDropdown.Item disabled>{userEmail}</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={LogOutHandler}>{t("logout")}</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default Header;
