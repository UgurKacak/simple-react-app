import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import LoginModal from "../../components/LoginModal";
import { Navbar, Container, Nav, Form, NavDropdown } from "react-bootstrap";
import { FaBolt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Header = () => {
	const { t } = useTranslation();

	const setGlobalState = useDispatch();
	const userName = useSelector((state) => state.name);
	const userEmail = useSelector((state) => state.email);
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

	const languageHandler = (e) => {
		setGlobalState({ type: "set", localization: e.target.value });
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

					<Nav style={{ marginRight: "10px" }}>
						<Form.Select aria-label="Localization" onChange={languageHandler}>
							<option disabled>Select Localization</option>
							<option value="en">English</option>
							<option value="tr">Türkçe</option>
						</Form.Select>
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
