import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Footer = () => {
	const { t } = useTranslation();
	return (
		<Navbar bg="dark" variant="dark" fixed="bottom">
			<Container>
				<div style={{ color: "white" }}>{t("copyright")}</div>
			</Container>
		</Navbar>
	);
};
export default Footer;
