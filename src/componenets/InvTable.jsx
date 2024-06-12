import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table, Button } from "react-bootstrap";
import invoices from "../data/invoices.json";
import TRow from "./TRow";
import { useTranslation } from "react-i18next";

export default function InvTable({ setFormVisible }) {
  const { t, i18n } = useTranslation();

  let theads = [
    "#",
    t("date"),
    t("due Date"),
    t("invoice No"),
    t("amount"),
    t("customer"),
    t("status"),
    t("action"),
  ];
  function handleNewInvoice(e) {
    e.preventDefault();
    setFormVisible(true);
  }
  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <Button
            style={{ float: "right" }}
            onClick={(e) => handleNewInvoice(e)}
            variant="primary my-3"
          >
            {t("new invoice")}
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            {theads.map((thead) => (
              <th key={thead}>{thead}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <TRow key={invoice.id} invoice={invoice} index={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

InvTable.propTypes = {
  setFormVisible: PropTypes.func.isRequired,
};
