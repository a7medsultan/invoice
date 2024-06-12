import PropTypes from "prop-types";
import { Badge, Dropdown } from "react-bootstrap";
import {
  FaEllipsisVertical,
  FaTrashCan,
  FaEye,
  FaPenToSquare,
} from "react-icons/fa6";
export default function TRow({ invoice, index }) {
  const badgeBG = (() => {
    switch (invoice.status.toLowerCase()) {
      case "pending":
        return "warning";
      case "paid":
        return "success";
      default:
        return "danger";
    }
  })();

  return (
    <>
      <tr key={invoice.id}>
        <td>{++index}</td>
        <td>{invoice.Date}</td>
        <td>{invoice.DueDate}</td>
        <td>{invoice.InvoiceNo}</td>
        <td>{invoice.Amount}</td>
        <td>{invoice.Customer}</td>
        <td className="text-center">
          <Badge className="p-2" pill bg={badgeBG}>
            {invoice.status}
          </Badge>
        </td>
        <td>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <FaEllipsisVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <FaPenToSquare className="mx-2" />
                edit
              </Dropdown.Item>

              <Dropdown.Item href="#/action-3">
                <FaEye className="mx-2" />
                view
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" href="#/action-2">
                <FaTrashCan className="mx-2" />
                delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
}

TRow.propTypes = {
  invoice: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Date: PropTypes.string.isRequired,
    DueDate: PropTypes.string.isRequired,
    InvoiceNo: PropTypes.string.isRequired,
    Amount: PropTypes.string.isRequired,
    Customer: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
