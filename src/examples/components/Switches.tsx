export const SwitchesBasic = `
<Form>
  <Form.Check type="switch" id="custom-switch1" label="Switch" custom checked />
  <Form.Check type="switch" id="custom-switch2" label="Switch" custom />
  <Form.Switch
    disabled
    label="Disabled"
    id="disabled-custom-switch1"
    custom
    checked
  />
  <Form.Switch disabled label="Disabled" id="disabled-custom-switch2" custom />
</Form>
`
export const SwitchesInline = `
<Form>
  <Form.Check
    type="switch"
    id="custom-inline-switch1"
    label="Switch"
    className="mr-4"
    custom
    checked
    inline
  />
  <Form.Check
    type="switch"
    id="custom-switch2"
    label="Switch"
    custom
    inline
    className="mr-4"
  />
  <Form.Switch
    disabled
    label="Disabled"
    id="disabled-custom-switch1"
    custom
    checked
    inline
    className="mr-4"
  />
  <Form.Switch
    disabled
    label="Disabled"
    id="disabled-custom-switch2"
    custom
    inline
    className="mr-4"
  />
</Form>
`
