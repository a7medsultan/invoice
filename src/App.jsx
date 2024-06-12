import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import InvTable from "./componenets/InvTable";
import InvForm from "./componenets/InvForm";
import { useState } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">{t("appName")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">{t("dashboard")}</Nav.Link>
              <Nav.Link href="#link">{t("invoices")}</Nav.Link>
              <NavDropdown title={t("language")} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => changeLanguage("en")}>
                  {t("english")}
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={() => changeLanguage("ar")}>
                  {t("arabic")}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="my-5">
          <Col>
            {formVisible ? (
              <InvForm setFormVisible={setFormVisible} />
            ) : (
              <InvTable setFormVisible={setFormVisible} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
