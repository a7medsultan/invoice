import PropTypes from "prop-types";
import { Table, Form } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
export default function PayDetails({ invoiceData }) {
  return (
    <>
      <div>
        <h3 className="mt-5">Bank & Payment Details</h3>
        <Table hover>
          <tbody>
            <tr>
              <th>Account Holder Name</th>
              <td className="text-muted">{invoiceData.accHolder}</td>
              <td rowSpan="4">
                <p className="text-muted">scan to pay</p>
                <QRCodeSVG value="https://reactjs.org/" />,
              </td>
            </tr>
            <tr>
              <th>Account Number</th>
              <td className="text-muted">{invoiceData.bankAccountNo}</td>
            </tr>
            <tr>
              <th>Account Type</th>
              <td className="text-muted">{invoiceData.accType}</td>
            </tr>
            <tr>
              <th>Bank</th>
              <td className="text-muted">{invoiceData.bank}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <h3>Terms &amp; Conditions</h3>
        <Form.Control
          as="textarea"
          plaintext
          rows={5}
          defaultValue={invoiceData.terms}
        />
      </div>
    </>
  );
}

PayDetails.propTypes = {
  invoiceData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    accHolder: PropTypes.string.isRequired,
    bankAccountNo: PropTypes.string.isRequired,
    accType: PropTypes.string.isRequired,
    bank: PropTypes.string.isRequired,
    terms: PropTypes.string.isRequired,
  }).isRequired,
};
