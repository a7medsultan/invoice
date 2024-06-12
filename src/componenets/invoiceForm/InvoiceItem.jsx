import PropTypes from "prop-types";
import { useState } from "react";
import { Form } from "react-bootstrap";
export default function InvoiceItem({
  component,
  invTableRows,
  setComponents,
  invoiceData,
  setInvoiceData,
}) {
  const [invoiceItem, setInvoiceItem] = useState({});

  function handleChange(value, field) {
    let newComponent = structuredClone(component);
    switch (field) {
      case "itemDesc":
        newComponent.itemDesc = value;

        break;
      case "qty":
        newComponent.qty = parseFloat(value);
        newComponent = recalculate(newComponent);
        break;
      case "unitPrice":
        newComponent.unitPrice = parseFloat(value);
        newComponent = recalculate(newComponent);
        break;
      case "discPercent":
        newComponent.discountPercent = parseFloat(value);
        newComponent = recalculate(newComponent);
        break;
      default:
        console.error(`Unknown field: ${field}`);
        break;
    }
    setInvoiceItem(newComponent);
    // Create a new array with the updated component
    const updatedRows = invTableRows.map((item) =>
      item.id === component.id ? newComponent : item
    );

    // Update the state with the new array
    setComponents(updatedRows);

    calculateTotals(updatedRows);
  }

  function recalculate(component) {
    let total = parseFloat(component.qty * component.unitPrice);
    let discountValue = parseFloat((total * component.discountPercent) / 100);

    let taxValue = parseFloat(
      ((total - discountValue) * invoiceData.taxPercent) / 100
    );
    console.log(taxValue);
    let amount = parseFloat(total - discountValue + taxValue);

    component.discountValue = discountValue.toFixed(2);
    component.total = total.toFixed(2);
    component.taxValue = taxValue.toFixed(2);
    component.amount = amount.toFixed(2);
    return component;
  }

  function calculateTotals(updatedRows) {
    let total = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    updatedRows.forEach((item) => {
      total += parseFloat(item.total);
      totalDiscount += parseFloat(item.discountValue);
      totalTax += parseFloat(item.taxValue);
    });
    const grandTotal = parseFloat(
      total -
        totalDiscount +
        totalTax +
        invoiceData.shipping +
        invoiceData.otherCharges
    );

    setInvoiceData((prevData) => ({
      ...prevData,
      total: total.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalTax: totalTax.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    }));
  }

  return (
    <>
      <tr>
        <td className="text-center">{invoiceItem.id}</td>
        <td style={{ width: "25%" }}>
          <Form.Control
            as="textarea"
            plaintext
            defaultValue={invoiceItem.itemDesc}
            placeholder="item description"
            onChange={(e) => handleChange(e.target.value, "itemDesc")}
          />
        </td>
        <td>
          <Form.Control
            className="text-center"
            plaintext
            defaultValue={invoiceItem.qty}
            placeholder="10"
            onChange={(e) => handleChange(e.target.value, "qty")}
          />
        </td>
        <td>
          <Form.Control
            className="text-center"
            plaintext
            placeholder="Unit Price"
            aria-label="Unit Price"
            aria-describedby="basic-addon1"
            defaultValue={invoiceItem.unitPrice}
            onChange={(e) => handleChange(e.target.value, "unitPrice")}
          />
        </td>
        <td>
          <Form.Control
            className="text-center"
            plaintext
            defaultValue={invoiceItem.total}
            readOnly
          />
        </td>
        <td>
          <Form.Control
            className="text-center"
            plaintext
            defaultValue={invoiceItem.discountPercent && 0}
            onChange={(e) => handleChange(e.target.value, "discPercent")}
          />
        </td>
        <td>
          <Form.Control
            className="text-center"
            plaintext
            defaultValue={invoiceItem.taxValue}
            readOnly
          />
        </td>
        <td>
          <Form.Control
            className="text-center"
            plaintext
            defaultValue={invoiceItem.amount}
            readOnly
          />
        </td>
      </tr>
    </>
  );
}

InvoiceItem.propTypes = {
  component: PropTypes.shape({
    id: PropTypes.number,
    itemDesc: PropTypes.string,
    qty: PropTypes.number,
    unitPrice: PropTypes.number,
    total: PropTypes.number,
    discountPercent: PropTypes.number,
    discountValue: PropTypes.number,
    taxPercent: PropTypes.number,
    taxValue: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  invTableRows: PropTypes.array.isRequired,
  setComponents: PropTypes.func.isRequired,
  invoiceData: PropTypes.shape({
    taxPercent: PropTypes.number,
    discountPercent: PropTypes.number,
    totalExTax: PropTypes.number,
    shipping: PropTypes.number,
    otherCharges: PropTypes.number,
  }).isRequired,
  setInvoiceData: PropTypes.func.isRequired,
};
