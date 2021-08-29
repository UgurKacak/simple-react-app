import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Home = (props) => {
	const { t } = useTranslation();
	return (
		<Card>
			<Card.Header>{t("post-title")}</Card.Header>
			<Card.Body>
				<Card.Text style={{ textAlign: "justify", textJustify: "inter-word" }}>
					{t("post-content")}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};
export default Home;
