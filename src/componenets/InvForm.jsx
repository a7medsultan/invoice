import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Form, Button, Table } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FaCirclePlus } from "react-icons/fa6";
import InvoiceItem from "./invoiceForm/InvoiceItem";
import PayDetails from "./invoiceForm/PayDetails";
import { useState } from "react";

export default function InvForm({ setFormVisible }) {
  let invoice = {
    id: 0,
    invoiceNo: "INV-0001",
    invoiceDate: getCurrentDate("-"),
    dueDate: getCurrentDate("-"),
    billedBy: "Mr, Hetsugaya Metsurogy",
    billedTo: "Mr, Sam Fisher",
    totalExTax: 0,
    discountPercent: 0,
    totalDiscount: 0,
    taxPercent: 5,
    totalTax: 0,
    shipping: 0,
    otherCharges: 0,
    adjustment: 0,
    grandTotal: 0,
    accHolder: "Ahmed Sultan",
    bankAccountNo: "83276394221124",
    accType: "saving",
    bank: "First Abu Dhabi Bank",
    terms:
      "1. You can not return Items after 3 days of the purchase \n2. Always keep a copy of the receipt for disputes",
  };

  const [invoiceData, setInvoiceData] = useState(invoice);
  const [invTableRows, setComponents] = useState([]);
  const [showPlus, setShowPlus] = useState(false);

  function getCurrentDate(separator = "") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormVisible(false);
  }

  const handleMouseEnter = () => {
    setShowPlus(true);
  };

  const handleMouseLeave = () => {
    setShowPlus(false);
  };

  function handleAddRow(e) {
    e.preventDefault();

    setComponents([
      ...invTableRows,
      {
        id: invTableRows.length + 1,
        itemDesc: "",
        qty: 1,
        unitPrice: 0,
        total: 0,
        discountPercent: 0,
        discountValue: 0,
        taxPercent: 0,
        taxValue: 0,
        amount: 0,
      },
    ]);
  }

  function numberToWords(num) {
    if (num === 0) return "zero";

    const lessThan20 = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const thousands = ["", "thousand", "million", "billion", "trillion"];

    function helper(num) {
      if (num === 0) {
        return "";
      } else if (num < 20) {
        return lessThan20[num] + " ";
      } else if (num < 100) {
        return tens[Math.floor(num / 10)] + " " + helper(num % 10);
      } else {
        return (
          lessThan20[Math.floor(num / 100)] + " hundred " + helper(num % 100)
        );
      }
    }

    function convertIntegerPart(num) {
      let result = "";
      for (let i = 0; num > 0; i++) {
        let chunk = num % 1000;
        if (chunk > 0) {
          result = helper(chunk) + thousands[i] + " " + result;
        }
        num = Math.floor(num / 1000);
      }
      return result.trim();
    }

    function convertFractionalPart(num) {
      let result = "";
      for (let digit of num) {
        result += lessThan20[digit] + " ";
      }
      return result.trim();
    }

    // Split the number into integer and fractional parts
    const [integerPart, fractionalPart] = num.toString().split(".");

    let result = convertIntegerPart(parseInt(integerPart));
    if (fractionalPart !== undefined) {
      result += " point " + convertFractionalPart(fractionalPart);
    }

    return result.trim();
  }

  function handleTotalChange(value, field) {
    console.log("change");
    let invoiceTemp = structuredClone(invoiceData);
    switch (field) {
      case "shipping":
        invoiceTemp.shipping = value;
        calculateTotals(invoiceTemp);
        break;
      case "otherCharges":
        invoiceTemp.otherCharges = parseFloat(value);
        calculateTotals(invoiceTemp);
        break;

      case "adjustment":
        invoiceTemp.adjustment = parseFloat(value);
        calculateTotals(invoiceTemp);
        break;

      default:
        console.error(`Unknown field: ${field}`);
        break;
    }
  }

  function calculateTotals(invoiceTemp) {
    let total = parseFloat(invoiceTemp.total);
    let totalDiscount = parseFloat(invoiceTemp.totalDiscount);
    let totalTax = parseFloat(invoiceTemp.totalTax);
    let shipping = parseFloat(invoiceTemp.shipping);
    let otherCharges = parseFloat(invoiceTemp.otherCharges);
    let adjustment = parseFloat(invoiceTemp.adjustment);

    const grandTotal = parseFloat(
      total - totalDiscount + totalTax + shipping + otherCharges - adjustment
    );

    console.log(grandTotal);

    setInvoiceData((prevData) => ({
      ...prevData,
      shipping: shipping.toFixed(2),
      otherCharges: otherCharges.toFixed(2),
      adjustment: adjustment.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    }));
  }
  // ===========================================================================
  return (
    <>
      <Form>
        <Row>
          <Col>
            <h1>Invoice</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Invoice #
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  defaultValue={invoiceData.invoiceNo}
                  placeholder="INV-xxxx"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Invoice Date
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  defaultValue={invoiceData.invoiceDate}
                  placeholder="2024-05-01"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Invoice Due Date
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  defaultValue={invoiceData.invoiceDate}
                  placeholder="2024-05-01"
                />
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <img src={logo} alt="" style={{ width: "200px", float: "right" }} />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="p-3 bg-secondary bg-opacity-10">
              <h4>Billed By</h4>
              <Form.Control
                as="textarea"
                plaintext
                rows={3}
                defaultValue={invoiceData.billedBy}
              />
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-secondary bg-opacity-10">
              <h4>Billed To</h4>
              <Form.Control
                as="textarea"
                plaintext
                rows={3}
                defaultValue={invoiceData.billedTo}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="mt-3">
              <Table striped hover>
                <thead className="bg-primary text-white">
                  <tr>
                    <th
                      className="text-center"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {showPlus ? (
                        <Button onClick={(e) => handleAddRow(e)} variant="link">
                          <FaCirclePlus />
                        </Button>
                      ) : (
                        "#"
                      )}
                    </th>
                    <th>item desc</th>
                    <th className="text-center">qty</th>
                    <th className="text-center">unit price </th>
                    <th className="text-center">total</th>
                    <th className="text-center">disc %</th>
                    <th className="text-center">
                      {invoiceData.taxPercent}% tax
                    </th>
                    <th className="text-center">amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invTableRows.length === 0 ? (
                    <></>
                  ) : (
                    invTableRows.map((component) => (
                      <InvoiceItem
                        key={component.id}
                        component={component}
                        invTableRows={invTableRows}
                        setComponents={setComponents}
                        invoiceData={invoiceData}
                        setInvoiceData={setInvoiceData}
                      />
                    ))
                  )}
                </tbody>
                <tfoot style={{ backgroundColor: "#999999" }}>
                  <tr>
                    <th colSpan="7"></th>
                  </tr>
                  <tr>
                    <th rowSpan="8" colSpan="5">
                      <PayDetails invoiceData={invoiceData} />
                    </th>
                    <th className="text-center h5">Total</th>
                    <th className="text-center h5"></th>
                    <th className="text-center h5">{invoiceData.total}</th>
                  </tr>
                  <tr>
                    <th className="text-center h5 text-success">Discount</th>
                    <th className="text-center h5">
                      {/* <Form.Control
                        className="text-center text-success"
                        plaintext
                        defaultValue={invoiceData.discountPercent}
                        placeholder="%"
                      /> */}
                    </th>
                    <th className="text-center h5 text-success">
                      {invoiceData.totalDiscount}
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center h5 text-danger">Total Tax</th>
                    <th className="text-center h5"></th>
                    <th className="text-center h5 text-danger">
                      {invoiceData.totalTax}
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center h5">Shipping</th>
                    <th className="text-center h5"></th>
                    <th className="text-center h5">
                      <Form.Control
                        className="text-center"
                        plaintext
                        defaultValue={invoiceData.shipping}
                        placeholder="0$"
                        onChange={(e) =>
                          handleTotalChange(e.target.value, "shipping")
                        }
                      />
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center h5">Other Charges</th>
                    <th className="text-center h5"></th>
                    <th className="text-center h5">
                      <Form.Control
                        className="text-center"
                        plaintext
                        defaultValue={invoiceData.otherCharges}
                        placeholder="0$"
                        onChange={(e) =>
                          handleTotalChange(e.target.value, "otherCharges")
                        }
                      />
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center h5">Adjustment</th>
                    <th className="text-center h5"></th>
                    <th className="text-center h5">
                      <Form.Control
                        className="text-center"
                        plaintext
                        defaultValue={invoiceData.adjustment}
                        placeholder="0.0$"
                        onChange={(e) =>
                          handleTotalChange(e.target.value, "adjustment")
                        }
                      />
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center h3">Grand Total</th>
                    <th className="text-center h3"></th>
                    <th className="text-center h3">
                      {invoiceData.grandTotal}$
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="3">
                      <hr />
                      <p className="text-muted">Invoice total in words:</p>
                      <p className="h5">
                        {numberToWords(invoiceData.grandTotal)}
                      </p>
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          </Col>
        </Row>

        <Button
          onClick={(e) => handleFormSubmit(e)}
          variant="primary"
          type="submit"
        >
          save invoice
        </Button>
      </Form>
    </>
  );
}

InvForm.propTypes = {
  setFormVisible: PropTypes.func.isRequired,
};
