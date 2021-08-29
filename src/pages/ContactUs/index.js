import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";
import _ from "lodash";
import { Card, Col, Form, Button, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const ContactUs = () => {
	const { t } = useTranslation();
	const userName = useSelector((state) => state.name);
	const userEmail = useSelector((state) => state.email);

	const [validationErrors, setValidationErrors] = useState({
		name: "name is required!",
		email: "email is required!",
		phone: "phone is required!",
		message: "message is required!"
	});
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		phone: "",
		country: "TR",
		message: ""
	});

	const phoneRegExp =
		/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
	let yupSchema = Yup.object().shape({
		name: Yup.string(t('must-be-string'))
			.test(
				"empty check",
				t("not-empty"),
				function (value) {
					return value.trim() === "" ? false : true;
				}
			)
			.required(t('this-field-required')),
		email: Yup.string(t('must-be-string'))
			.email(t("email-must-be-valid"))
			.test(
				"empty check",
				t("not-empty"),
				function (value) {
					return value.trim() === "" ? false : true;
				}
			)
			.required(t('this-field-required')),
		phone: Yup.string(t('must-be-string'))
			.matches(phoneRegExp, t('invalid-phone'))
			.test(
				"empty check",
				t("not-empty"),
				function (value) {
					return value.trim() === "" ? false : true;
				}
			)
			.required(t('this-field-required')),
		country: Yup.string(t('must-be-string'))
			.max(2)
			.test(
				"empty check",
				t("not-empty"),
				function (value) {
					return value.trim() === "" ? false : true;
				}
			)
			.required(t('this-field-required')),
		message: Yup.string(t('must-be-string'))
			.test(
				"empty check",
				t("not-empty"),
				function (value) {
					return value.trim() === "" ? false : true;
				}
			)
			.required(t('this-field-required')),
	});

	useEffect(() => {
		validate();
		// eslint-disable-next-line
	}, [formValues]);

	useEffect(() => {
		setFormValues({ ...formValues, name: userName, email: userEmail });
		// eslint-disable-next-line
	}, [userEmail, userName]);

	const getErrorsFromValidationError = (validationError) => {
		const FIRST_ERROR = 0;
		return validationError.inner.reduce((errors, error) => {
			return {
				...errors,
				[error.path]: error.errors[FIRST_ERROR]
			};
		}, {});
	};

	const validate = () => {
		try {
			yupSchema.validateSync(formValues, { abortEarly: false });
			setValidationErrors({});
		} catch (error) {
			setValidationErrors(getErrorsFromValidationError(error));
		}
	};
	const countryList = [
		{ value: "TR", label: t("turkey") },
		{ value: "US", label: t("united-states-of-america") },
		{ value: "GB", label: t("united-kingdom") },
		{ value: "DE", label: t("germany") },
		{ value: "SE", label: t("sweden") },
		{ value: "KE", label: t("kenya") },
		{ value: "BR", label: t("brazil") },
		{ value: "ZW", label: t("zimbabwe") }
	];

	const handleCountryChange = (param) => {
		setFormValues({ ...formValues, country: param.value });
	};

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.id]: e.target.value });
	};

	const handleSubmit = (event) => {
		validate();
		if (_.isEmpty(validationErrors)) {
			console.log("form submitted");
			console.log(formValues);
		} else {
			console.log("Validation errors.");
		}
	};
	return (
		<Card>
			<Card.Header>Contact Us</Card.Header>
			<Card.Body>
				<Form>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="name">
							<Form.Label>{t("input-name")}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t("input-name-placeholder")}
								value={formValues.name}
								required
								onChange={handleChange}
								isValid={!validationErrors.name}
								isInvalid={!!validationErrors.name}
							/>
							<Form.Control.Feedback type="valid">{t("form-valid-feedback")}</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="email">
							<Form.Label>{t("input-email")}</Form.Label>
							<Form.Control
								type="email"
								placeholder={t("input-email-placeholder")}
								value={formValues.email}
								required
								onChange={handleChange}
								isValid={!validationErrors.email}
								isInvalid={!!validationErrors.email}
							/>
							<Form.Control.Feedback type="valid">{t("form-valid-feedback")}</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="phone">
							<Form.Label>{t("input-phone")}</Form.Label>
							<Form.Control
								type="tel"
								required
								placeholder={t("input-phone-placeholder")}
								onChange={handleChange}
								isValid={!validationErrors.phone}
								isInvalid={!!validationErrors.phone}
							/>
							<Form.Control.Feedback type="valid">{t("form-valid-feedback")}</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="country">
							<Form.Label>{t("input-country")}</Form.Label>
							<Select
								className="basic-single"
								classNamePrefix="select"
								placeholder={t("select-country")}
								isDisabled={false}
								isLoading={false}
								isClearable={false}
								isRtl={false}
								isSearchable={true}
								name="Country"
								options={countryList}
								onChange={handleCountryChange}
								required
							/>
						</Form.Group>
					</Row>

					<Form.Group className="mb-3" controlId="message">
						<Form.Label>{t("input-message")}</Form.Label>
						<Form.Control
							as="textarea"
							placeholder={t("input-message-placeholder")}
							onChange={handleChange}
							style={{ height: "100px" }}
							isValid={!validationErrors.message}
							isInvalid={!!validationErrors.message}
							required
						/>
						<Form.Control.Feedback type="valid">{t("form-valid-feedback")}</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">{validationErrors.message}</Form.Control.Feedback>
					</Form.Group>

					<Button variant="primary" onClick={handleSubmit}>
						{t("button-send-message")}
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};
export default ContactUs;
