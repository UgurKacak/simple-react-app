import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function App() {
	const localization = useSelector((state) => state.localization);
	const { i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(localization);
	}, [localization, i18n]);

	return <AppRoutes />;
}

export default App;
