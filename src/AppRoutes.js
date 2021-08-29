import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const Home = lazy(() => import("./pages/Home"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Error = lazy(() => import("./pages/Error"));

const AppRoutes = (props) => {
	return (
		<div>
			<Header />
			<Container>
				<Suspense fallback={<div>Loading... </div>}>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/contact-us" component={ContactUs} />
						<Route component={Error} />
					</Switch>
				</Suspense>
			</Container>
			<Footer />
		</div>
	);
};
export default AppRoutes;
