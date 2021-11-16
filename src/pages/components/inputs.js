import React from "react"
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Col,
  Row,
} from "@trimbleinc/modus-react-bootstrap"
import { graphql } from "gatsby"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const InputsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/inputs/">
      The <code>{"<FormControl>"}</code> component renders a form control with
      Bootstrap styling. The <code>{"<FormGroup>"}</code> component wraps a form
      control with proper spacing, along with support for a label, help text,
      and validation state. To ensure accessibility, set <code>controlId</code>{" "}
      on <code>{"<FormGroup>"}</code>, and use <code>{"<FormLabel>"}</code> for
      the label.
    </Overview>

    <CodeBlock
      title="Basic Form"
      scope={{ Form, FormControl, Button, InputGroup }}
      code={`
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Regular Input</Form.Label>
    <Form.Control as="input" placeholder="Placeholder Text"></Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Input with Icon on right</Form.Label>
    <div className="input-with-icon-right">
      <Form.Control as="input" placeholder="Placeholder Text"></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">visibility</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Input with Icon on left</Form.Label>
    <div className="input-with-icon-left">
      <Form.Control as="input" placeholder="Placeholder Text"></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">search</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Input with a button</Form.Label>
    <InputGroup className="mb-2">
      <FormControl id="inlineFormInputGroup" placeholder="Placeholder Text" />
      <InputGroup.Append>
        <Button variant="outline-secondary">Go</Button>
      </InputGroup.Append>
    </InputGroup>
  </Form.Group>

  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Custom select Outlined</Form.Label>
    <Form.Control as="select" custom>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      <option>Option 4</option>
      <option>Option 5</option>
    </Form.Control>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
`}
    ></CodeBlock>
    <CodeBlock
      title="Input States"
      scope={{ Form }}
      code={`
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Label</Form.Label>
    <div className="input-with-icon-left">
      <Form.Control
        as="input"
        className="focus"
        placeholder="Focus"
      ></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">search</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Label</Form.Label>
    <div className="input-with-icon-left">
      <Form.Control as="input" isValid placeholder="Valid"></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">search</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Label</Form.Label>
    <div className="input-with-icon-left">
      <Form.Control as="input" isInvalid placeholder="Invalid"></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">search</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Label</Form.Label>
    <div className="input-with-icon-left">
      <Form.Control as="input" disabled placeholder="Disabled"></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">search</i>
      </div>
    </div>
  </Form.Group>
</Form>
`}
    >
      States can be applied to all input types.
    </CodeBlock>
    <CodeBlock
      title="Form Feedback"
      scope={{ Form }}
      code={`
<Form>
  <Form.Group controlId="validationCustom02">
    <Form.Label>Valid Feedback</Form.Label>
    <Form.Control required type="text" isValid placeholder="This is valid" />
    <Form.Control.Feedback type="valid">
      This is valid feedback
    </Form.Control.Feedback>
  </Form.Group>
  <Form.Group controlId="validationCustom02">
    <Form.Label>Valid Feedback</Form.Label>
    <Form.Control
      required
      type="text"
      isInvalid
      placeholder="This is invalid"
    />
    <Form.Control.Feedback type="invalid">
      This is invalid feedback
    </Form.Control.Feedback>
  </Form.Group>
</Form>
`}
    >
      Props <code>isValid </code> and <code>isInvalid </code> can be added to
      form controls to manually apply validation styles.
    </CodeBlock>

    <CodeBlock
      title="Large Inputs"
      scope={{ Form, FormControl, Button, InputGroup }}
      code={`
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="label-lg">Regular Input</Form.Label>
    <Form.Control
      as="input"
      size="lg"
      placeholder="Placeholder Text"
    ></Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="label-lg">Input with Icon on right</Form.Label>
    <div className="input-with-icon-right">
      <Form.Control
        as="input"
        size="lg"
        placeholder="Placeholder Text"
      ></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">visibility</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="label-lg">Input with Icon on left</Form.Label>
    <div className="input-with-icon-left">
      <Form.Control
        as="input"
        size="lg"
        placeholder="Placeholder Text"
      ></Form.Control>
      <div className="input-icon">
        <i className="modus-icon material-icons">search</i>
      </div>
    </div>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="label-lg">Input with a button</Form.Label>
    <InputGroup className="mb-2">
      <FormControl
        id="inlineFormInputGroup"
        placeholder="Placeholder Text"
        size="lg"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary">Go</Button>
      </InputGroup.Append>
    </InputGroup>
  </Form.Group>
  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label className="label-lg">Custom select Outlined</Form.Label>
    <Form.Control as="select" size="lg">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      <option>Option 4</option>
      <option>Option 5</option>
    </Form.Control>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
`}
    >
      Use <code>size</code> prop on <code>FormControl</code> and class
      <code> label-lg </code> to change the size of inputs and labels
      respectively.
    </CodeBlock>

    <CodeBlock
      title="Text Area"
      scope={{ Form }}
      code={`
<Form>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Normal Text Area</Form.Label>
    <Form.Control as="textarea" rows={2}>
      Some Text
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label className="label-lg">Normal Text Area</Form.Label>
    <Form.Control as="textarea" rows={2} size="lg">
      Some Text
    </Form.Control>
  </Form.Group>
</Form>
`}
    ></CodeBlock>

    <CodeBlock
      title="Readonly"
      scope={{ Form }}
      code={`<Form.Control type="text" placeholder="Readonly input here..." readOnly />`}
    >
      Add the <code>readOnly</code> prop on an input to prevent modification of
      the input's value. Read-only inputs appear lighter (just like disabled
      inputs), but retain the standard cursor.
    </CodeBlock>

    <CodeBlock
      title="Readonly plain text"
      scope={{ Form, Col, Row }}
      code={`
<Form>
  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      Email
    </Form.Label>
    <Col sm="10">
      <Form.Control plaintext readOnly defaultValue="email@example.com" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Password
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group>
</Form>
`}
    >
      If you want to have readonly elements in your form styled as plain text,
      use the <code>plaintext</code> prop on FormControls to remove the default
      form field styling and preserve the correct margin and padding.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="layout">
      Layout
    </LinkedHeading>
    <p>
      FormControl and FormCheck both apply <code>display: block</code> with{" "}
      <code>width: 100%</code> to controls, which means they stack vertically by
      default. Additional components and props can be used to vary this layout
      on a per-form basis.
    </p>
    <LinkedHeading h="3" className="h2" id="form-groups">
      Form groups
    </LinkedHeading>
    <CodeBlock
      scope={{ Form }}
      code={`
<Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
</Form>
`}
    >
      <p>
        The <code>FormGroup</code> component is the easiest way to add some
        structure to forms. It provides a flexible container for grouping of
        labels, controls, optional help text, and form validation messaging. By
        default it only applies margin-bottom, but it picks up additional styles
        in <code>{"<Form inline>"}</code> as needed. Use it with{" "}
        <code>fieldset</code>s, <code>div</code>s, or nearly any other element.
      </p>
      <p>
        You also add the <code>controlId</code> prop to accessibly wire the
        nested label and input together via the <code>id</code>.
      </p>
    </CodeBlock>
    <CodeBlock
      title="Form grid"
      scope={{ Form, Col, Row }}
      code={`
<Form>
  <Row>
    <Col>
      <Form.Control placeholder="First name" />
    </Col>
    <Col>
      <Form.Control placeholder="Last name" />
    </Col>
  </Row>
</Form>
`}
    >
      More complex forms can be built using the grid components. Use these for
      form layouts that require multiple columns, varied widths, and additional
      alignment options.
    </CodeBlock>

    <CodeBlock
      title="Form row"
      scope={{ Form, Col }}
      code={`
<Form>
  <Form.Row>
    <Col>
      <Form.Control placeholder="First name" />
    </Col>
    <Col>
      <Form.Control placeholder="Last name" />
    </Col>
  </Form.Row>
</Form>
`}
    >
      You may also swap <code>{"<Row>"}</code> for <code>{"<Form.Row>"}</code>,
      a variation of the standard grid row that overrides the default column
      gutters for tighter and more compact layouts.
    </CodeBlock>

    <CodeBlock
      scope={{ Form, Button, Col }}
      code={`
<Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>
  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>
  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Sign in
  </Button>
</Form>
`}
    >
      More complex layouts can also be created with the grid system.
    </CodeBlock>

    <CodeBlock
      title="Horizontal form"
      scope={{ Form, Col, Row, Button }}
      code={`
<Form>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Email
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="email" placeholder="Email" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Password
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group>
  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2} className="pt-0">
        Radios
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          custom
        />
        <Form.Check
          type="radio"
          label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          custom
        />
        <Form.Check
          type="radio"
          label="third disabled radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
          custom
          disabled
        />
      </Col>
    </Form.Group>
  </fieldset>
  <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 2 }}>
      <Form.Check label="Example Checkbox" custom />
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Col sm={{ span: 10 }}>
      <Button type="submit">Sign in</Button>
    </Col>
  </Form.Group>
</Form>
`}
    >
      <p>
        Create horizontal forms with the grid by adding the <code>Row</code> to
        form groups and using the <code>{"<Col>"}</code> to specify the width of
        your labels and controls. Be sure to add <code>column </code> prop to
        your <code>Form.Label</code> as well so they’re vertically centered with
        their associated form controls.
      </p>
      <p>
        At times, you maybe need to use margin or padding utilities to create
        that perfect alignment you need. For example, we’ve added{" "}
        <code>pt-0</code> on our stacked radio inputs label to better align the
        text baseline.
      </p>
    </CodeBlock>

    <CodeBlock
      subtitle2="Horizontal form label sizing"
      scope={{ Form, Col }}
      code={`
<Form.Group>
  <Form.Row>
    <Form.Label column lg={2}>
      Normal Text
    </Form.Label>
    <Col>
      <Form.Control type="text" placeholder="Normal text" />
    </Col>
  </Form.Row>
  <br />
  <Form.Row>
    <Form.Label column="lg" lg={2}>
      Large Text
    </Form.Label>
    <Col>
      <Form.Control size="lg" type="text" placeholder="Large text" />
    </Col>
  </Form.Row>
</Form.Group>
`}
    >
      You can size the <code>{"<FormLabel>"}</code> using the column prop.
    </CodeBlock>

    <CodeBlock
      title="Column sizing"
      scope={{ Form, Col }}
      code={`
<Form>
  <Form.Row>
    <Col xs={7}>
      <Form.Control placeholder="City" />
    </Col>
    <Col>
      <Form.Control placeholder="State" />
    </Col>
    <Col>
      <Form.Control placeholder="Zip" />
    </Col>
  </Form.Row>
</Form>
`}
    >
      Grid system allows you to place any number of <code>{"<Col>"}</code>s
      within a <code>{"<Row>"}</code> or <code>{"<Form.Row>"}</code>. They'll
      split the available width equally between them. You may also pick a subset
      of your columns to take up more or less space, while the remaining{" "}
      <code>{"<Col>"}</code>s equally split the rest, with specific column
      classes like <code>{"<Col xs={7}>"}</code>.
    </CodeBlock>

    <CodeBlock
      title="Auto-sizing"
      scope={{ Form, Col, InputGroup, Button, FormControl }}
      code={`
<Form>
  <Form.Row className="align-items-center">
    <Col xs="auto">
      <Form.Label htmlFor="inlineFormInput" srOnly>
        Name
      </Form.Label>
      <Form.Control
        className="mb-2"
        id="inlineFormInput"
        placeholder="Jane Doe"
      />
    </Col>
    <Col xs="auto">
      <Form.Label htmlFor="inlineFormInputGroup" srOnly>
        Username
      </Form.Label>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="inlineFormInputGroup" placeholder="Username" />
      </InputGroup>
    </Col>
    <Col xs="auto">
      <Form.Check
        type="checkbox"
        id="autoSizingCheck"
        className="mb-2"
        label="Remember me"
        custom
      />
    </Col>
    <Col xs="auto">
      <Button type="submit" className="mb-2">
        Submit
      </Button>
    </Col>
  </Form.Row>
</Form>
`}
    >
      The example below uses a flexbox utility to vertically center the contents
      and changes <code>{"<Col>"}</code> to <code>{"<Col xs='auto'>"}</code> so
      that your columns only take up as much space as needed. Put another way,
      the column sizes itself based on on the contents.
    </CodeBlock>

    <CodeBlock
      scope={{ Button, Col, InputGroup, FormControl, Form }}
      code={`
<Form>
  <Form.Row className="align-items-center">
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputName" srOnly>
        Name
      </Form.Label>
      <Form.Control id="inlineFormInputName" placeholder="Jane Doe" />
    </Col>
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
        Username
      </Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="inlineFormInputGroupUsername" placeholder="Username" />
      </InputGroup>
    </Col>
    <Col xs="auto" className="my-1">
      <Form.Check
        type="checkbox"
        id="autoSizingCheck2"
        label="Remember me"
        custom
      />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Row>
</Form>
`}
    >
      You can then remix that once again with size-specific column classes.
    </CodeBlock>

    <CodeBlock
      title="Inline forms"
      scope={{ Form, Button, InputGroup, FormControl }}
      code={`
<Form inline>
  <Form.Label htmlFor="inlineFormInputName2" srOnly>
    Name
  </Form.Label>
  <Form.Control
    className="mb-2 mr-sm-2"
    id="inlineFormInputName2"
    placeholder="Jane Doe"
  />
  <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
    Username
  </Form.Label>
  <InputGroup className="mb-2 mr-sm-2">
    <InputGroup.Prepend>
      <InputGroup.Text>@</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl id="inlineFormInputGroupUsername2" placeholder="Username" />
  </InputGroup>
  <Form.Check
    type="checkbox"
    className="mb-2 mr-sm-2"
    id="inlineFormCheck"
    label="Remember me"
  />
  <Button type="submit" className="mb-2">
    Submit
  </Button>
</Form>
`}
    >
      <p>
        Use the <code>inline</code> prop to display a series of labels, form
        controls, and buttons on a single horizontal row. Form controls within
        forms vary slightly from their default states.
      </p>
      <ul>
        <li>
          Controls are <code>display: flex</code>, collapsing any HTML white
          space and allowing you to provide alignment control with spacing and
          utilities.
        </li>
        <li>
          Controls and input groups receive <code>width: auto</code> to override
          the Bootstrap default <code>width: 100%</code>.
        </li>
        <li>
          Controls{" "}
          <b>only appear inline in viewports that are at least 576px wide</b> to
          account for narrow viewports on mobile devices.
        </li>
      </ul>
      <p>
        You may need to manually address the width and alignment of individual
        form controls with spacing utilities (as shown below). Lastly, be sure
        to always include a <code>{"<Form.Label>"}</code> with each form
        control, even if you need to hide it from non-screenreader visitors with
        the <code>srOnly</code> prop.
      </p>
    </CodeBlock>

    <div className="docs-callout docs-callout-warning p-3 pb-0 rounded-lg">
      <div>
        <h5>Alternatives to hidden labels</h5>Assistive technologies such as
        screen readers will have trouble with your forms if you don’t include a
        label for every input. For these inline forms, you can hide the labels
        using the <code>srOnly</code> prop. There are further alternative
        methods of providing a label for assistive technologies, such as the{" "}
        <code>aria-label</code>, <code>aria-labelledby</code> or{" "}
        <code>title</code> attribute. If none of these are present, assistive
        technologies may resort to using the <code>placeholder</code> attribute,
        if present, but note that use of <code>placeholder</code> as a
        replacement for other labelling methods is not advised.
      </div>
    </div>

    <CodeBlock
      bigtitle="Help text"
      scope={{ Form }}
      code={`
<div>
  <Form.Label htmlFor="inputPassword5">Password</Form.Label>
  <Form.Control
    type="password"
    id="inputPassword5"
    aria-describedby="passwordHelpBlock"
  />
  <Form.Text id="passwordHelpBlock" muted>
    Your password must be 8-20 characters long, contain letters and numbers, and
    must not contain spaces, special characters, or emoji.
  </Form.Text>
</div>
`}
    >
      <p>
        Block-level help text in forms can be created using{" "}
        <code>{"<Form.Text>"}</code>. Inline help text can be flexibly
        implemented using any inline HTML element and utility classes like
        <code>.text-muted</code>.
      </p>
      <div className="docs-callout docs-callout-warning p-3 pb-0 rounded-lg">
        <div>
          <h5>Associating help text with form controls</h5>Help text should be
          explicitly associated with the form control it relates to using the{" "}
          <code>aria-describedby</code> attribute. This will ensure that
          assistive technologies—such as screen readers—will announce this help
          text when the user focuses or enters the control.
        </div>
      </div>
      <p>
        Help text below inputs can be styled with <code>{"<Form.Text>"}</code>.
        This component includes <code>display: block</code> and adds some top
        margin for easy spacing from the inputs above.
      </p>
    </CodeBlock>

    <CodeBlock
      scope={{ Form }}
      code={`
<Form inline>
  <Form.Group>
    <Form.Label htmlFor="inputPassword6">Password</Form.Label>
    <Form.Control
      type="password"
      className="mx-sm-3"
      id="inputPassword6"
      aria-describedby="passwordHelpInline"
    />
    <Form.Text id="passwordHelpInline" muted>
      Must be 8-20 characters long.
    </Form.Text>
  </Form.Group>
</Form>
`}
    >
      Inline text can use any typical inline HTML element (be it a{" "}
      <code>{"<small>"}</code>, <code>{"<span>"}</code>, or something else) with
      nothing more than a utility class.
    </CodeBlock>

    <CodeBlock
      bigtitle="Disabled Forms"
      scope={{ Form }}
      code={`
<Form.Group>
  <Form.Label>Disabled input</Form.Label>
  <Form.Control placeholder="Disabled input" disabled />
</Form.Group>
`}
    >
      Add the <code>disabled</code> boolean attribute on an input to prevent
      user interactions and make it appear lighter.
    </CodeBlock>

    <CodeBlock
      scope={{ Form, Button }}
      code={`
<Form>
  <fieldset disabled>
    <Form.Group>
      <Form.Label htmlFor="disabledTextInput">Disabled input</Form.Label>
      <Form.Control id="disabledTextInput" placeholder="Disabled input" />
    </Form.Group>
    <Form.Group>
      <Form.Label htmlFor="disabledSelect">Disabled select menu</Form.Label>
      <Form.Control as="select" id="disabledSelect">
        <option>Disabled select</option>
      </Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="Can't check this"
        custom
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </fieldset>
</Form>
`}
    >
      Add the <code>disabled</code> attribute to a <code>{"<fieldset>"}</code>{" "}
      to disable all the controls within.
    </CodeBlock>

    <div className="docs-callout docs-callout-warning p-3 pb-0 rounded-lg">
      <h5>Caveat with anchors</h5>By default, browsers will treat all native
      form controls (<code>{"<input>"}</code>, <code>{"<select>"}</code> and{" "}
      <code>{"<button>"}</code> elements) inside a{" "}
      <code>{"<fieldset disabled>"}</code> as disabled, preventing both keyboard
      and mouse interactions on them. However, if your form also includes{" "}
      <code>{"<a ... className='btn btn-*'>"}</code> elements, these will only
      be given a style of <code>pointer-events: none</code>. As noted in the
      section about{" "}
      <a href="/components/buttons/#disabled-state">
        disabled state for buttons
      </a>{" "}
      (and specifically in the sub-section for anchor elements), this CSS
      property is not yet standardized and isn’t fully supported in Internet
      Explorer 10, and won’t prevent keyboard users from being able to focus or
      activate these links. So to be safe, use custom JavaScript to disable such
      links.
    </div>

    <div className="docs-callout docs-callout-danger p-3 pb-0 rounded-lg">
      <h4>Cross-browser compatibility</h4>While Bootstrap will apply these
      styles in all browsers, Internet Explorer 11 and below don’t fully support
      the <code>disabled</code> attribute on a <code>{"<fieldset>"}</code>. Use
      custom JavaScript to disable the fieldset in these browsers.
    </div>

    <CodeBlock
      title="File browser"
      scope={{ Form }}
      code={`
<Form>
  <Form.File id="custom-file" label="Choose file" custom />
</Form>
`}
    >
      <div className="docs-callout docs-callout-info p-3 pb-0 rounded-lg">
        The custom <code>FormFile</code> will by default not visibly display
        your selected file. This requires additional JS. The recommended plugin
        to animate custom file input is{" "}
        <a href="https://www.npmjs.com/package/bs-custom-file-input">
          bs-custom-file-input
        </a>
        .
      </div>
    </CodeBlock>
    <p>
      We hide the default file <code>{"<input>"}</code> via <code>opacity</code>{" "}
      and instead style the <code>{"<label>"}</code>. The button is generated
      and positioned with <code>::after</code>. Lastly, we declare a{" "}
      <code>width</code> and <code>height</code> on the <code>{"<input>"}</code>{" "}
      for proper spacing for surrounding content.
    </p>

    <CodeBlock
      subtitle1="Translating or customizing the strings with SCSS"
      scope={{ Form }}
      code={`
<Form>
  <Form.File
    id="custom-file-translate-scss"
    label="Custom file input"
    lang="es"
    custom
  />
</Form>
`}
    >
      <p>
        The{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:lang">
          <code className="highlighter-rouge">:lang()</code> pseudo-class
        </a>{" "}
        is used to allow for translation of the “Browse” text into other
        languages. Override or add entries to the{" "}
        <code className="highlighter-rouge">$custom-file-text</code> Sass
        variable with the relevant{" "}
        <a href="https://en.wikipedia.org/wiki/IETF_language_tag">
          language tag
        </a>{" "}
        and localized strings. The English strings can be customized the same
        way. For example, here’s how one might add a Spanish translation
        (Spanish’s language code is{" "}
        <code className="highlighter-rouge">es</code>):
      </p>
      <div className="highlight">
        <pre tabIndex={0} className="chroma">
          <code className="language-scss" data-lang="scss">
            <span className="nv">$custom-file-text</span>
            <span className="o">:</span> <span className="p">(</span>
            <span className="na">en</span>
            <span className="o">:</span> <span className="s2">"Browse"</span>
            <span className="o">,</span>
            <span className="na">es</span>
            <span className="o">:</span> <span className="s2">"Elegir"</span>
            <span className="p">)</span>
          </code>
        </pre>
      </div>
      <p>
        Here’s <code>lang(es)</code> in action on the custom file input for a
        Spanish translation:
      </p>
    </CodeBlock>
    <p>
      You’ll need to set the language of your document (or subtree thereof)
      correctly in order for the correct text to be shown. This can be done
      using{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang"
        target="_blank"
        rel="noopener"
      >
        the <code>lang</code> attribute
      </a>{" "}
      on the <code>{"<html>"}</code> element or the{" "}
      <a
        href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.12"
        target="_blank"
        rel="noopener"
      >
        <code>Content-Language</code> HTTP header
      </a>
      , among other methods.
    </p>

    <CodeBlock
      subtitle1="Translating or customizing the strings with HTML"
      scope={{ Form }}
      code={`
<Form>
  <Form.File
    id="custom-file-translate-html"
    label="Voeg je document toe"
    data-browse="Bestand kiezen"
    custom
  />
</Form>
`}
    >
      <p>
        Bootstrap also provides a way to translate the “Browse” text in HTML
        with the <code>data-browse</code> attribute which can be added to the
        custom input label (example in Dutch):
      </p>
      <div className="docs-callout docs-callout-info p-3 pb-0 rounded-lg">
        Note that the <code>data-browse</code> attribute does not to anything
        unless the <code>custom</code> prop is set.
      </div>
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="inputs-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Form} />
    <ComponentApi metadata={props.data.FormRow} exportedBy={props.data.Form} />
    <ComponentApi
      metadata={props.data.FormGroup}
      exportedBy={props.data.Form}
    />
    <ComponentApi
      metadata={props.data.FormLabel}
      exportedBy={props.data.Form}
    />
    <ComponentApi metadata={props.data.FormText} exportedBy={props.data.Form} />
    <ComponentApi
      metadata={props.data.FormControl}
      exportedBy={props.data.Form}
    />
    <ComponentApi
      metadata={props.data.Feedback}
      exportedBy={props.data.FormControl}
    />
    <ComponentApi
      metadata={props.data.FormCheck}
      exportedBy={props.data.Form}
    />
    <ComponentApi
      metadata={props.data.FormCheckInput}
      exportedBy={props.data.FormCheck}
    />
    <ComponentApi
      metadata={props.data.FormCheckLabel}
      exportedBy={props.data.FormCheck}
    />
    <ComponentApi metadata={props.data.FormFile} exportedBy={props.data.Form} />
    <ComponentApi
      metadata={props.data.FormFileInput}
      exportedBy={props.data.FormFile}
    />
    <ComponentApi
      metadata={props.data.FormFileLabel}
      exportedBy={props.data.FormFile}
    />
  </MainLayout>
)

export default InputsPage

export const query = graphql`
  query InputsQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...ComponentApi_metadata
    }
    FormRow: componentMetadata(displayName: { eq: "FormRow" }) {
      ...ComponentApi_metadata
    }
    FormGroup: componentMetadata(displayName: { eq: "FormGroup" }) {
      ...ComponentApi_metadata
    }
    FormControl: componentMetadata(displayName: { eq: "FormControl" }) {
      ...ComponentApi_metadata
    }
    FormLabel: componentMetadata(displayName: { eq: "FormLabel" }) {
      ...ComponentApi_metadata
    }
    FormText: componentMetadata(displayName: { eq: "FormText" }) {
      ...ComponentApi_metadata
    }
    FormCheck: componentMetadata(displayName: { eq: "FormCheck" }) {
      ...ComponentApi_metadata
    }
    FormFile: componentMetadata(displayName: { eq: "FormFile" }) {
      ...ComponentApi_metadata
    }
    FormCheckInput: componentMetadata(displayName: { eq: "FormCheckInput" }) {
      ...ComponentApi_metadata
    }
    FormCheckLabel: componentMetadata(displayName: { eq: "FormCheckLabel" }) {
      ...ComponentApi_metadata
    }
    Feedback: componentMetadata(displayName: { eq: "Feedback" }) {
      ...ComponentApi_metadata
    }
    FormFileInput: componentMetadata(displayName: { eq: "FormFileInput" }) {
      ...ComponentApi_metadata
    }
    FormFileLabel: componentMetadata(displayName: { eq: "FormFileLabel" }) {
      ...ComponentApi_metadata
    }
  }
`
