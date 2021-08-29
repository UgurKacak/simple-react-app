import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error = (props) => {
	const { t } = useTranslation();
	return (
		<div className="row justify-content-center">
			<div className="col-md-12 text-center">
				<span className="display-1 d-block">404</span>
				<div className="mb-4 lead">{t("404-text")}</div>
				<Link to="/">{t("404-link")}</Link>
			</div>
		</div>
	);
};
export default Error;
