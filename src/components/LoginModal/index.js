import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LoginModal = (props) => {
	const { t } = useTranslation();

	const { show, login, handleClose } = props;

	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		password: "",
		localization: "tr"
	});

	const handleChange = (e) => {
		let key = e.target.id;
		key = key.replace("login-", "");
		setFormValues({ ...formValues, [key]: e.target.value });
	};

	const handleSubmit = (e) => {
		login(formValues);
		setFormValues({});
		handleClose();
	};

	const checkFormValues = () => {
		return formValues.name === "" || formValues.email === "" || formValues.password === ""
			? false
			: true;
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{t("login")}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate>
					<Form.Group className="mb-3" controlId="login-name">
						<Form.Label>{t("input-name")}</Form.Label>
						<Form.Control
							type="text"
							placeholder={t("input-name-placeholder")}
							required
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="login-email">
						<Form.Label>{t("input-email")}</Form.Label>
						<Form.Control
							type="email"
							placeholder={t("input-email-placeholder")}
							required
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="login-password">
						<Form.Label>{t("input-password")}</Form.Label>
						<Form.Control
							type="password"
							placeholder={t("input-password-placeholder")}
							required
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="login-localization">
						<Form.Label>{t("input-localization")}</Form.Label>
						<Form.Select aria-label="Localization" onChange={handleChange}>
							<option disabled>{t("input-localization-placeholder")}</option>
							<option value="tr">T??rk??e</option>
							<option value="en">English</option>
						</Form.Select>
					</Form.Group>
					{!checkFormValues() ? <Alert variant="danger">{t("fill-all-login-info")}</Alert> : null}
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							{t("button-cancel")}
						</Button>
						<Button
							variant="primary"
							disabled={!checkFormValues()}
							onClick={handleSubmit}>
							{t("button-login")}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default LoginModal;
